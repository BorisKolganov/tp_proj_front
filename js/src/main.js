require.config({
    urlArgs: "_=" + (new Date()).getTime(),
    paths: {
        jquery: "../lib/jquery",
        underscore: "../lib/underscore",
        director: '../lib/director',
        matreshka: '../lib/matreshka',
        text: '../lib/text',
        bootstrap: '../lib/bootstrap',
        threexFullscreen: '../lib/threex.Fullscreen',
        three: '../lib/three',
        OBJLoader: '../lib/OBJLoader',
        MTLLoader: '../lib/MTLLoader',
        DDSLoader: '../lib/DDSLoader',
        ColladaLoader: '../lib/ColladaLoader',
        VRManager: '../lib/VRManager',
        VRPolyfill: '../lib/VRPolyfill',
        VREffect: '../lib/VREffect',
        VRControls: '../lib/VRControls'

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
        },
        VRManager: {
            deps: ['VRPolyfill', 'VREffect', 'VRControls']
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
    router.init('/');
});
