window.license = {
    handler: {}
};

license.ready = function () {

    // selectors

    var
        $licenseIdInput = $('#license-id-input'),
        $licenseNameInput = $('#license-name-input'),
        $licenseNameMessageLabel = $('#license-name-message-label'),
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
                licenseId = $licenseIdInput.val(),
                licenseName = $licenseNameInput.val(),
                groupId = $groupIdInput.val(),
                serialNumber = $serialNumberInput.val()
                ;

            if (!handler.validateLicenseNameInput() || !handler.validateSerialNumberInput()) {
                return;
            }

            $saveButton
                .addClass('loading disabled')
            ;

            $.ajax({
                url: app + '/api/licenses/' + licenseId,
                type: 'PATCH',
                contentType: 'application/json',
                data: JSON.stringify({
                    licenseId: licenseId,
                    licenseName: licenseName,
                    groupId: groupId,
                    serialNumber: serialNumber
                }),
                timeout: 9000, // 9 seconds

                success: function () {
                    console.log('save success');
                    setTimeout(function () {
                        window.location = app + '/licenses';
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

        validateLicenseNameInput: function () {
            var
                licenseName = $licenseNameInput.val().trim()
                ;

            if (licenseName.length == 0) {
                $licenseNameMessageLabel
                    .removeClass('hidden')
                    .text('不能为空')
                ;
                return false;
            }

            if (licenseName.length > 10) {
                $licenseNameMessageLabel
                    .removeClass('hidden')
                    .text('至多输入 10 个中英文字符')
                ;
                return false;
            }

            $licenseNameMessageLabel
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
                licenseId = $licenseIdInput.val()
                ;

            $deleteButton
                .addClass('loading disabled')
            ;

            $.ajax({
                url: app + '/api/licenses/' + licenseId,
                type: 'DELETE',
                timeout: 9000, // 9 seconds

                success: function () {
                    console.log('delete success');
                    window.location = app + '/licenses';
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

    license.handler = handler;

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

    $licenseNameInput
        .on('blur', handler.validateLicenseNameInput)
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
    .ready(license.ready)
;