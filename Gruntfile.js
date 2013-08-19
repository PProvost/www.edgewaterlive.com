module.exports = function(grunt) {
	
	// Project config
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'src/<%= pkg.name %>.js',
        dest: 'build/<%= pkg.name %>.min.js'
      }
    },
		less: {
			dist: {
				options: {
					yuicompress: true
				},
				files: {
						"public/css/main.css": "less/main.less"
				}
			}
		}
  });

  // Load the plugins
  grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-less');

  // Default task(s).
	grunt.registerTask('default', ['less']);

};
