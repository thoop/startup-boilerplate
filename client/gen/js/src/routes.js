(function() {

  jQuery(function() {
    Main.Routes.App = Backbone.Router.extend({
      routes: {
        '': 'showHome'
      },
      showHome: function() {
        var view;
        view = new Main.View.Home;
        return view.render();
      }
    });
    window.app = new Main.Routes.App();
    Backbone.history.start({
      pushState: true
    });
    return $(document).on('click', 'a', function(evt) {
      var href, protocol;
      href = $(this).attr('href');
      protocol = this.protocol + '//';
      if (href.slice(0, protocol.length) !== protocol) {
        evt.preventDefault();
        if (href === '#') {
          return;
        }
        return app.navigate(href, true);
      }
    });
  });

}).call(this);
