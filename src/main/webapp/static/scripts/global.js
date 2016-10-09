window.global = {
    handler: {}
};

global.ready = function () {

    // selectors

    var
        $logoutLink = $('#logout-link'),

        app = '',

        handler // alias
        ;

    // event handlers

    handler = {

        /* logout */

        logout: function () {
            $.ajax({
                url: app + '/api/agents/auth',
                type: 'DELETE',
                timeout: 9000, // 9 seconds

                success: function () {
                    console.log('logout success');
                    window.location = app + '/login';
                },

                error: function (xhr, textStatus) {
                    console.log('logout error: ' + textStatus);
                },

                complete: function () {
                    console.log('logout complete');
                }
            });
        }

    };

    global.handler = handler;

    /* logout */

    $logoutLink
        .on('click', handler.logout)
    ;

    $('.ui.dropdown').dropdown({
        on: 'hover'
    });

    $('.actionbar.overlay')
        .visibility({
            type: 'fixed'
        })
    ;

};

$(document)
    .ready(global.ready)
;