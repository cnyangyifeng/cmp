window.createUser = {
    handler: {}
};

createUser.ready = function () {

    // selectors

    var
        $userNameInput = $('#user-name-input'),
        $userNameMessageLabel = $('#user-name-message-label'),
        $groupIdInput = $('#group-id-input'),
        $groupIdMessageLabel = $('#group-id-message-label'),
        $serialNumberInput = $('#serial-number-input'),
        $serialNumberMessageLabel = $('#serial-number-message-label'),
        $saveButton = $('#save-button'),

        app = '',

        handler // alias
        ;

    // event handlers

    handler = {

        /* save */

        save: function () {
            var
                userName = $userNameInput.val(),
                groupId = $groupIdInput.val(),
                serialNumber = $serialNumberInput.val()
                ;

            if (!handler.validateUserNameInput() || !handler.validateGroupIdInput() || !handler.validateSerialNumberInput()) {
                return;
            }

            $saveButton
                .addClass('loading disabled')
            ;

            $.ajax({
                url: app + '/api/users',
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({
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

        validateGroupIdInput: function () {
            var
                groupId = $groupIdInput.val()
                ;

            if (groupId == 0) {
                $groupIdMessageLabel
                    .removeClass('hidden')
                    .text('不能为空')
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
        }

    };

    createUser.handler = handler;

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

};

$(document)
    .ready(createUser.ready)
;