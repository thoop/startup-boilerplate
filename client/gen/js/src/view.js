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
