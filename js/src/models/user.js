define(['matreshka'], function(matreshka) {
    var clazz = matreshka.Class({
        'extends': matreshka.Object,
        constructor: function()  {
            var token = localStorage['token'];
            this.jset(this.defaultUser);
            this.on('change:token', this.fetch)
            this.jset({
                'token': token
            })
        },
        defaultUser: {
            username: '',
            token: '',
            email: '',
            first_name: '',
            last_name: '',
            userpic: ''
        },
        logout: function() {
            $.ajax({
                url: 'http://vps.0upti.me/users/auth/logout/',
                type: 'POST',
                context: this,
                crossDomain: true,
                beforeSend: function(xhr) {
                    xhr.setRequestHeader('Authorization', 'Token ' + this.token);
                },
                crossDomain: true,

            })
            .done(function() {
                this.jset(this.defaultUser);
                localStorage['token'] = ''
            })
            .fail(function() {
                console.log("error");
            })

        },
        fetch: function(token) {
            if (token.value) {
                $.ajax({
                    url: 'http://vps.0upti.me/users/',
                    type: 'GET',
                    context: this,
                    beforeSend: function(xhr) {
                        xhr.setRequestHeader('Authorization', 'Token ' + token.value);
                    },
                    crossDomain: true,
                })
                .done(function(data) {
                    this.jset(data);
                })
                .fail(function() {
                    localStorage['token'] = '';
                });
            }
        },
        setToken: function(token) {
            this.token = token;
            localStorage['token'] = token
        }

    });
    return new clazz();
})
