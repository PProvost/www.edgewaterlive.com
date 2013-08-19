module.exports = function(grunt) {

	// Project config
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
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
	});

	// Load the plugins
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-imagemin');

	// Default task(s).
	grunt.registerTask('default', ['less', 'imagemin']);

};
