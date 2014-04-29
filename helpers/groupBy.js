(function() {
	module.exports.register = function(Handlebars, options) {
		var _ = require('lodash');

		function _groupBy(arr, groupingFunc, sortingFunc) {
			var result = [];
			var decades = _.groupBy(arr, groupingFunc);
			for (var decade in decades) {
				result.push({
					groupName: decade,
					items: _.sortBy(decades[decade], sortingFunc)
				});
			}
			return _.sortBy(result, "groupName");
		}


		/**
		 * {{groupBy}}
		 *
		 * @param  {[type]}   array    [description]
		 * @param  {[type]}   options  [description]
		 * @return {[type]}            [description]
		 *
		 * @example:
		 * 		var songs = [
		 * 			{ 'name': 'Twinkle Twinkle', 'year': 1806, 'genre': 'Nursery Rhyme' },
		 * 			{ 'name': 'The Memphis Blues', 'year': 1912, 'genre': 'Blues' },
		 * 			{ 'name': 'Saint Louis Blues', 'year': 1914, 'grenre': 'Blues' }
		 * 		];
		 *
		 * 		{{#groupBy songs property="year" roundToNearest=10 sortBy="year"}}
		 * 		  <h1>{{key}}</h1>
		 * 		  {{#ul items}}
		 * 		    {{name}} - {{genre}}
		 * 		  {{/ul}}
		 * 		{{/groupBy}}
		 *
		 * 		{{#groupBy songs property="genre" sortBy="name"}}
		 * 		  <h1>{{key}}</h1>
		 * 		  {{#ul items}}
		 * 		    {{name}} - {{year}}
		 * 		  {{/ul}}
		 * 		{{/groupBy}}
		 */
		Handlebars.registerHelper('groupBy', function(array, options) {
			var property = options.hash['property'];
			var sortBy = options.hash['sortBy'] || property;
			var roundToNearest = options.hash['roundToNearest'];

			var groupedResults;
			if (roundToNearest) {
				groupedResults = _groupBy(array, function(item) { return Math.floor(item[property]/roundToNearest)*roundToNearest; }, function(item) { return item[sortBy]; });
			} else {
				groupedResults = _groupBy(array, function(item) { return item[property]; }, function(item) { return item[sortBy]; });
			}
			var result = '';

			_.each(groupedResults, function(group) {
				var key = group.groupName;
				var items = group.items;
				result += options.fn({
					key: key,
					items: items
				});
			});

			return result;
		});

	};

}).call(this);
