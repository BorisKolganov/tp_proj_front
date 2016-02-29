define(
    ['matreshka',
    'text!templates/views/feed.html',
    'jquery'],
    function (matreshka, template, $) {
        return matreshka.Class({
            'extends': matreshka.Object,
            constructor: function (DOMroot) {
                DOMroot.append(template);
                this.bindSandbox(".feed");
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
