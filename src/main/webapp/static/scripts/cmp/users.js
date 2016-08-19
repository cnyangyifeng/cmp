window.users = {
    handler: {}
};

users.ready = function () {

    // selectors
    var
        $filter = $('.filter'),
        $filterMenuItems = $filter.find('.ui.menu>.item'),
        handler // alias
        ;

    // event handlers
    handler = {
        activate: function () {
            $(this)
                .addClass('active')
                .siblings().removeClass('active')
            ;
        }
    };

    users.handler = handler;

    $filterMenuItems
        .on('click', handler.activate)
    ;

};

$(document)
    .ready(users.ready)
;