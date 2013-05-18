this["JST"] = this["JST"] || {};

this["JST"]["home"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Handlebars.helpers; data = data || {};
  


  return "<div id=\"home\">It works!</div>";
  });
(function() {

  window.delay = function(ms, func, scope) {
    return setTimeout(_.bind(func, scope || this), ms);
  };

}).call(this);

(function() {
  var _base, _base1;

  window.Main || (window.Main = {});

  (_base = window.Main).View || (_base.View = {});

  (_base1 = window.Main).Routes || (_base1.Routes = {});

}).call(this);

(function() {

  jQuery(function() {
    return Main.View.View = Backbone.View.extend({
      afterInitialize: function() {
        return this;
      },
      afterRender: function() {
        return this;
      },
      beforeDestroy: function() {
        return this;
      },
      afterChangeModel: function() {
        return this;
      },
      initialize: function() {
        if (this.model) {
          this.listenTo(this.model, 'change', this.rerender);
        }
        if (this.collection) {
          this.listenTo(this.collection, 'add', this.rerender);
          this.listenTo(this.collection, 'remove', this.rerender);
          this.listenTo(this.collection, 'change', this.rerender);
          this.listenTo(this.collection, 'reset', this.rerender);
        }
        this.renderToSelector = this.options.renderToSelector;
        return this.afterInitialize();
      },
      getRenderData: function() {
        if (this.model) {
          return {
            model: this.model.toJSON()
          };
        }
        if (this.collection) {
          return {
            collection: this.collection.toJSON()
          };
        }
        return {};
      },
      render: function() {
        this.$el.html(this.template(this.getRenderData()));
        $(this.renderToSelector || 'body').append(this.el);
        this.afterRender();
        return this;
      },
      rerender: function() {
        this.$el.remove();
        this.render();
        return this.delegateEvents();
      },
      destroy: function() {
        this.beforeDestroy();
        this.remove();
        this.undelegateEvents();
        return this.unbind();
      },
      changeModel: function(model) {
        this.model = model;
        this.listenTo(this.model, 'change', this.rerender);
        this.rerender();
        this.afterChangeModel();
        return this;
      }
    });
  });

}).call(this);

(function() {

  jQuery(function() {
    return Main.View.Home = Main.View.View.extend({
      template: JST['home']
    });
  });

}).call(this);

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
