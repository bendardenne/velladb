$(document).on("ready", function() {
	$("#refresh").on("click", replaceWithRandom);
	$("#next").on("click", replaceWithNext);
	$("#prev").on("click", replaceWithPrev);
	$("#first").on("click", replaceWithFirst);
	$("#last").on("click", replaceWithLast);
	$("#loadmore").on("click", loadMore);
	$("#goup").on("click", function(event){
		$('html, body').animate({ scrollTop: 0}, 350);
	});
});

function replaceWithFirst(index) {
	$.get("http://vella.bendardenne.be/api/1", function(data) {
		// Should still check for error...
		replace(data);
	});
}

function replaceWithLast(index) {
	$.get("http://vella.bendardenne.be/api/latest?limit=1", function(data) {
		// Should still check for error...
		replace(data[0]);
	});
}

function replaceWithNext(){
	var sid = $(".id").text();
	$.get("http://vella.bendardenne.be/api/next/" + sid, function(data) {
		if(data.length > 0)
			replace(data[0]);
	})
}

function replaceWithPrev(){
	var sid = $(".id").text();
	$.get("http://vella.bendardenne.be/api/prev/" + sid, function(data) {
		if(data.length > 0)
			replace(data[0]);
	});
}

function replaceWithRandom() {
	$.get("http://vella.bendardenne.be/api/random", function(data) {
		replace(data);
	});
}

function replace(newVellism) {
	$(".vellism > .lead").html(newVellism.text[0]);
	
	// Remove possible sub-vellisms
	$(".vellism > p:not(.lead)").remove();		

	// Add possible new ones
	for(var i = 1; i < newVellism.text.length; i++)
		$("<p>" + newVellism.text[i] + "</p>").insertAfter(".vellism > .lead");

	var date = new Date(newVellism.date);
	var dateS = addZero(date.getDate()) + "/"
		+ addZero(date.getMonth() + 1) + "/" + date.getFullYear();
	$(".id").html(newVellism.sid)	;
	$(".id").attr("href", "/view/" + newVellism.sid);
	$(".date").html("Ajouté le " + dateS);
	$(".fblink").attr("href", newVellism.url);
}

function loadMore(){
	var sid = $(".id").last().text();
	$.get("http://vella.bendardenne.be/api/prev/" + sid + "?limit=10", function(data)  {

		for(var i = 0; i < data.length; i++){
			
			var div = $(".vellism").first().clone();
			div.find(".lead").html(data[i].text[0])
			
			for(var j = 1; j < data[i].text.length; j++)
				div.append("<p>" + data[i].text[j] + "</p>");
			
			var date = new Date(data[i].date);
			var dateS = addZero(date.getDate()) + "/"
				+ addZero(date.getMonth() + 1) + "/" + date.getFullYear();
			div.find(".id").html(data[i].sid)	;
			div.find(".id").attr("href", "/view/" + data[i].sid);
			div.find(".date").html("Ajouté le " + dateS);
			div.find(".fblink").attr("href", data[i].url);
			
			div.insertAfter($(".vellism").last());
		}
		
		var n = $(window).height();
		$('html, body').animate({ scrollTop: $(document).scrollTop() + n - 100 }, 350);
	});
}

function addZero(n){
	return (n < 10 ? "0" + n :"" + n);
}
