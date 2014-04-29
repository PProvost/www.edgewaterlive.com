(function() {
	module.exports.register = function(Handlebars, options) {

		var toString = Object.prototype.toString;

		function dump_object(obj) {
			var buff, prop;
			buff = [];
			for (prop in obj) {
				buff.push(dump_to_string(prop) + ': ' + dump_to_string(obj[prop]))
			}
			return '{' + buff.join(', ') + '}';
		}

		function dump_array(arr) {
			var buff, i, len;
			buff = [];
			for (i=0, len=arr.length; i<len; i++) {
				buff.push(dump_to_string(arr[i]));
			}
			return '[' + buff.join(', ') + ']';
		}

		function dump_to_string(obj) {
			if(!obj) return "undefined";

			if (toString.call(obj) == '[object Function]') {
				return obj.toString();
			} else if (toString.call(obj) == '[object Array]') {
				return dump_array(obj);
			} else if (toString.call(obj) == '[object String]') {
				return '"' + obj.replace('"', '\\"') + '"';
			} else if (obj === Object(obj)) {
				return dump_object(obj);
			}
			return obj.toString();
		}

		/**
		 * Helper name
		 * @param  {[type]} str [description]
		 * @return {[type]}     [description]
		 */
		Handlebars.registerHelper('dump', function(context, options) {
			console.log(dump_to_string(context));
		});

	};
}).call(this);
