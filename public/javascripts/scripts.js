window.onload = function(){

	//When you click a#file, "File a Report" sidebar apppears
	$('a#file').click(function(){
		$('div.sidebar').children().remove()
		var template = _.template( $("#file_report_template").html() );
		$('div.sidebar').append(template);
	});

	//When you click a#profile, "User Profile" sidebar apppears
	$('a#profile').click(function(){
		$('div.sidebar').children().remove()
		var template = _.template( $("#user_profile_template").html() );
		$('div.sidebar').append(template);
	})
};

function whichNeighborhood(){
  //this is for the splash page where they pick the neighborhood
  $.get("/neighborhoods", function(neighborhoods){
    var innards = "<select name ='neighborhood' class='neighborhood'>"
    for (var i = 0; i < neighborhoods.length; i ++){
      innards += "<option value="+ neighborhoods[i].id+">" + neighborhoods[i].name + "</option>"
      }
    innards += "</select>"+"<button id='enter'>ENTER</button>"
     $(".sidebar").html(innards)
  })
  RSS()

}


function RSS(){
  $("#enter").click(function(event){
    neighborhood = $("[name='neighborhood']").val()

  })

}




