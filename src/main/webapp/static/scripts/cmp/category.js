window.category = {
    handler: {}
};

category.ready = function () {

    // selectors
    var
        $categoryIdInput = $('#category-id-input'),
        $categoryNameInput = $('#category-name-input'),
        $categoryNameMessageLabel = $('#category-name-message-label'),
        $serialNumberInput = $('#serial-number-input'),
        $serialNumberMessageLabel = $('#serial-number-message-label'),
        $saveButton = $('#save-button'),

        $preDeleteButton = $('#pre-delete-button'),
        $deleteModal = $('#delete-modal'),
        $deleteButton = $('#delete-button'),

        handler // alias
        ;

    // event handlers
    handler = {

        /* save */

        save: function () {
            var
                categoryId = $categoryIdInput.val(),
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
                url: '/api/categories/' + categoryId,
                type: 'PATCH',
                contentType: 'application/json',
                data: JSON.stringify({
                    categoryId: categoryId,
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
                },

                complete: function () {
                    console.log('save complete');
                    $saveButton
                        .removeClass('loading disabled')
                    ;
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
        },

        /* delete */

        delete: function () {
            var
                categoryId = $categoryIdInput.val()
                ;

            $deleteButton
                .addClass('loading disabled')
            ;

            $.ajax({
                url: '/api/categories/' + categoryId,
                type: 'DELETE',
                timeout: 9000, // 9 seconds

                success: function () {
                    console.log('delete success');
                    window.location = '/views/categories';
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
                .modal('show')
            ;
        }

    };

    category.handler = handler;

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

    $categoryNameInput
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
    .ready(category.ready)
;