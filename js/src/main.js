require.config({
    urlArgs: "_=" + (new Date()).getTime(),
    paths: {
        jquery: "../lib/jquery",
        underscore: "../lib/underscore",
        director: '../lib/director',
        matreshka: '../lib/matreshka',
        text: '../lib/text',
        bootstrap: '../lib/bootstrap',
    },
    shim: {
        'underscore': {
            exports: '_'
        },
        'director': {
            exports: 'Router'
        },
        bootstrap : {
            deps :['jquery']
        }
    }
});

define([
    'router',
    'matreshka',
    'bootstrap'
], function(
    router,
    matreshka,
    bootstrap
){
    // var token = localStorage['token']
    // if (token) {
    //     $.ajaxSetup({
    //         beforeSend: function(xhr) {
    //             xhr.setRequestHeader('Authorization', token);
    //         }
    //     });
    // }
    router.init('/');
});
