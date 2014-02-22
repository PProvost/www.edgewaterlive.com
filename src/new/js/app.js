function scrollIt(elt) {
	var offset = $(elt).offset();
	offset.top -= 60;
	$('html, body').animate({
		scrollTop: offset.top,
		scrollLeft: offset.left
	});
}

$(document).foundation();
