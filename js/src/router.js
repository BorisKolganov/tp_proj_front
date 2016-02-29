define(['director', 'mainView', 'jquery'], function (director, mainView, $) {
    var mv = new mainView($('body'));
    var routes = {
        '/index': function() {},
        '/about': function() {},
        '/registration': function() {
            mv.manager.registrationForm.show();
        },
        '/login': function() {
            mv.manager.loginForm.show();
        },
        '/': function() {
            mv.manager.feed.show();
        },
        '/resetpassword': function(){
            mv.manager.resetForm.show();
        },
        '/editprofile': function() {
            mv.manager.editForm.show();
        }
    }
    return director(routes)
})
