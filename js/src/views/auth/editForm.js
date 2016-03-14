define([
    'matreshka',
    'text!templates/views/auth/editForm.html',
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
                this.addDataKeys(['new_password1', 'new_password2']);
                this.user = user
                this.bindNode({
                    'sandbox': '.editForm',
                    'new_password1': ':sandbox #new_password1',
                    'new_password2': ':sandbox #new_password2',
                    'passwordValid': [':sandbox .passwordValidation', this.cssSetter],
                    'passwordConfirmValid': [':sandbox .passwordConfirmValidation', this.cssSetter],
                    'submit_button': [':sandbox .submit', {
                        setValue: function(value) {
                            $(this).prop('disabled', !value);
                        }
                    }]
                });

                this.set({'submit_button': false});
                this.linkProps('passwordValid', 'new_password1', function(password) {
                    return password.length > 4;
                }, {setOnInit: false});
                this.linkProps('passwordConfirmValid', 'new_password1 new_password2', function(password1, password2) {
                    return password2 == password1 && password2.length > 4;
                }, {setOnInit: false});

                this.linkProps('submit_button', ['passwordValid', 'passwordConfirmValid'], function(password1, password2) {
                    return password1 && password2;
                });
                this.on('submit::sandbox', this.submit);

            },
            submit: function(event) {
                event.preventDefault();
                data = JSON.stringify(this.toJSON())
                console.log(data);
                $.ajax({
                    url: 'http://vps.0upti.me/users/auth/password/change/',
                    type: 'POST',
                    context: this,
                    crossDomain: true,
                    data: data,
                    contentType: 'application/json',
                    beforeSend: function(xhr) {
                        xhr.setRequestHeader('Authorization', 'Token ' + user.token);
                    },
                })
                .done(function(data) {
                    this.password1 = '';
                    this.password2 = '';

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
