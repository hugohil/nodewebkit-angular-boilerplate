module.exports = function(grunt) {
    var name = grunt.option('name') || 'yourAppName';
    var author = grunt.option('author') || 'your name';
    var platform = grunt.option('platform') || 'linux64';

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
               platforms: [platform], // Don't forget to change this for your platform
               buildDir: 'webkitbuilds', // Where the build version of my node-webkit app is saved
            },
            src: ['dist/**/*'] // Your node-webkit app
        },
        replace: {
            appName: {
                src: ['app/**/*.js', 'app/**/*.html', 'app/package.json', 'Gruntfile.js', 'bower.json', 'package.json'],             // source files array (supports minimatch)
                overwrite: true,
                replacements: [{
                    from: 'yourAppName',                   // string replacement
                    to: name
                }]
            },
            author: {
                src: ['bower.json', 'package.json', 'Gruntfile.js'],
                overwrite: true,
                replacements: [{
                    from: 'your name',
                    to: author
                }]
            },
            nwPlatform: {
                src: ['Gruntfile.js'],
                overwrite: true,
                replacements: [{
                    from: 'linux64',
                    to: platform
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
    grunt.registerTask('nw', ['copy', 'nodewebkit', 'run-nodewebkit', 'watch:nw']);
    grunt.registerTask('init', ['replace']);
}