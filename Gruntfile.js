'use strict';

module.exports = function(grunt) {

	// Load grunt tasks automatically
	require('load-grunt-tasks')(grunt);
	grunt.loadNpmTasks('grunt-wiredep');

	// Time how long tasks take. Can help when optimizing build times
	require('time-grunt')(grunt);

	// Define the configuration for all the tasks
	grunt.initConfig({

		// Project settings
		yeoman: {
			// configurable paths
			app: require('./bower.json').appPath || 'app',
			dist: 'dist'
		},

		// Watches files for changes and runs tasks based on the changed files
		watch: {
			js: {
				files: ['<%= yeoman.app %>/scripts/**/*.js'],
				options: {
					livereload: true
				}
			},
			compass: {
				files: ['<%= yeoman.app %>/{css,sass}/**/*.{css,sass,scss}'],
				tasks: ['compass:server', 'autoprefixer']
			},
			livereload: {
				options: {
					livereload: '<%= connect.options.livereload %>'
				},
				files: [
					'<%= yeoman.app %>/**/*.html',
					'<%= yeoman.app %>/data/**/*',
					'<%= yeoman.app %>/{css,sass}/**/*.{css,sass,scss}',
					'<%= yeoman.app %>/images/**/*.{png,jpg,jpeg,gif,webp,svg}'
				]
			}
		},

		// The actual grunt server settings
		connect: {
			options: {
				port: 9100,
				// Change this to '0.0.0.0' to access the server from outside.
				hostname: 'localhost',
				livereload: 35729
			},
			livereload: {
				options: {
					open: false,
					base: [
						'<%= yeoman.app %>'
					]
				}
			},
			test: {
				options: {
					port: 9001,
					base: [
						'test',
						'<%= yeoman.app %>'
					]
				}
			},
			dist: {
				options: {
					port: 9200,
					base: '<%= yeoman.dist %>'
				}
			}
		},

		// Make sure code styles are up to par and there are no obvious mistakes
		jshint: {
			options: {
				jshintrc: '.jshintrc',
				reporter: require('jshint-stylish')
			},
			all: {
				options: {
					reporter: 'checkstyle',
					reporterOutput: 'docs/reports/jshint/checkstyle.xml'
				},
				src: [
					'<%= yeoman.app %>/scripts/**/*.js'
				]
			},
			test: {
				options: {
					jshintrc: 'test/.jshintrc'
				},
				src: ['test/spec/**/*.js']
			}
		},

		// Check HTML
		htmlangular: {
			options: {
				doctype: false,
				tmplext: 'tpl.html',
				relaxerror: [
					'for attribute translate on element',
					'Attribute tanslate not allowed',
					'Empty heading',
					'Bad value X-UA-Compatible for attribute http-equiv on element meta.',
					'Section lacks heading. Consider using h2-h6 elements to add identifying headings to all sections.',
					'Attribute href without an explicit value seen.',
					'Bad value {{form.type}} for attribute type on element input',
					'Element li not allowed as child of element body in this context',
					'Element img is missing required attribute src'
				],
				customtags: [
					'pagination', 'tabset', 'nav-menu', 'breadcrumbs', 'flash-message',
					'action-links', 'accordion', 'sf-decorator', 'wizard', 'validation-status',
					'multiselect-dropdown', 'oauth', 'charges-table', 'offerings-summary-table','summary-item'
				],
				customattrs: [
					'translate', 'translate-attr-*', 'spinner', 'post-message', 'datepicker',
					'date-*', 'today', 'route-label', 'sf-*', 'schema-*', 'auto-tab-*', 'sfx-*',
					'bs-*', 'st-*', 'step', 'reload-options', 'auto-format', 'typeahead*'
				],
				reportpath: 'docs/reports/htmlangular/report.json'
			},

			dist: {
				files: {
					src: [
						'<%= yeoman.dist %>/*.html',
						'<%= yeoman.dist %>/components/*.html',
						'<%= yeoman.dist %>/scripts/**/*.html'
					]
				}
			},

			local: {
				files: {
					src: [
						'<%= yeoman.app %>/*.html',
						'<%= yeoman.app %>/components/*.html',
						'<%= yeoman.app %>/scripts/**/*.html'
					]
				}
			}
		},

		// Empties folders to start fresh
		clean: {
			dist: {
				files: [{
						dot: true,
						src: [
							'.tmp',
							'<%= yeoman.dist %>/*',
							'!<%= yeoman.dist %>/.git*'
						]
					}]
			},
			server: '.tmp'
		},

		// Add vendor prefixed styles
		autoprefixer: {
			options: {
				browsers: ['last 1 version']
			},
			dist: {
				files: [{
						expand: true,
						cwd: '.tmp/css/',
						src: '**/*.css',
						dest: '.tmp/css/'
					}]
			}
		},

		// Install bower components
		bower: {
			install: {
				options: {
					copy: false
				}
			}
		},

		// Automatically inject Bower components into the app
		wiredep: {
			app: {
				src: [
					'<%= yeoman.app %>/*.html',
					'<%= yeoman.app %>/components/*.html'
				],
				options: {
					exclude: [
						'bower_components/bootstrap/',
            'bower_components/tecnotree-ui-library/'
					]
				}
			}
		},

		// Compiles Sass to CSS and generates necessary files if requested
		compass: {
			options: {
				sassDir: '<%= yeoman.app %>/sass',
				cssDir: '<%= yeoman.app %>/css',
				generatedImagesDir: '.tmp/images/generated',
				imagesDir: '<%= yeoman.app %>/images',
				javascriptsDir: '<%= yeoman.app %>/scripts',
				fontsDir: '<%= yeoman.app %>/fonts',
				importPath: '<%= yeoman.app %>/bower_components',
				httpImagesPath: '/images',
				httpGeneratedImagesPath: '/images/generated',
				httpFontsPath: '/fonts',
				relativeAssets: false,
				assetCacheBuster: false,
				raw: 'Sass::Script::Number.precision = 10\n',
				debugInfo: true,
				sourcemap: true
			},
			dist: {
				options: {
					generatedImagesDir: '<%= yeoman.dist %>/images/generated',
					outputStyle: 'compressed'
				}
			},
			server: {
				options: {
				}
			}
		},

		// Renames files for browser caching purposes
		rev: {
			dist: {
				files: {
					src: [
						'<%= yeoman.dist %>/scripts/scripts.js',
						'<%= yeoman.dist %>/styles/**/*.css',
						'<%= yeoman.dist %>/images/**/*.{png,jpg,jpeg,gif,webp,svg}',
						'<%= yeoman.dist %>/styles/fonts/*'
					]
				}
			}
		},

		// Reads HTML for usemin blocks to enable smart builds that automatically
		// concat, minify and revision files. Creates configurations in memory so
		// additional tasks can operate on them
		useminPrepare: {
			html: [
				'<%= yeoman.app %>/*.html',
				'<%= yeoman.app %>/*/*.html'
			],
			options: {
				dest: '<%= yeoman.dist %>'
			}
		},

		// Performs rewrites based on rev and the useminPrepare configuration
		usemin: {
			html: [
				'<%= yeoman.dist %>/*.html',
				'<%= yeoman.dist %>/*/*.html'
			],
			css: ['<%= yeoman.dist %>/styles/**/*.css'],
			options: {
				assetsDirs: ['<%= yeoman.dist %>']
			}
		},

		// The following *-min tasks produce minified files in the dist folder
		imagemin: {
			dist: {
				files: [{
						expand: true,
						cwd: '<%= yeoman.app %>/images',
						src: '**/*.{png,jpg,jpeg,gif}',
						dest: '<%= yeoman.dist %>/images'
					}]
			}
		},

		htmlmin: {
			dist: {
				options: {
					collapseWhitespace: true,
					collapseBooleanAttributes: true,
					removeCommentsFromCDATA: true,
					removeOptionalTags: true
				},
				files: [{
						expand: true,
						cwd: '<%= yeoman.dist %>',
						src: ['**/*.html', 'views/**/*.html', 'scripts/**/*.html'],
						dest: '<%= yeoman.dist %>'
					}]
			}
		},

		// Minify JSON files
		'json-minify': {
			dist: {
				files: '<%= yeoman.dist %>/data/**/*.json'
			}
		},

		targethtml: {
			dist: {
				files: {
					'<%= yeoman.dist %>/index.html': '<%= yeoman.dist %>/index.html'
				}
			}
		},

		// Copies remaining files to places other tasks can use
		copy: {
			dist: {
				files: [{
					expand: true,
					dot: true,
					cwd: '<%= yeoman.app %>',
					dest: '<%= yeoman.dist %>',
					src: [
						'*.{ico,png,txt}',
						'.htaccess',
						'*.html',
						'components/*.html',
						'views/**/*.html',
						'scripts/**/*.html',
						'images/**/*.{webp}',
						'fonts/*',
						'data/**/*',
						'bower_components/**/*'
					]
				}, {
					expand: true,
					cwd: '.tmp/images',
					dest: '<%= yeoman.dist %>/images',
					src: ['generated/*']
				}]
			},
			scripts: {
				expand: true,
				cwd: '<%= yeoman.app %>',
				dest: '<%= yeoman.dist %>',
				src: [
					'scripts/**/*.js'
				]
			},
			styles: {
				expand: true,
				cwd: '<%= yeoman.app %>sass',
				dest: '.tmp/css/',
				src: '**/*.css'
			}
		},

		replace: {
			server: {
				options: {
					patterns: [
						{json: grunt.file.readJSON('config/environments/development.json')},
						{json: grunt.file.readJSON('package.json')}
					]
				},

				files: [{
					src:  '<%= yeoman.app %>/scripts/common/config.default.js',
					dest: '<%= yeoman.app %>/scripts/common/config.js'
				}]
			},

			dist: {
				options: {
					patterns: [
						{json: grunt.file.readJSON('config/environments/production.json')},
						{json: grunt.file.readJSON('package.json')},
						{
							match: /\<\@([^\>]+)\>/g,
							replacement: function(search, match) {
								return '<%= @'+match+' %>';
							}
						}
					]
				},

				files: [{
					src:  '<%= yeoman.app %>/scripts/common/config.default.js',
					dest: '<%= yeoman.dist %>/scripts/common/config.js'
				}]
			}
		},

		// Run some tasks in parallel to speed up the build process
		concurrent: {
			server: [
				'compass:server'
			],
			test: [
				'compass'
			],
			dist: [
				'compass:dist',
				'imagemin'
			]
		},

		// By default, your `index.html`'s <!-- Usemin block --> will take care of
		// minification. These next options are pre-configured if you do not wish
		// to use the Usemin blocks.
		// cssmin: {
		//   dist: {
		//     files: {
		//       '<%= yeoman.dist %>/css/main.css': [
		//         '.tmp/css/{,*/}*.css',
		//         '<%= yeoman.app %>/sass/{,*/}*.css'
		//       ]
		//     }
		//   }
		// },
		// concat: {
		//   dist: {}
		// },

		requirejs: {
			js: {
				options: {
					baseUrl: '<%= yeoman.dist %>/scripts/',
					mainConfigFile: '<%= yeoman.dist %>/scripts/main.js',
					name: 'app',
					out: '<%= yeoman.dist %>/scripts/scripts.js',
					optimize: 'none',
					uglify2: {
						  mangle: false
					},
					generateSourceMaps: true,
					preserveLicenseComments: false,
					skipDirOptimize: true,
					paths: {
						'requirejs': '../bower_components/requirejs/require',
						'init-app':  'init-app'
					},
					include: [
						'requirejs',
						'init-app'
					],
					excludeShallow: [
						'common/config'
					]
				}
			}
		},

		// Test settings
		karma: {
			dist: {
				configFile: 'karma.conf.js',
				browsers: ['PhantomJS'],
				autoWatch: true,
				singleRun: false
			},
			unit: {
				configFile: 'karma.conf.js',
				browsers: ['PhantomJS'],
				singleRun: true
			},
			jenkins: {
				configFile: 'jenkins.conf.js'
			}
		}
	});

	grunt.registerTask('serve', function(target) {
		var configPath = grunt.template.process('<%= yeoman.app %>/scripts/common/config.js');

		if (!grunt.file.exists(configPath)) {
			grunt.task.run('replace:server');
		}

		if (target === 'dist') {
			return grunt.task.run(['build', 'connect:dist:keepalive']);
		}

		grunt.task.run([
			'clean:server',
			'bower',
			'wiredep',
			'concurrent:server',
			'autoprefixer',
			'connect:livereload',
			'watch'
		]);
	});

	grunt.registerTask('server', function() {
		grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
		grunt.task.run(['serve']);
	});

	grunt.registerTask('test', [
		'clean:server',
		'concurrent:test',
		'autoprefixer',
		'connect:test',
		'karma'
	]);

	grunt.registerTask('jenkins', [
		'jshint:all',
		'karma:jenkins'
	]);

	grunt.registerTask('build', function() {
		var configPath = grunt.template.process('<%= yeoman.app %>/scripts/common/config.js');

		if (!grunt.file.exists(configPath)) {
			grunt.task.run('replace:server');
		}

		grunt.task.run([
			'clean:dist',
			'bower',
			'wiredep',
			'useminPrepare',
			'concurrent:dist',
			'autoprefixer',
			'copy:scripts',
			'replace:dist',
			'concat',
			'copy:dist',
			'targethtml:dist',
			'json-minify',
			'cssmin',
			'requirejs',
			'rev',
			'usemin',
			'htmlmin'
		]);
	});

	grunt.registerTask('default', [
		'newer:jshint',
		'test',
		'build'
	]);
};
