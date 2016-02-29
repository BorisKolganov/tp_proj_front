define([
    'matreshka',
    'text!templates/views/blocks/header.html',
    'views/blocks/loginDropdown'
], function(matreshka, template, loginDropdown) {
    return matreshka.Class({
        'extends': matreshka,
        constructor: function(DOMroot)  {
            DOMroot.prepend(template);
            this.loginDropdown = new loginDropdown(DOMroot.find('.loginDropdown'))
        }
    })
})
