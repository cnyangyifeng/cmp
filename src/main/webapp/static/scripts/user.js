window.user = {
    handler: {}
};

user.ready = function () {

    // selectors

    var
        $userIdInput = $('#user-id-input'),
        $userNameInput = $('#user-name-input'),
        $userNameMessageLabel = $('#user-name-message-label'),
        $groupIdInput = $('#group-id-input'),
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
                userId = $userIdInput.val(),
                userName = $userNameInput.val(),
                groupId = $groupIdInput.val(),
                serialNumber = $serialNumberInput.val()
                ;

            if (!handler.validateUserNameInput() || !handler.validateSerialNumberInput()) {
                return;
            }

            $saveButton
                .addClass('loading disabled')
            ;

            $.ajax({
                url: app + '/api/users/' + userId,
                type: 'PATCH',
                contentType: 'application/json',
                data: JSON.stringify({
                    userId: userId,
                    userName: userName,
                    groupId: groupId,
                    serialNumber: serialNumber
                }),
                timeout: 9000, // 9 seconds

                success: function () {
                    console.log('save success');
                    setTimeout(function () {
                        window.location = app + '/users';
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

        validateUserNameInput: function () {
            var
                userName = $userNameInput.val().trim()
                ;

            if (userName.length == 0) {
                $userNameMessageLabel
                    .removeClass('hidden')
                    .text('不能为空')
                ;
                return false;
            }

            if (userName.length > 10) {
                $userNameMessageLabel
                    .removeClass('hidden')
                    .text('至多输入 10 个中英文字符')
                ;
                return false;
            }

            $userNameMessageLabel
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
                userId = $userIdInput.val()
                ;

            $deleteButton
                .addClass('loading disabled')
            ;

            $.ajax({
                url: app + '/api/users/' + userId,
                type: 'DELETE',
                timeout: 9000, // 9 seconds

                success: function () {
                    console.log('delete success');
                    window.location = app + '/users';
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

    user.handler = handler;

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

    $userNameInput
        .on('blur', handler.validateUserNameInput)
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
    .ready(user.ready)
;