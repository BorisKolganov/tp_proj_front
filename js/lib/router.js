'use strict';

define(['director', 'viewManager', 'views/loginForm'], function (director, viewManager, loginForm) {
    // console.log(viewManager);
    // viewManager([loginForm])
    console.log(viewManager());
    console.log(manager);
    var routes = {
        '/index': function index() {
            alert('index');
        },
        '/about': function about() {
            alert('about');
        }
    };
    return director(routes);
});