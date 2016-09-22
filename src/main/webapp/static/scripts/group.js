window.group = {
    handler: {}
};

group.ready = function () {

    // selectors

    var
        $groupIdInput = $('#group-id-input'),
        $groupNameInput = $('#group-name-input'),
        $groupNameMessageLabel = $('#group-name-message-label'),
        $serialNumberInput = $('#serial-number-input'),
        $serialNumberMessageLabel = $('#serial-number-message-label'),
        $saveButton = $('#save-button'),

        $preDeleteButton = $('#pre-delete-button'),
        $deleteModal = $('#delete-modal'),
        $deleteButton = $('#delete-button'),

        app = '',

        handler // alias
        ;

    // event handlers

    handler = {

        /* save */

        save: function () {
            var
                groupId = $groupIdInput.val(),
                groupName = $groupNameInput.val(),
                serialNumber = $serialNumberInput.val()
                ;

            if (!handler.validateCategoryNameInput() || !handler.validateSerialNumberInput()) {
                return;
            }

            $saveButton
                .addClass('loading disabled')
            ;

            $.ajax({
                url: app + '/api/groups/' + groupId,
                type: 'PATCH',
                contentType: 'application/json',
                data: JSON.stringify({
                    groupId: groupId,
                    groupName: groupName,
                    serialNumber: serialNumber
                }),
                timeout: 9000, // 9 seconds

                success: function () {
                    console.log('save success');
                    setTimeout(function () {
                        window.location = app + '/groups';
                    }, 500);
                },

                error: function (xhr, textStatus) {
                    console.log('save error: ' + textStatus);
                    $saveButton
                        .removeClass('loading disabled')
                    ;
                },

                complete: function () {
                    console.log('save complete');
                }
            });
        },

        validateCategoryNameInput: function () {
            var
                groupName = $groupNameInput.val().trim()
                ;

            if (groupName.length == 0) {
                $groupNameMessageLabel
                    .removeClass('hidden')
                    .text('不能为空')
                ;
                return false;
            }

            if (groupName.length > 10) {
                $groupNameMessageLabel
                    .removeClass('hidden')
                    .text('至多输入 10 个中英文字符')
                ;
                return false;
            }

            $groupNameMessageLabel
                .addClass('hidden')
                .text('')
            ;
            return true;
        },

        validateSerialNumberInput: function () {
            var
                serialNumber = $serialNumberInput.val().trim()
                ;

            if (serialNumber.length == 0) {
                $serialNumberMessageLabel
                    .removeClass('hidden')
                    .text('不能为空')
                ;
                return false;
            }

            var reg = /^[1-9]\d*$/;
            if (!reg.test(serialNumber)) {
                $serialNumberMessageLabel
                    .removeClass('hidden')
                    .text('必须为数字')
                ;
                return false;
            }

            if (serialNumber.length > 4) {
                $serialNumberMessageLabel
                    .removeClass('hidden')
                    .text('至多输入 4 位数字')
                ;
                return false;
            }

            $serialNumberMessageLabel
                .addClass('hidden')
                .text('')
            ;
            return true;
        },

        /* delete */

        delete: function () {
            var
                groupId = $groupIdInput.val()
                ;

            $deleteButton
                .addClass('loading disabled')
            ;

            $.ajax({
                url: app + '/api/groups/' + groupId,
                type: 'DELETE',
                timeout: 9000, // 9 seconds

                success: function () {
                    console.log('delete success');
                    setTimeout(function () {
                        window.location = app + '/groups';
                    }, 500);
                },

                error: function (xhr, textStatus) {
                    console.log('delete error: ' + textStatus);
                    $deleteButton
                        .removeClass('loading disabled')
                    ;
                },

                complete: function () {
                    console.log('delete complete');
                }
            });
        },

        showDeleteModal: function () {
            $deleteModal
                .modal({
                    onShow: function () {
                        $('body')
                            .addClass('modal-fix')
                        ;
                    },
                    onHide: function () {
                        $('body')
                            .removeClass('modal-fix')
                        ;
                    }
                })
                .modal('show')
            ;
        }

    };

    group.handler = handler;

    /* save */

    $saveButton
        .on('click', handler.save)
        .keypress(function (e) {
            if (e.which == 13) {
                handler
                    .save()
                ;
            }
        })
    ;

    $groupNameInput
        .on('blur', handler.validateCategoryNameInput)
    ;

    $serialNumberInput
        .on('blur', handler.validateSerialNumberInput)
    ;

    /* delete */

    $deleteButton
        .on('click', handler.delete)
    ;

    $preDeleteButton
        .on('click', handler.showDeleteModal)
        .keypress(function (e) {
            if (e.which == 13) {
                handler
                    .showDeleteModal()
                ;
            }
        })
    ;

};

$(document)
    .ready(group.ready)
;