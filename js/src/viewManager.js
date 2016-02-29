define(['matreshka', 'underscore'], function(matreshka, _) {
    return matreshka.Class({
        'extends': matreshka.Object,
        // views: new matreshka.Object(),
        constructor: function(DOMroot, views)  {
            _.each(views, function(view, key) {
                this.jset(key, new view(DOMroot));
            }, this);
            this.on('*@show', function(ent) {
                this.hideAllViews();
            })
            this.hideAllViews();
        },
        hideAllViews: function() {
            this.each(function(view){
                view.hide();
            })
        }
    })
})
