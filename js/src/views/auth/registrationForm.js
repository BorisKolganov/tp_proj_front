define([
    'matreshka',
    'text!templates/views/auth/registrationForm.html',
    'jquery',
    'models/user'
],
    function (matreshka, template, $, user) {
        return matreshka.Class({
            'extends': matreshka.Object,
            cssSetter: {
                setValue: function(value) {
                    if (value) {
                        $(this).removeClass('has-error');
                        $(this).find('.help-block').hide();
                    } else {
                        $(this).addClass('has-error');
                        $(this).find('.help-block').show();
                    }
                }
            },
            constructor: function (DOMroot) {
                DOMroot.append(template)
                this.addDataKeys(['username', 'email', 'first_name', 'last_name', 'password1', 'password2']);
                this.bindNode({
                    'sandbox': '.registrationForm',
                    'username': ':sandbox #username',
                    'email': ':sandbox #email',
                    'first_name': ':sandbox #first_name',
                    'last_name': ':sandbox #last_name',
                    'password1': ':sandbox #password1',
                    'password2': ':sandbox #password2',
                    'usernameValid': [':sandbox .usernameValidation', this.cssSetter],
                    'emailValid': [':sandbox .emailValidation', this.cssSetter],
                    'firstNameValid': [':sandbox .firstNameValidation', this.cssSetter],
                    'lastNameValid': [':sandbox .lastNameValidation', this.cssSetter],
                    'passwordValid': [':sandbox .passwordValidation', this.cssSetter],
                    'passwordConfirmValid': [':sandbox .passwordConfirmValidation', this.cssSetter],
                    'submit_button': [':sandbox .submit', {
                        setValue: function(value) {
                            $(this).prop('disabled', !value);
                        }
                    }]
                });

                // this.set({'submit_button': false});
                //
                // this.linkProps('passwordValid', 'password1', function(password) {
                //     return password.length > 4;
                // }, {setOnInit: false});
                // this.linkProps('passwordConfirmValid', 'passwordValid password2', function(passwordValid, password1, password2) {
                //     return passwordValid && password2.length > 4 && password2 == this.password1;
                // }, {setOnInit: false}), this
                // this.linkProps('passwordConfirmValid', 'password1 password2', function(password1, password2) {
                    // return password2 == password1 && password2.length > 4;
                // }, {setOnInit: false});

                this.linkProps('submit_button', ['passwordValid', 'passwordConfirmValid'], function(password1, password2) {
                    return password1 && password2;
                });
                this.on('submit::sandbox', this.submit);

            },
            submit: function(event) {
                event.preventDefault();
                data = JSON.stringify(this.toJSON())
                console.log(this.toJSON());
                $.ajax({
                    url: 'http://vps.0upti.me/users/auth/',
                    type: 'POST',
                    context: this,
                    crossDomain: true,
                    data: data,
                    contentType: 'application/json',
                })
                .done(function(data) {
                    this.username = '';
                    this.emal = '';
                    this.firstName = '';
                    this.lastName = '';
                    this.password1 = '';
                    this.password2 = '';
                    user.setToken(data.key)
                })
                .fail(function(data) {
                })
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
