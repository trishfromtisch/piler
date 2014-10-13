//this function puts the New User form into the side bar
function newUserView (){
	var $sidebar = $("div.sidebar");
	$sidebar.empty();
	var newUserHtml = "<h4>New User</h4> <form role='form'> <div class='form-group'> <label for='name'>User Name</label> <input type='text' class='form-control' id='name' placeholder='e.g. PooperScooper123'> </div>"
	newUserHtml += "<div class='form-group'> <label for='email'>Email Address</label> <input type='email' class='form-control' id='email' placeholder='e.g. dogluvr@piler.com'> </div>"
	newUserHtml += "<div class='form-group'> <label for='password'>Password</label> <input type='password' class='form-control' id='password' placeholder='Password'> </div>" 
	newUserHtml += "<div class='form-group'> <label for='confirmPassword'>Confirm Password</label> <input type='password' class='form-control' id='confirmPassword' placeholder='Retype Password'> </div>" 
	newUserHtml += "<div class='form-group'> <label for='picture'>Picture</label> <input type='text' id='picture' class='form-control' placeholder='e.g. imgur.com/1234'> </div>"
	newUserHtml += "<div class='form-group'> <label for='subscribeNeighborhood'>Subscribe to a Neighborhood </label> <select id='subscribeNeighborhood'> <option value=''>-</option> </select> </div> </form>"
	newUserHtml += "<button type='submit' id='addUser' class='btn btn-default'>Submit</button>"
	$sidebar.append(newUserHtml);
	$.get("/neighborhoods", function(neighborhoods){
		$neighborhood = $("select#subscribeNeighborhood");
		neighborhoods = _.sortBy(neighborhoods, function(neighborhoodObject) {return neighborhoodObject.name})
		_.each(neighborhoods, function(neighborhoodInfo){
			$neighborhood.append("<option value='" + neighborhoodInfo["id"] + "'>" + neighborhoodInfo["name"] + "</option>")});
	});
	addNewUserButtonListener();
	}


//This function adds an event listener onto the submit new user function, which sends out an AJAX post request to add a new user 
function addNewUserButtonListener(){
	$("button#addUser").click(function(){
		var nameInput = $("input#name")
		var emailInput = $("input#email")
		var passwordInput = $("input#password")
		var confirmPasswordInput = $("input#confirmPassword")
		var pictureInput = $("input#picture")
		var subscribeNeighborhoodInput = $("select#subscribeNeighborhood")
		var name = nameInput.val()
		var email = emailInput.val()
		var password = passwordInput.val()
		var picture = pictureInput.val()

		if (password.toLowerCase() != confirmPasswordInput.val().toLowerCase()) {
			alert("Your passwords don't match! Please re-enter your password.")
		
		} else {
			
			if (subscribeNeighborhoodInput.val() == "") {
				var subscribeAnswer = false;
				var subscription_neighborhood_id = nil;
			} else {
				subscribeAnswer = true;
				subscription_neighborhood_id = subscribeNeighborhoodInput.val();
			}
			console.log(name + email + subscribeAnswer + subscription_neighborhood_id + picture) 
			$.post("/users", {
				name: name,
				email: email,
				password: password,
				subscribe: subscribeAnswer,
				subscription_neighborhood_id: subscription_neighborhood_id,
				picture: picture
			}).done(function(data){
				profileView(data)
				})

			}
		})
	}

function selectUserView(){
	var $sidebar = $("div.sidebar");
	$sidebar.empty();
	selectUserHtml = "<h4>Enter a User to View Their Profile</h4>"
	selectUserHtml +="<form role='form'> <div class='form-group'> <label for='queryName'>User Name</label> <input type='text' class='form-control' id='queryName' placeholder='e.g. PooperScooper123'> </div>"
	selectUserHtml += "</form><button type='submit' id='selectUserButton' class='btn btn-default'>Submit</button>"
	$sidebar.append(selectUserHtml)

	//function below adds event listener to selectUserButton
	$("button#selectUserButton").click(function(){
		var queryName = $("input#queryName").val()
		$.get("/users", function(usersInfo){
			//this while loop checks to see if user is in our database
			n = 0;
			while (n < usersInfo.length) {
				if (usersInfo[n].name.toLowerCase() == queryName.toLowerCase()) {		
					var selectedUser = usersInfo[n]
					n = usersInfo.length
				} else {
					selectedUser = ""
					n += 1;
				}}
				// if user is in database, the conditional below takes you to their profile, if not, you see an alert
			if (selectedUser != "") {
				profileView(selectedUser)
			} else {
				alert("User does not exist.")
			}

			});
		});
};

function profileView(user){
	var $sidebar = $("div.sidebar");
	console.log(user)
	$sidebar.empty();
		var profileViewHtml = "<div id='userProfileDiv'><h4>" + user.name + "</h4>"
		profileViewHtml += "<div class='row'><p id='userEmail'> E-mail: " + user.email + "</p><br><p id='userSubscriptionNeighborhood'></p></div?</div>"
	$sidebar.append(profileViewHtml)
	
	$.get("/neighborhoods/" + user.subscription_neighborhood_id, function(neighborhoodInfo){
		console.log(neighborhoodInfo)
		$("p#userSubscriptionNeighborhood").text("Subscription Neighborhood: " + neighborhoodInfo.name )
	})

	$.get("/users" + user.id + "/reports", function(reportsInfo) {
		var $userProfileDiv = $("div#userProfileDiv")
		_.each(reports, function(report){
			var moreProfileViewHtml = ""		
		})
		
	})

}



// ralph = User.create( {name: "Ralph Kramden", email: "ralph@dmta.gov", subscribe: true, subscription_neighborhood_id: alphabet_city.id, password: "norton"} )


$(function(){


	$("a#add").click(function(event){
		event.preventDefault;
		newUserView();
	})

	$("a#profile").click(function(event){
		event.preventDefault;
		selectUserView();
	})



})