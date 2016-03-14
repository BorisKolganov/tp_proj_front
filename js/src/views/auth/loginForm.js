define([
    'matreshka',
    'text!templates/views/auth/loginForm.html',
    'jquery',
    'models/user'
],
    function (matreshka, template, $, user) {
        return matreshka.Class({
            'extends': matreshka.Object,
            constructor: function (DOMroot) {
                DOMroot.append(template)
                this.jset({
                    username: '',
                    password: '',
                    formValid: false
                })
                this.bindNode({
                    sandbox: '.loginForm',
                    username: ':sandbox .username',
                    password: ':sandbox .password',
                    resetPassword: ':sandbox .reset_password',
                    usernameValid: [':sandbox .usernameValidation', {
                        setValue: function(value) {
                            $(this).toggleClass('has-error');
                            $(this).find('.help-block')[value?'hide':'show']()
                        }
                    }],
                    passwordValid: [':sandbox .passwordValidation', {
                        setValue: function(value) {
                            $(this).toggleClass('has-error');
                            $(this).find('.help-block')[value?'hide':'show']()
                        }
                    }],
                    formValid: [':sandbox .submit', {
                        setValue: function (value) {
                            $(this).prop('disabled', !value);
                        }
                    }]
                })


                this.linkProps('usernameValid', 'username', function(username) {
                    return username.length > 4;
                }, {
                    setOnInit: false,
                })
                this.linkProps('passwordValid', 'password', function(password) {
                    return password.length > 5;
                }, {
                    setOnInit: false,
                })

                this.linkProps('formValid', 'passwordValid usernameValid', function(u, p) {
                    return u && p;
                })

                this.on('submit::sandbox', this.login)

                this.on('click::resetPassword', function() {
                    window.location.hash = '#/resetpassword';
                })
            },
            login: function(event) {
                console.log(JSON.stringify(this.toJSON()));
                event.preventDefault();
                $.ajax({
                    url: 'http://ec2-52-23-209-14.compute-1.amazonaws.com:8000/users/auth/login/',
                    type: 'POST',
                    contentType: 'application/json',
                    data: JSON.stringify(this.toJSON()),
                    context: this,
                    crossDomain: true,
                })
                .done(function(data) {
                    user.setToken(data.key);
                    this.username = '';
                    this.password = '';
                    window.location.hash = '#/'
                });
            },
            show: function() {
                this.trigger('show', this);
                $(this.bound()).show();
            },
            hide: function() {
                $(this.bound()).hide();
            }

        })
})
