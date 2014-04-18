function scrollIt(elt) {
   var offset = $(elt).offset();
   offset.top -= 60;
   $('html, body').animate({
      scrollTop: offset.top,
      scrollLeft: offset.left
   });
}

$(document).foundation();

$(document).ready(function() {
   // Add App Insights tracking for every hyperlink
   $('a').click(function() {
      var href = ($(this).attr('href'));
      var id = ($(this).attr('id')) || "";

      if (href && href != "") {
         if (href.match(/^javascript:/)) { return; }
         if (appInsights) {
            appInsights.logEvent('linkclick/' + id, { "url": href, });
            // alert('linkclick/' + id);
         }
      }
   });

	 function groupBy(arr, groupingFunc, sortingFunc) {
		 var result = [];
		 var decades = _.groupBy(arr, groupingFunc);
		 for (var decade in decades) {
			 result.push({
				 groupName: decade,
				 songs: _.sortBy(decades[decade], sortingFunc)
			 });
		 }
		 return _.sortBy(result, "groupName");
	 }

   $.when( $.getJSON('upcoming-shows.json'), $.getJSON('songs.json') ).done( function( eventsResponse, songsResponse ) {
      var viewModel = {};

      var songs = songsResponse[0];
      viewModel.songs = {};
      viewModel.songs.decades = groupBy(songs, function(song) { return Math.floor(song.year/10)*10; }, function(song) { return song.year; });
      viewModel.songs.genres = groupBy(songs, function(song) { return song.genre; }, function(song) { return song.name; });

      var events = eventsResponse[0];
      var temp = _.sortBy(events, function(event) { return Date.parse(event.date); });
      viewModel.events = _.first(temp, 3);

      _.each(viewModel.events, function(e,i,l) {
         var self = e;
         self.formattedDate = ko.computed({
            read: function() {
               var d = new Date(Date.parse(self.date));
               return d.toDateString();
            }
         });
      });

      ko.applyBindings(viewModel);
   });
});

