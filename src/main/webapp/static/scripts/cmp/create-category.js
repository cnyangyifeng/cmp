window.create_category = {
    handler: {}
};

create_category.ready = function () {

    // selectors
    var
        $categoryNameInput = $('#category-name-input'),
        $categoryNameMessageLabel = $('#category-name-message-label'),
        $serialNumberInput = $('#serial-number-input'),
        $serialNumberMessageLabel = $('#serial-number-message-label'),
        $saveButton = $('#save-button'),

        handler // alias
        ;

    // event handlers
    handler = {

        /* save */

        save: function () {
            var
                categoryName = $categoryNameInput.val(),
                serialNumber = $serialNumberInput.val()
                ;

            if (!handler.validateCategoryNameInput() || !handler.validateSerialNumberInput()) {
                return;
            }

            $saveButton
                .addClass('loading disabled')
            ;

            $.ajax({
                url: '/api/categories',
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({
                    categoryName: categoryName,
                    serialNumber: serialNumber
                }),
                timeout: 9000, // 9 seconds

                success: function () {
                    console.log('save success');
                    window.location = '/views/categories';
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
                categoryName = $categoryNameInput.val().trim()
                ;

            if (categoryName.length == 0) {
                $categoryNameMessageLabel
                    .removeClass('hidden')
                    .text('不能为空')
                ;
                return false;
            }

            if (categoryName.length > 10) {
                $categoryNameMessageLabel
                    .removeClass('hidden')
                    .text('至多输入 10 个中英文字符')
                ;
                return false;
            }

            $categoryNameMessageLabel
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

    create_category.handler = handler;

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

    $categoryNameInput
        .on('blur', handler.validateCategoryNameInput)
    ;

    $serialNumberInput
        .on('blur', handler.validateSerialNumberInput)
    ;

};

$(document)
    .ready(create_category.ready)
;