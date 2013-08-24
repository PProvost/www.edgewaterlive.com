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

	// Default task(s).
	grunt.registerTask('default', ['clean', 'htmlmin', 'copy', 'less', 'imagemin']);

};
