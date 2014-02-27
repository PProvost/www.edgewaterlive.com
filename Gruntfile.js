module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		clean: ['public/'],
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
					{src: 'bower_components/foundation/js/foundation.min.js', dest: 'public/js/foundation.min.js'}
				]
			}
		},
		htmlmin: {
			dist: {
				options: {
					removeComments: true,
					collapseWhitespace: false
				},
				files: {
					'public/index.html': 'src/index.html',
					'public/404.html': 'src/404.html',
				},
			},
		},
		uglify: {
			options: {
				compress: true,
				report: 'min'
			},
			dist: {
				files: {
					'public/js/app.js': ['src/js/app.js']
				}
			}
		},
    watch: {
      grunt: { files: ['Gruntfile.js'] },

      sass: {
        files: 'src/scss/**/*.scss',
        tasks: ['sass']
      }
    }
	});

	// Load the plugins
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-htmlmin');
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-sass');

	// Custom sitemap task since the plugin on grunt.js is broken
	grunt.registerTask('sitemap', 'Creates a sitemap for all html files in public/', function() {
		// Options
		var rootUrl = 'http://www.edgewaterliveband.com/';
		var basePath = 'public';
		var changefreq = 'daily';
		
		// Guts
		var fs = require('fs');
		var lf = grunt.util.linefeed;
		var files = grunt.file.expand({ cwd: basePath }, '**/*.html');
		var xml = '<?xml version="1.0" encoding="UTF-8"?>' + lf;
		xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' + lf;
		for (var index in files) {
			var file = files[index];
			if (!file.match(/404\.html$/i)) {
				xml += '<url>' + lf;
				xml += '<loc>' + rootUrl + file + '</loc>' + lf;
				var mtime = (fs.statSync(basePath + '/' + file).mtime).getTime() 
				xml += '<lastmod>' + (new Date(mtime).toISOString()) + '</lastmod>';
				xml += '<changefreq>' + changefreq + '</changefreq>';
				xml += '</url>' + lf;
			}
		};
		xml += '</urlset>';
		grunt.file.write(basePath + '/sitemap.xml', xml);
		grunt.log.writeln("Sitemap.xml created successfully");	
	});

	// Default task(s).
	grunt.registerTask('default', ['clean', 'htmlmin', 'uglify', 'copy', 'sass', 'imagemin', 'sitemap']);

};
