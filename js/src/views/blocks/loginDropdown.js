define([
    'matreshka',
    'text!templates/views/blocks/loginDropdown_authorized.html',
    'text!templates/views/blocks/loginDropdown_not_authorized.html',
    'models/user',
    'jquery'
], function(matreshka, template_authorized, template_not_authorized, user, $) {
    return matreshka.Class({
        'extends': matreshka,
        constructor: function(DOMroot) {
            this.user = user;
            this.isAuthenticated = false
            this.bindSandbox('.loginDropdown');
            this.on('click::logout', function() {
                this.user.logout();
            }, this)
            this.on('change:isAuthenticated', function(evt) {
                if (evt.value) {
                    $(this.sandbox).html(template_authorized)
                    this.bindNode(this.authenticatedNodes);
                } else {
                    this.unbindNode(this.authenticatedNodes);
                    $(this.sandbox).html(template_not_authorized);
                }
            }, this)
            this.linkProps('isAuthenticated', 'user.token', function(isAuthenticated) {
                return isAuthenticated;
            })
        },
        authenticatedNodes: {
            'user.username': ['.username', {
                setValue(v) {
                    $(this).html(v)
                }
            }],
            'logout': ':sandbox .logout'
        },
        notAuthenticatedNodes: {
            'helloHeader': ':sandbox .helloHeader',
            'login': ':sandbox .login',
            'register': ':sandbox .register'
        }
    })
})
