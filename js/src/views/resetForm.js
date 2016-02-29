define([
    'matreshka',
    'text!templates/views/resetForm.html',
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
                this.jset({
                    email: '',
                })
                this.set({
                    formValid: false
                })
                this.bindNode({
                    sandbox: '.resetForm',
                    email: ':sandbox #email',
                    emailValid: [':sandbox .emailValidation', this.cssSetter],
                    formValid: [':sandbox .submit', {
                        setValue: function (value) {
                            $(this).prop('disabled', !value);
                        }
                    }]
                })

                this.linkProps('emailValid', 'email', function(email) {
                    return email.length > 5;
                }, {
                    setOnInit: false
                })
                this.linkProps('formValid', 'emailValid', function(email) {
                    return email;
                })

                this.on('submit::sandbox', this.login)
            },
            login: function(event) {
                event.preventDefault();
                data = JSON.stringify(this.toJSON());
                $.ajax({
                    url: 'http://ec2-52-23-209-14.compute-1.amazonaws.com:8000/users/auth/password/reset/',
                    type: 'POST',
                    context: this,
                    crossDomain: true,
                    data: data,
                    contentType: 'application/json',
                }).done(function(data) {
                    console.log(data);
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
