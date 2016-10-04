window.createLicense = {
    handler: {}
};

createLicense.ready = function () {

    // selectors

    var
        $appNameInput = $('#app-name-input'),
        $editionInput = $('#edition-input'),
        $majorVersionInput = $('#major-version-input'),
        $emailInput = $('#email-input'),
        $emailMessageLabel = $('#email-message-label'),
        $hardwareInput = $('#hardware-input'),
        $hardwareMessageLabel = $('#hardware-message-label'),
        $validThroughInput = $('#valid-through-input'),
        $validThroughMessageLabel = $('#valid-through-message-label'),
        $saveButton = $('#save-button'),

        app = '',

        handler // alias
        ;

    // event handlers

    handler = {

        /* save */

        save: function () {
            var
                appName = $appNameInput.val(),
                edition = $editionInput.val(),
                majorVersion = $majorVersionInput.val(),
                email = $emailInput.val(),
                hardware = $hardwareInput.val(),
                validThrough = $validThroughInput.val()
                ;

            if (!handler.validateEmailInput() || !handler.validateHardwareInput() || !handler.validateValidThroughInput()) {
                return;
            }

            $saveButton
                .addClass('loading disabled')
            ;

            $.ajax({
                url: app + '/api/licenses',
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({
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

            $emailMessageLabel
                .addClass('hidden')
                .text('')
            ;
            return true;
        },

        validateHardwareInput: function () {
            var
                groupId = $hardwareInput.val()
                ;

            if (groupId == 0) {
                $hardwareMessageLabel
                    .removeClass('hidden')
                    .text('不能为空')
                ;
                return false;
            }

            $hardwareMessageLabel
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
        }

    };

    createLicense.handler = handler;

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

    $hardwareInput
        .on('blur', handler.validateHardwareInput)
    ;

    $validThroughInput
        .on('blur', handler.validateValidThroughInput)
    ;

};

$(document)
    .ready(createLicense.ready)
;