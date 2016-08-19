window.app = {};

app.ready = function () {

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
    .ready(app.ready)
;
