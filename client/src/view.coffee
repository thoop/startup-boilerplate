jQuery ->
    Main.View.View = Backbone.View.extend

        afterInitialize: -> @
        
        afterRender: -> @

        beforeDestroy: -> @

        afterChangeModel: -> @

        initialize: ->
            if @model
                @listenTo(@model, 'change', @rerender)

            if @collection
                @listenTo(@collection, 'add', @rerender)
                @listenTo(@collection, 'remove', @rerender)
                @listenTo(@collection, 'change', @rerender)
                @listenTo(@collection, 'reset', @rerender)

            @renderToSelector = @options.renderToSelector
            @afterInitialize()

        getRenderData: ->
            return { model: @model.toJSON() } if @model
            return { collection: @collection.toJSON() } if @collection
            return {}

        render: ->
            @$el.html(@template(@getRenderData()))
            $(@renderToSelector || 'body').append(@el)
            @afterRender()
            @

        rerender: ->
            @$el.remove()
            @render()
            @delegateEvents()

        destroy: ->
            @beforeDestroy()
            @remove()
            @undelegateEvents()
            @unbind()

        changeModel: (model) ->
            @model = model
            @listenTo(@model, 'change', @rerender)
            @rerender()
            @afterChangeModel()
            @