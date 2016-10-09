window.users = {
    handler: {}
};

users.ready = function () {

    // selectors

    var
        $checkboxes = $('.user.checkbox'),
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

        app = '',

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
            query = $queryInput.val('');
            pageOffset = 0;
            action = 'find';
            $queryKeywordsLabel
                .html('加载中...')
            ;
            handler
                .find(pageOffset * limit)
            ;
            handler
                .findCount()
            ;
        },

        find: function (offset) {
            $masterCheckbox
                .checkbox('uncheck')
            ;
            handler
                .animatedScrollTop()
            ;
            handler
                .indicateDataLoading()
            ;

            $.ajax({
                url: app + '/api/users/from/' + offset,
                type: 'GET',
                timeout: 30000, // 30 seconds

                success: function (json) {
                    console.log('find success');
                    setTimeout(function () {
                        handler
                            .refreshData(json, '')
                        ;
                        handler
                            .refreshPagination(action)
                        ;
                    }, 500);
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
                url: app + '/api/users/count',
                type: 'GET',
                timeout: 30000, // 9 seconds

                success: function (count) {
                    console.log('find count success');
                    totalCount = count;
                    setTimeout(function () {
                        handler
                            .refreshPagination(action)
                        ;
                    }, 500);
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
            $queryKeywordsLabel
                .html('加载中...')
            ;
            handler
                .searchByName(pageOffset * limit, query)
            ;
            handler
                .searchByNameCount(query)
            ;
        },

        searchByName: function (offset, q) {
            $masterCheckbox
                .checkbox('uncheck')
            ;
            $searchButton
                .addClass('loading disabled')
            ;
            handler.
                animatedScrollTop()
            ;
            handler
                .indicateDataLoading()
            ;

            $.ajax({
                url: app + '/api/search/users/from/' + offset + '?q=' + q,
                type: 'GET',
                timeout: 9000, // 9 seconds

                success: function (json) {
                    console.log('search success');
                    setTimeout(function () {
                        handler
                            .refreshData(json, q)
                        ;
                        handler
                            .refreshPagination(action)
                        ;
                        $searchButton
                            .removeClass('loading disabled')
                        ;
                    }, 500);
                },

                error: function (xhr, textStatus) {
                    console.log('search error: ' + textStatus);
                    $searchButton
                        .removeClass('loading disabled')
                    ;
                },

                complete: function () {
                    console.log('search complete');
                }
            });
        },

        searchByNameCount: function (q) {
            $.ajax({
                url: app + '/api/search/users/count?q=' + q,
                type: 'GET',
                timeout: 9000, // 9 seconds

                success: function (count) {
                    console.log('search for name count success');
                    totalCount = count;
                    setTimeout(function () {
                        handler
                            .refreshPagination(action)
                        ;
                    }, 500);
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

        animatedScrollTop: function () {
            $('html, body').animate({
                scrollTop: 0
            });
        },

        indicateDataLoading: function () {
            var tableBody =
                    '<tr>' +
                    '  <td colspan="4">' + '数据加载中...' + '</td>' +
                    '</tr>'
                ;
            $workTable
                .find('tbody').html(tableBody)
            ;

            $workTable
                .find('tfoot').addClass('hidden') // hide pagination
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
                    '</span> ” 相关内容，点击 <a href="#" id="reset-query-label">这里</a> 清空搜索条件'
                ;
            }

            $queryKeywordsLabel
                .html(hintBody)
            ;
            $('#reset-query-label')
                .on('click', handler.doExplicitFind)
            ;


            var tableBody = '';

            if (data.length == 0) {
                var blank = '';

                blank +=
                    '<td colspan="4">' +
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
                        '  <div class="user ui checkbox">' +
                        '    <input type="checkbox" id="' + data[i].userId + '">' +
                        '    <label for="' + data[i].userId + '">' + data[i].userName + '</label>' +
                        '  </div>' +
                        '</td>'
                    ;

                    row +=
                        '<td class="collapsing with-min-width">' + data[i].groupName + '</td>'
                    ;

                    row +=
                        '<td>' + data[i].serialNumber + '</td>'
                    ;

                    var viewUrl = app + '/users/' + data[i].userId;
                    row +=
                        '<td class="collapsing center aligned with-min-action-width">' +
                        '  <a href="' + viewUrl + '">查看</a>' +
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

            $checkboxes = $('.user.checkbox'); // fix bugs
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
            var userIds = [],
                $checkedCheckboxes = $checkboxes.filter('.checked')
                ;
            $checkedCheckboxes.each(function () {
                var userId = $(this).find('input').attr('id');
                userIds
                    .push(parseInt(userId))
                ;
            });

            if (userIds.length == 0) {
                $deleteModal
                    .modal('hide')
                ;
                return;
            }

            $deleteButton
                .addClass('loading disabled')
            ;

            $.ajax({
                url: app + '/api/users',
                type: 'DELETE',
                contentType: 'application/json',
                data: JSON.stringify(userIds),
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
                    $deleteButton
                        .removeClass('loading disabled')
                    ;
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

    users.handler = handler;

    /* find */

    handler
        .doExplicitFind()
    ;

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
    .ready(users.ready)
;