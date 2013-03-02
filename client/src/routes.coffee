jQuery ->
    Main.Routes.App = Backbone.Router.extend

        routes:
            '' : 'showHome'

        showHome: ->
            view = new Main.View.Home
            view.render()



    #create the routes
    window.app = new Main.Routes.App();

    #start backbone
    Backbone.history.start
        pushState: true


    #listen for click on any <a> tags and handle them client side
    $(document).on 'click', 'a', (evt) ->

        href = $(this).attr 'href'
        protocol = @protocol + '//'

        if href.slice(0, protocol.length) != protocol
            evt.preventDefault()

            #these should be handled by listeners on <a> tags
            if href == '#'
                return

            app.navigate href, true
