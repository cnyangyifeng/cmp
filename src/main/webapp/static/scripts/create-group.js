window.createGroup = {
    handler: {}
};

createGroup.ready = function () {

    // selectors

    var
        $groupNameInput = $('#group-name-input'),
        $groupNameMessageLabel = $('#group-name-message-label'),
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
                groupName = $groupNameInput.val(),
                serialNumber = $serialNumberInput.val()
                ;

            if (!handler.validateGroupNameInput() || !handler.validateSerialNumberInput()) {
                return;
            }

            $saveButton
                .addClass('loading disabled')
            ;

            $.ajax({
                url: app + '/api/groups',
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({
                    groupName: groupName,
                    serialNumber: serialNumber
                }),
                timeout: 9000, // 9 seconds

                success: function () {
                    console.log('save success');
                    window.location = app + '/groups';
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

        validateGroupNameInput: function () {
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
        }

    };

    createGroup.handler = handler;

    /* save */

    $saveButton
        .on('click', handler.save)
        .keypress(function (e) {
            if (e.which == 13) {
                handler.save()
                ;
            }
        })
    ;

    $groupNameInput
        .on('blur', handler.validateGroupNameInput)
    ;

    $serialNumberInput
        .on('blur', handler.validateSerialNumberInput)
    ;

};

$(document)
    .ready(createGroup.ready)
;