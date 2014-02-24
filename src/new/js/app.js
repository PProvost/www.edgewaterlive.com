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
});
