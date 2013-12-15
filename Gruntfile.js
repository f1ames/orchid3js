module.exports = function(grunt) {
    
    var banner = '/* orchid3.js by Krzysztof Krztoń (aka f1ames). id3 algorithm in js. */\n\n';

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            dist: {
                src: [
                    'src/namespace.js',
                    'src/util.js',
                    'src/set.js',
                    'src/tree.js',
                    'src/node.js',
                    'src/factory.js',
                ],
                dest: 'build/orchid3.js',
            },
            options: {
                banner: banner,
                separator: '\n\n\n'
            }
        },
        uglify: {
            build: {
                src: 'build/orchid3.js',
                dest: 'build/orchid3.min.js'
            },
            options: {
                banner: banner
            }
        },
        removelogging: {
            dist: {
              src: 'build/orchid3.js',
              dest: 'build/orchid3.js'
            }
        },
        watch: {
            scripts: {
                files: ['src/*.js'],
                tasks: ['concat', 'removelogging', 'uglify', 'copy'],
                options: {
                    spawn: false,
                },
            } 
        },
        copy: {
            main: {
                src: 'build/orchid3.js',
                dest: 'demo/orchid3/orchid3.js'
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-remove-logging');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    
    grunt.registerTask('default', ['concat', 'removelogging', 'uglify', 'copy']);
};