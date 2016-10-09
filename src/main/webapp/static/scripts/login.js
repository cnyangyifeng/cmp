window.login = {
    handler: {}
};

login.ready = function () {

    // selectors

    var
        $mobileInput = $('#mobile-input'),
        $passwordInput = $('#password-input'),
        $loginButton = $('#login-button'),

        app = '',

        handler // alias
        ;

    // event handlers

    handler = {

        /* login */

        login: function () {
            var
                mobile = $mobileInput.val(),
                password = $passwordInput.val()
                ;

            if (!handler.validateMobileInput() || !handler.validatePasswordInput()) {
                return;
            }

            $loginButton
                .addClass('loading disabled')
            ;

            $.ajax({
                url: app + '/api/agents/auth',
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({
                    mobile: mobile,
                    password: password
                }),
                timeout: 9000, // 9 seconds

                success: function () {
                    console.log('login success');
                    setTimeout(function () {
                        window.location = app + '/';
                    }, 500);
                },

                error: function (xhr, textStatus) {
                    console.log('login error: ' + textStatus);
                    setTimeout(function () {
                        $loginButton
                            .removeClass('loading disabled')
                        ;
                    }, 500);
                },

                complete: function () {
                    console.log('login complete');
                }
            });
        },

        validateMobileInput: function () {
            return true;
        },

        validatePasswordInput: function () {
            return true;
        }

    };

    login.handler = handler;

    /* login */

    $loginButton
        .on('click', handler.login)
        .keypress(function (e) {
            if (e.which == 13) {
                handler
                    .login()
                ;
            }
        })
    ;

    $mobileInput
        .on('blur', handler.validateMobileInput)
    ;

    $passwordInput
        .on('blur', handler.validatePasswordInput)
    ;

};

$(document)
    .ready(login.ready)
;