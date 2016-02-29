define([
    'matreshka',
    'viewManager',
    'views/blocks/header',
    'models/user',
    'views/loginForm',
    'views/feed',
    'views/registrationForm',
    'views/resetForm',
    'views/editForm'
],
    function(matreshka, viewManager, headerView, user, loginForm, feed, registrationForm, resetForm, editForm) {
    return matreshka.Class({
        'extends': matreshka,
        constructor: function(DOMbody)  {
            this.DOM = DOMbody;
            this.application = this.DOM.children('.application')
            this.header = new headerView(this.application);
            this.manager = new viewManager(this.application, {
                loginForm: loginForm,
                feed: feed,
                registrationForm: registrationForm,
                resetForm: resetForm,
                editForm: editForm
            });
        }
    })
})
