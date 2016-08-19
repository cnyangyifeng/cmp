window.categories = {
    handler: {}
};

categories.ready = function () {

    // selectors
    var
        $checkboxes = $('.category.checkbox'),
        $masterCheckbox = $('.master.checkbox'),
        $preDeleteButton = $('#pre-delete-button'),
        $deleteModal = $('#delete-modal'),
        $deleteButton = $('#delete-button'),

        $queryInput = $('#query-input'),
        $searchButton = $('#search-button'),
        $queryKeywordsLabel = $('#query-keywords-label'),

        $workTable = $('.worksheet table'),
        $paginationMenu = $('#pagination-menu'),
        $paginationMenuItems = $paginationMenu.find('.item'),
        $totalCountLabel = $('#total-count-label'),

        handler // alias
        ;

    var
        query = $queryInput.val(),
        totalCount = 0,
        pageOffset = 0,
        limit = 10,
        maxPagesPerMenu = 10,
        action = 'find' // find or search
        ;

    // event handlers
    handler = {

        /* find */

        doExplicitFind: function () {
            pageOffset = 0;
            action = 'find';
            handler
                .findCount()
            ;
            handler
                .find(pageOffset * limit)
            ;
        },

        find: function (offset) {
            $.ajax({
                url: "/api/categories/from/" + offset,
                type: "GET",
                timeout: 30000, // 30 seconds

                success: function (json) {
                    console.log('find success');
                    $(document.body)
                        .scrollTop(0)
                    ;
                    handler
                        .refreshData(json, '')
                    ;
                    handler
                        .refreshPagination(action)
                    ;
                },

                error: function (xhr, textStatus) {
                    console.log('find error: ' + textStatus);
                },

                complete: function () {
                    console.log('find complete');
                }
            });
        },

        findCount: function () {
            $.ajax({
                url: "/api/categories/count",
                type: "GET",
                timeout: 9000, // 9 seconds

                success: function (count) {
                    console.log('find count success');
                    totalCount = count;
                    handler
                        .refreshPagination(action)
                    ;
                },

                error: function (xhr, textStatus) {
                    console.log('find count error: ' + textStatus);
                    totalCount = 0;
                },

                complete: function () {
                    console.log('find count complete');
                }
            });
        },

        /* search */

        doExplicitSearch: function () {
            query = $queryInput.val();
            pageOffset = 0;
            action = 'search';
            handler
                .searchByNameCount(query)
            ;
            handler
                .searchByName(pageOffset * limit, query)
            ;
        },

        searchByName: function (offset, q) {
            $masterCheckbox
                .checkbox('uncheck') // fix bugs
            ;
            $searchButton
                .addClass('loading disabled')
            ;
            $(document.body)
                .scrollTop(0)
            ;
            handler
                .indicateDataLoading()
            ;

            $.ajax({
                url: "/api/search/categories/from/" + offset + "?q=" + q,
                type: "GET",
                timeout: 9000, // 9 seconds

                success: function (json) {
                    console.log('search success');
                    handler
                        .refreshData(json, q)
                    ;
                    handler
                        .refreshPagination(action)
                    ;
                },

                error: function (xhr, textStatus) {
                    console.log('search error: ' + textStatus);
                },

                complete: function () {
                    console.log('search complete');
                    $searchButton
                        .removeClass('loading disabled')
                    ;
                }
            });
        },

        searchByNameCount: function (q) {
            $.ajax({
                url: "/api/search/categories/count?q=" + q,
                type: "GET",
                timeout: 9000, // 9 seconds

                success: function (count) {
                    console.log('search for name count success');
                    totalCount = count;
                    handler
                        .refreshPagination(action)
                    ;
                },

                error: function (xhr, textStatus) {
                    console.log('search for name count error: ' + textStatus);
                    totalCount = 0;
                },

                complete: function () {
                    console.log('search for name count complete');
                }
            });
        },

        indicateDataLoading: function () {
            var tableBody =
                    '<tr>' +
                    '  <td colspan="3">' + '数据加载中...' + '</td>' +
                    '</tr>'
                ;
            $workTable
                .find('tbody').html(tableBody)
            ;
        },

        refreshData: function (json, q) {
            var data = JSON.parse(json);

            var hintBody = '';

            if ($.trim(q).length == 0) {
                hintBody = '全部';
            } else {
                hintBody =
                    '搜索 “ <span class="query-keywords">' + q +
                    '</span> ” 相关内容，点击 <a href="">这里</a> 清空搜索条件'
                ;
            }

            $queryKeywordsLabel
                .html(hintBody)
            ;

            var tableBody = '';

            if (data.length == 0) {
                var blank = '';

                blank +=
                    '<td colspan="3">' +
                    '抱歉，没有找到相关结果' +
                    '</td>'
                ;

                tableBody +=
                    '<tr>' + blank + '</tr>'
                ;

            } else {
                for (var i = 0; i < data.length; i++) {
                    var row = '';

                    row +=
                        '<td class="collapsing with-min-width">' +
                        '  <div class="category ui checkbox">' +
                        '    <input type="checkbox" id="' + data[i].categoryId + '">' +
                        '    <label for="' + data[i].categoryId + '">' + data[i].categoryName + '</label>' +
                        '  </div>' +
                        '</td>'
                    ;

                    row +=
                        '<td>' + data[i].serialNumber + '</td>'
                    ;

                    var viewUrl = '/views/categories/' + data[i].categoryId;
                    row +=
                        '<td class="collapsing center aligned with-min-action-width">' +
                        '  <a class="ui basic button" href="' + viewUrl + '">查看</a>' +
                        '</td>'
                    ;

                    tableBody +=
                        '<tr>' + row + '</tr>'
                    ;

                }
            }

            $workTable
                .find('tbody')
                .html(tableBody)
            ;

            $checkboxes = $('.category.checkbox'); // fix bugs
            $checkboxes
                .checkbox({
                    onChange: handler.fixMasterCheckbox
                })
            ;
        },

        refreshPagination: function (action) {
            if (totalCount == 0) {
                $workTable
                    .find('tfoot').addClass('hidden')
                ;
                return;
            }

            var labelBody = '共 ' + totalCount + ' 条数据';
            $totalCountLabel
                .html(labelBody)
            ;

            var pages = Math.ceil(totalCount / limit);
            var items = '';
            var start = pageOffset - maxPagesPerMenu / 2;
            if (start < 0) {
                start = 0;
            }
            for (var i = start; i < pages; i++) {
                if (i - start >= maxPagesPerMenu) {
                    break;
                }
                var pageNumber = i + 1;
                if (i == pageOffset) {
                    items +=
                        '<a class="active item" name="' + i + '">' + pageNumber + '</a>'
                    ;
                } else {
                    items +=
                        '<a class="item" name="' + i + '">' + pageNumber + '</a>'
                    ;
                }
            }
            var first = '<a class="item" name="first">首页</a>';
            var previous = '<a class="item" name="previous"><i class="angle left icon"></i> 上一页</a>';
            var next = '<a class="item" name="next">下一页 <i class="angle right icon"></i></a>';
            var last = '<a class="item" name="last">尾页</a>';

            var menuBody = '';
            if (pageOffset > 0) {
                menuBody += first;
                menuBody += previous;
            }
            menuBody += items;
            if (pageOffset < pages - 1) {
                menuBody += next;
                menuBody += last;
            }
            $paginationMenu
                .html(menuBody)
            ;
            $paginationMenuItems = $paginationMenu.find('.item');
            $paginationMenuItems.each(
                function () {
                    $(this)
                        .on('click', function () {
                            var itemName = $(this).attr('name');
                            if (itemName == 'first') {
                                console.log('first page');
                                pageOffset = 0;
                            } else if (itemName == 'last') {
                                console.log('last page');
                                pageOffset = pages - 1;
                            } else if (itemName == 'previous') {
                                console.log('previous page');
                                pageOffset--;
                            } else if (itemName == 'next') {
                                console.log('next page');
                                pageOffset++;
                            } else {
                                pageOffset = parseInt(itemName);
                            }
                            $(this)
                                .addClass('active')
                                .siblings('.item').removeClass('active')
                            ;
                            var offset = pageOffset * limit;
                            if (action == 'find') {
                                handler
                                    .find(offset)
                                ;
                            } else if (action == 'search') {
                                handler
                                    .searchByName(offset, query)
                                ;
                            } else {
                                console.log('nothing happens');
                            }
                        })
                    ;
                }
            );

            $workTable
                .find('tfoot').removeClass('hidden')
            ;
        },

        /* delete */

        delete: function () {
            var categoryIds = [];
            $checkedCheckboxes = $checkboxes.filter('.checked');
            $checkedCheckboxes.each(function () {
                var categoryId = $(this).find('input').attr('id');
                categoryIds
                    .push(parseInt(categoryId))
                ;
            });

            if (categoryIds.length == 0) {
                $deleteModal
                    .modal('hide')
                ;
                return;
            }

            $deleteButton
                .addClass('loading disabled')
            ;

            $.ajax({
                url: '/api/categories',
                type: 'DELETE',
                contentType: 'application/json',
                data: JSON.stringify(categoryIds),
                timeout: 9000, // 9 seconds

                success: function () {
                    console.log('delete success');
                    if (action == 'find') {
                        handler
                            .doExplicitFind()
                        ;
                    } else if (action == 'search') {
                        handler
                            .doExplicitSearch()
                        ;
                    } else {
                        console.log('nothing happens');
                    }
                    $deleteModal
                        .modal('hide')
                    ;
                },

                error: function (xhr, textStatus) {
                    console.log('delete error: ' + textStatus);
                },

                complete: function () {
                    console.log('delete complete');
                    $deleteButton
                        .removeClass('loading disabled')
                    ;
                }
            });
        },

        showDeleteModal: function () {
            $deleteModal
                .modal('show')
            ;
        },

        selectAllCheckboxes: function () {
            $checkboxes
                .checkbox('check')
            ;
        },

        unselectAllCheckboxes: function () {
            $checkboxes
                .checkbox('uncheck')
            ;
        },

        fixMasterCheckbox: function () {
            var
                allChecked = true,
                allUnchecked = true
                ;

            $checkboxes.each(function () {
                if ($(this).checkbox('is checked')) {
                    allUnchecked = false;
                } else {
                    allChecked = false;
                }
            });

            if (allChecked) {
                $masterCheckbox
                    .checkbox('set checked')
                ;
                $preDeleteButton
                    .removeClass('disabled')
                    .addClass('orange')
                ;
            } else if (allUnchecked) {
                $masterCheckbox
                    .checkbox('set unchecked')
                ;
                $preDeleteButton
                    .removeClass('orange')
                    .addClass('disabled')
                ;
            } else {
                $masterCheckbox
                    .checkbox('set indeterminate')
                ;
                $preDeleteButton
                    .removeClass('disabled')
                    .addClass('orange')
                ;
            }
        }

    };

    categories.handler = handler;

    $(document.body)
        .scrollTop(0)
    ;

    /* find */

    handler.doExplicitFind();

    /* search */

    $searchButton
        .on('click', handler.doExplicitSearch)
        .keypress(function (e) {
            if (e.which == 13) {
                handler
                    .doExplicitSearch()
                ;
            }
        })
    ;

    $queryInput
        .keypress(function (e) {
            if (e.which == 13) {
                handler
                    .doExplicitSearch()
                ;
            }
        })
    ;

    /* delete */

    $deleteButton
        .on('click', handler.delete)
    ;

    $preDeleteButton
        .on('click', handler.showDeleteModal)
    ;

    $masterCheckbox
        .checkbox({
            onChecked: handler.selectAllCheckboxes,
            onUnchecked: handler.unselectAllCheckboxes
        })
    ;

    $checkboxes
        .checkbox({
            onChange: handler.fixMasterCheckbox
        })
    ;

};

$(document)
    .ready(categories.ready)
;