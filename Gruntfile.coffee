module.exports = (grunt) ->


    grunt.loadNpmTasks 'grunt-contrib-concat'
    grunt.loadNpmTasks 'grunt-contrib-uglify'
    grunt.loadNpmTasks 'grunt-contrib-coffee'
    grunt.loadNpmTasks 'grunt-contrib-less'
    grunt.loadNpmTasks 'grunt-contrib-watch'
    grunt.loadNpmTasks 'grunt-jade-handlebars'

    grunt.registerTask 'default', ['coffee','less','jade_handlebars','concat','uglify']

    grunt.initConfig

        #watch and compile all folders separately for the quickest compile time
        watch:
            clientSrc:
                files: 'client/src/**/*.coffee'
                tasks: ['coffee:clientSrc', 'concat:js', 'uglify:js']

            clientStyles:
                files: 'client/styles/**/*.less'
                tasks: ['less:client', 'concat:css']

            clientTemplates:
                files: 'client/templates/**/*.jade'
                tasks: ['jade_handlebars', 'concat:js', 'uglify:js']

            clientTest:
                files: 'client/test/**/*.coffee'
                tasks: ['coffee:clientTest']

            serverSrc:
                files: 'server/src/**/*.coffee'
                tasks: ['coffee:serverSrc']

            serverStyles:
                files: 'server/styles/**/*.less'
                tasks: ['less:server', 'concat:css']

            serverTest:
                files: 'server/test/**/*.coffee'
                tasks: ['coffee:serverTest']


        coffee:
            clientSrc:
                expand: true
                cwd: 'client/src/'
                src: ['**/*.coffee']
                dest: 'client/gen/js/src'
                ext: '.js'

            clientTest:
                expand: true
                cwd: 'client/test/'
                src: ['**/*.coffee']
                dest: 'client/gen/js/test'
                ext: '.js'

            serverSrc:
                expand: true
                cwd: 'server/src/'
                src: ['**/*.coffee']
                dest: 'server/gen/js/src'
                ext: '.js'

            serverTest:
                expand: true
                cwd: 'server/test/'
                src: ['**/*.coffee']
                dest: 'server/gen/js/test'
                ext: '.js'

        jade_handlebars:
            options:
                processName: (filePath, x) ->
                    console.log(JSON.stringify(filePath, x))
                    pieces = filePath.split("/")
                    pieces.splice(2).join("/")
                your_target:
                  "gen/js/templates/hbs.js": "client/templates/**/*.jade"
            files:
                src: ["client/templates/**/*.jade"]
                dest: "client/gen/js/templates/hbs.js"

        less:
            client:
                options:
                    yuicompress: true

                files:
                    "client/gen/styles/main.css": "client/styles/*.less"

            server:
                options:
                    yuicompress: true
                    
                files:
                    "server/gen/styles/main.css": "server/styles/*.less"


        concat:
            js:
                src: [
                    'client/gen/js/templates/hbs.js',
                    'client/gen/js/src/global.js'
                    'client/gen/js/src/namespace.js'
                    'client/gen/js/src/view.js'
                    'client/gen/js/src/models/*.js'
                    'client/gen/js/src/collections/*.js'
                    'client/gen/js/src/views/*.js'
                    'client/gen/js/src/routes.js'
                ]
                dest: 'client/dist/main.js'

            css:
                src: ['client/gen/styles/*.css']
                dest: 'client/dist/main.css'


        uglify:
            js:
                files:
                    'client/dist/main.min.js' : 'client/dist/main.js'