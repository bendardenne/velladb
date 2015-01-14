$(document).on("ready", function() {

	$("#new").submit(function(event) {
		
		event.preventDefault();
		var text = [];
		$(".vellism-field input[type='text']").each(function() {
			text[text.length] = $(this).val();
		}); 
		console.log(text);
		var url = $("#url").val();

		$.post("/api/post", {text: text, url : url}, function(data){
			$("input:not([type='submit'])").val("");
			$("#message").html("<div class='alert alert-success'>"+data+"</div>");
		}).fail(function(jqXHR, textStatus, errorThrown) {
			console.log(jqXHR.responseText);
			$("#message").html("<div class='alert alert-danger alert-error'>"+ ErrorThrown+ ": " + jqXHR.responseText +"</div>");
		});
	});

	$(".add-field").on("click", function(event) {
		var div = $(".vellism-field").first().clone();
		div.find("input").val("");
		div.insertAfter($(".vellism-field").last());
	});

	$("form").on("click", ".remove-field", function(event) {
		if($('.vellism-field').length > 1)
			$(this).parent().parent().remove();
		else
			$(".vellism-field [type=text]").val("");
	});

});
