module.exports = function(grunt) {
    var name = grunt.option('name') || 'yourAppName';
    grunt.log.write(name);

    // Project configuration.
    grunt.initConfig({
        copy: {
            files: {
                expand: true, cwd: 'app/', src: ['**'], dest: 'dist/'
            },
            components: {
                expand: true, cwd: 'bower_components/', src: ['**'], dest: 'dist/bower_components'
            }
        },
        connect: {
            server: {
                options: {
                    hostname: 'localhost',
                    port: 8080,
                    base: 'dist',
                    open: true,
                    livereload: true
                }
            }
        },
        watch: {
            options: {
                livereload: true,
            },
            browser: {
                files: ['app/**'],
                tasks: ['copy']
            },
            nw: {
                files: ['app/**'],
                tasks: ['nodewebkit', 'run-nodewebkit'],
            }
        },
        nodewebkit: {
            options: {
               platforms: ['linux64'], // Don't forget to change this for your platform
               buildDir: 'webkitbuilds', // Where the build version of my node-webkit app is saved
            },
            src: ['dist/**'] // Your node-webkit app
        },
        replace: {
            appName: {
                src: ['app/**/*.js', 'app/**/*.html', 'Gruntfile.js'],             // source files array (supports minimatch)
                overwrite: true,
                replacements: [{
                    from: 'yourAppName',                   // string replacement
                    to: name
                }]
            }
        }
    });


    grunt.registerTask('run-nodewebkit', function(){
        var exec = require('child_process').exec;
        exec("kill $(ps -ef | grep yourAppName | awk '{print $2}')");
        exec('webkitbuilds/yourAppName/linux64/./yourAppName');
    });

    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-node-webkit-builder');
    grunt.loadNpmTasks('grunt-text-replace');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.registerTask('default', ['copy', 'connect', 'watch:browser']);
    grunt.registerTask('nw', ['nodewebkit', 'run-nodewebkit', 'watch:nw']);
    grunt.registerTask('init', ['replace']);
}