module.exports = function(grunt) {

	// Project config
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		clean: ['public/'],
		less: {
			dist: {
				options: {
					yuicompress: true
				},
				files: {
					"public/css/main.css": "src/less/main.less"
				},
			},
		},
		imagemin: {
			dynamic: {
				files: [{
					expand: true,
					cwd: 'src/',
					src: ['img/**/*.{png,jpg,gif}'],
					dest: 'public/'
				}]
			}
		},
		copy: {
			main: {
				files: [
					{expand: true, cwd: 'src', src:['BingSiteAuth.xml'], dest: 'public/' },
					{expand: true, cwd: 'src/ico', src: ['*'], dest: 'public/ico/', filter: 'isFile'},
					{expand: true, cwd: 'src/js', src: ['*.js'], dest: 'public/js/', filter: 'isFile'},
				]
			}
		},
		htmlmin: {
			dist: {
				options: {
					removeComments: true,
				},
				files: {
					'public/index.html': 'src/index.html',
					'public/404.html': 'src/404.html',
				},
			},
		},
	});

	// Load the plugins
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-htmlmin');

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
	grunt.registerTask('default', ['clean', 'htmlmin', 'copy', 'less', 'imagemin', 'sitemap']);

};
