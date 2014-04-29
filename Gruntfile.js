module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		clean: ['public/', 'data/'],

		sass: {
			options: {
				includePaths: ['bower_components/foundation/scss']
			},
			dist: {
				options: {
					outputStyle: 'compressed'
				},
				files: {
					'public/css/app.css': 'src/scss/app.scss'
				}        
			}
		},

		imagemin: {
			dynamic: {
				files: [
					{
					expand: true,
					cwd: 'src/',
					src: ['img/**/*.{png,jpg,gif}'],
					dest: 'public/'
				}
				]
			}
		},

		copy: {
			main: {
				files: [
					{expand: true, cwd: 'src', src: ['*.txt'], dest: 'public/', filter: 'isFile'},
					{expand: true, cwd: 'src/img/webicons', src: ['*.svg'], dest: 'public/img/webicons/', filter: 'isFile'},
					{src: 'src/img/favicon.ico', dest: 'public/img/favicon.ico' },
					{src: 'src/BingSiteAuth.xml', dest: 'public/BingSiteAuth.xml' },
					{src: 'src/upcoming-shows.json', dest: 'public/upcoming-shows.json' },
					{src: 'bower_components/foundation/js/foundation.min.js', dest: 'public/js/foundation.min.js'},
					{src: 'bower_components/knockout-3.1.0/index.js', dest: 'public/js/knockout.min.js'}
				]
			}
		},

		htmlmin: {
			dist: {
				options: {
					removeComments: true,
					collapseWhitespace: false
				},

				files: [{
					expand: true,
					cwd: 'src/',
					src: ['*.html'],
					dest: 'public/'
				}]
			},
		},

		uglify: {
			options: {
				compress: true,
				report: 'min'
			},
			dist: {
				files: [
					{ dest: 'public/js/app.js', src: 'src/js/app.js' },
					{ dest: 'public/js/fastclick.min.js', src:'bower_components/fastclick/lib/fastclick.js' }
				]
			}
		},

		convert: {
			options: {
				explicitArray: false
			},

			songs: {
				src: 'src/songs.csv',
				dest: 'data/songs.json'
			},
			shows: {
				src: 'src/shows.csv',
				dest: 'data/shows.json'
			}
		},

		watch: {
			gruntfile: { 
				files: ['Gruntfile.js']
			},

			content: {
				files: ['src/*.json'],
				tasks: ['copy']
			},

			html: {
				files: ['src/*.html'],
				tasks: ['htmlmin']
			},

			sass: {
				files: ['src/scss/**/*.scss'],
				tasks: ['sass']
			}
		},

		assemble: {
			options: {
				data: [ 'src/**/*.{json,yml}', 'data/**/*.{json,yml}' ],
				helpers: [ 'helpers/**/*.js' ],
				plugins: ['assemble-contrib-sitemap']
			},

			pages: {
				files: [
					{ expand: true, cwd: 'src', dest: 'public/', src: ['**/*.hbs'] }
				]
			}
		}
	});

	// Load the plugins
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-htmlmin');
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-sass');
	grunt.loadNpmTasks('grunt-shell');
	grunt.loadNpmTasks('grunt-convert');
	grunt.loadNpmTasks('assemble');

	// Build task(s)
	grunt.registerTask('build', ['htmlmin', 'uglify', 'copy', 'convert', 'sass', 'imagemin', 'assemble']);

	// For Heroku deployment
	grunt.registerTask('heroku', ['clean', 'build']);

	grunt.registerTask('default', ['clean', 'build']);

};
