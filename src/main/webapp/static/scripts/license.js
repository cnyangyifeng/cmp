window.license = {
    handler: {}
};

license.ready = function () {

    // selectors

    var
        $licenseIdInput = $('#license-id-input'),
        $appNameInput = $('#app-name-input'),
        $editionInput = $('#edition-input'),
        $majorVersionInput = $('#major-version-input'),
        $emailInput = $('#email-input'),
        $emailMessageLabel = $('#email-message-label'),
        $hardwareInput = $('#hardware-input'),
        $validThroughInput = $('#valid-through-input'),
        $validThroughMessageLabel = $('#valid-through-message-label'),
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
                appName = $appNameInput.val(),
                edition = $editionInput.val(),
                majorVersion = $majorVersionInput.val(),
                email = $emailInput.val(),
                hardware = $hardwareInput.val(),
                validThrough = $validThroughInput.val()
                ;

            if (!handler.validateEmailInput() || !handler.validateValidThroughInput()) {
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
                    appName: appName,
                    edition: edition,
                    majorVersion: majorVersion,
                    email: email,
                    hardware: hardware,
                    validThrough: validThrough
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

        validateEmailInput: function () {
            var
                email = $emailInput.val().trim()
                ;

            if (email.length == 0) {
                $emailMessageLabel
                    .removeClass('hidden')
                    .text('不能为空')
                ;
                return false;
            }

            var reg = /\S+@\S+\.\S+/;
            if (!reg.test(email)) {
                $emailMessageLabel
                    .removeClass('hidden')
                    .text('必须为电子邮箱格式')
                ;
                return false;
            }

            $emailMessageLabel
                .addClass('hidden')
                .text('')
            ;
            return true;
        },

        validateValidThroughInput: function () {
            var
                validThrough = $validThroughInput.val().trim()
                ;

            if (validThrough.length == 0) {
                $validThroughMessageLabel
                    .removeClass('hidden')
                    .text('不能为空')
                ;
                return false;
            }

            var reg = /^[1-9]\d*$/;
            if (!reg.test(validThrough)) {
                $validThroughMessageLabel
                    .removeClass('hidden')
                    .text('必须为数字')
                ;
                return false;
            }

            if (validThrough.length != 8) {
                $validThroughMessageLabel
                    .removeClass('hidden')
                    .text('只能输入 8 位数字')
                ;
                return false;
            }

            $validThroughMessageLabel
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

    $emailInput
        .on('blur', handler.validateEmailInput)
    ;

    $validThroughInput
        .on('blur', handler.validateValidThroughInput)
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