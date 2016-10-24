/**
 * Created by bcuser on 9/28/16.
 */
module.exports = function(grunt) {
    'use strict';

    grunt.initConfig({

        pkg: '<json:package.json>',

        jshint: {
            files: ['**/*.js'],

            options: {
                ignores: [
                    '**/node_modules/**', '**/components/**', '**/app.js'
                ],
                reporter: require('jshint-stylish'),
                strict: true,
                jasmine: true
            }
        },

        clean: {
            yourTarget: {
                src: ['**/node_modules/**', '**/components/**']
            }
        },

        jscs: {
            src: ['**/*.js', '!spec/bitly-links.js'],
            options: {
                config: '.jscsrc'
            }
        },

        'jsbeautifier': {
            files: ['**/*.js', '!**/node_modules/**', '!**/components/**', '!**/platforms/**'],
            options: {
                'indentSize': 4
            }
        },

    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-jscs');
    grunt.loadNpmTasks('grunt-jsbeautifier');
    grunt.registerTask('beautify', ['jsbeautifier']);
    grunt.registerTask('check', ['beautify', 'jscs', 'jshint']);
};
