define(
    ['matreshka',
    'text!templates/views/feed.html',
    'jquery',
    'three',
    'mechanics/game'
    ],
    function (matreshka, template, $, THREE, game) {
        return matreshka.Class({
            'extends': matreshka.Object,
            constructor: function (DOMroot) {
                DOMroot.append(template);
                this.bindSandbox(".feed");

                $(this.sandbox).append(game.renderer.domElement);

                $(game.renderer.domElement).on('click', function(event) {
                    var el = event.toElement;
                    if(el.webkitRequestFullScreen) {
                        el.webkitRequestFullScreen();
                    }
                    else {
                        el.mozRequestFullScreen();
                    }
                });
                game.render()
                $(document).on('webkitfullscreenchange', function(event){
                    console.log(document.width);
                    if (document.webkitIsFullScreen) {

                    }
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
