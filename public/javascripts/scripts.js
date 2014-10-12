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