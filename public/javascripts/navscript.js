//this function puts the New User form into the side bar
function newUserView (){
	var $sidebar = $("div.sidebar");
	$sidebar.empty();
	var newUserHtml = "<h4>New User</h4> <form role='form'> <div class='form-group'> <label for='name'>User Name</label> <input type='text' class='form-control' id='name' placeholder='e.g. PooperScooper123'> </div>"
	newUserHtml += "<div class='form-group'> <label for='email'>Email Address</label> <input type='email' class='form-control' id='email' placeholder='e.g. dogluvr@piler.com'> </div>"
	newUserHtml += "<div class='form-group'> <label for='password'>Password</label> <input type='password' class='form-control' id='password' placeholder='Password'> </div>" 
	newUserHtml += "<div class='form-group'> <label for='confirmPassword'>Confirm Password</label> <input type='password' class='form-control' id='confirmPassword' placeholder='Retype Password'> </div>" 
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
 
		if (password.toLowerCase() != confirmPasswordInput.val().toLowerCase()) {
			alert("Your passwords don't match! Please re-enter your password.")
		
		} else {
			
			if (subscribeNeighborhoodInput.val() == "") {
				var subscribeAnswer = false;
				var subscription_neighborhood_id = "nil";
			} else {
				subscribeAnswer = true;
				subscription_neighborhood_id = subscribeNeighborhoodInput.val();
			}
			console.log(name + email + subscribeAnswer + subscription_neighborhood_id) 
			$.post("/users", {
				name: name,
				email: email,
				password: password,
				subscribe: subscribeAnswer,
				subscription_neighborhood_id: subscription_neighborhood_id
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
		profileViewHtml += "<div class='row'><p id='userEmail'> E-mail: " + user.email + "</p><br><p id='userSubscriptionNeighborhood'></p></div><h4>Reports Filed</h4><ul id='reportsUl'></ul><button class='btn btn-primary' id='editToggle'>Edit</button></div>"
		profileViewHtml += "<form style='display:none' role='form' class='editUser'> <div class='form-group'>"
		profileViewHtml += "<label for='newNameInput'>Name</label> <input type='text' class='form-control newNameInput' placeholder='New Name'> </div>"
		profileViewHtml += "<div class='form-group'> <label for='newEmailInput'>New E-mail</label> <input type='text' class='form-control newEmailInput' placeholder='New Email.'> </div>"
		profileViewHtml += "<div class='form-group'> <label for='editSubscribeNeighborhood'>Subscribe to a New Neighborhood </label> <select id='editSubscribeNeighborhood'> <option value=''>-</option> </select></div>"
		profileViewHtml += "<div class='form-group'> <label for='editPassword'>Password</label> <input type='password' class='form-control editPassword' placeholder='Enter Password to edit profile.'> </div>"
		profileViewHtml += "<button type='button' class='btn btn-primary saveChanges'>Save changes</button> </div> </form>"
	$sidebar.append(profileViewHtml)
 
	$.get("/neighborhoods/" + user.subscription_neighborhood_id, function(neighborhoodInfo){
		console.log(neighborhoodInfo)
		$("p#userSubscriptionNeighborhood").text("Subscription Neighborhood: " + neighborhoodInfo.name )
	})
 
	$.get("/users/" + user.id + "/reports", function(reportsInfo) {
		var $reportsUl = $("ul#reportsUl")
		_.each(reportsInfo, function(report){
			var reportsLi = "<li>" + report.created_at+"  <img src='"+report.picture+"' width='50' height ='50'></li><button class='btn btn-primary btn-xs' data-toggle='modal' data-target='#"+report.id+"'>MORE INFORMATION</button>"    	
			reportsLi += "<div class='modal fade' id='"+report.id+"' tabindex='-1' role='dialog' aria-labelledby='myModalLabel' aria-hidden='true'><div class='modal-dialog'><div class='modal-content'><div class='modal-header'><button type='button' class='close' data-dismiss='modal'><span aria-hidden='true'>&times;</span><span class='sr-only'>Close</span></button><h4 class='modal-title' id='myModalLabel'>"+report.description+"<br>VOTES "+ report.votes+" </h4></div><div class='modal-body profile-modal'>"
			reportsLi +="</div><div class='modal-footer'><button type='button' class='btn btn-default close' data-dismiss='modal'>Close</button></div></div></div></div>"
			$reportsUl.append(reportsLi)
			closeButton()

	})
	addEditToggle(user);
	addSaveChangesButton(user);
})
}
 
// code below toggles edit fields
function addEditToggle(user){
	var editToggle = $("button#editToggle")
	editToggle.click(function(){
		$("form.editUser").toggle("slow")
 
		$.get("/neighborhoods", function(neighborhoods){
		$editNeighborhood = $("select#editSubscribeNeighborhood");
		neighborhoods = _.sortBy(neighborhoods, function(neighborhoodObject) {return neighborhoodObject.name})
		_.each(neighborhoods, function(neighborhoodInfo){
			$editNeighborhood.append("<option value='" + neighborhoodInfo["id"] + "'>" + neighborhoodInfo["name"] + "</option>")});
	});	
	})
}
 
function addSaveChangesButton(user) {
// code below sends put request to edit user
	var saveChangesButton = $("button.saveChanges")
	saveChangesButton.click(function(){
		var newNameInput = $("input.newNameInput")
		var newEmailInput = $("input.newEmailInput")
		var editPassword = $("input.editPassword").val()
		
		if (editPassword.toLowerCase() != user.password.toLowerCase()) {
			alert("Password incorrect. Please try again.")
		
		} else {
			
			if ($("select#editSubscribeNeighborhood").val() == "") {
				var newSubscribeAnswer = false;
				var new_subscription_neighborhood_id = "nil";
			} else {
				newSubscribeAnswer = true;
				new_subscription_neighborhood_id = $("select#editSubscribeNeighborhood").val();
			};
 
			if (newNameInput.val() == "") {
				var newName = user.name
			} else {
				newName = newNameInput.val()
			};
 
			if (newEmailInput.val() == "") {
				var newEmail = user.email
			} else {
				newEmail = newEmailInput.val()
			};
 
			console.log("clicked save changes" + newName + newEmail + newSubscribeAnswer + new_subscription_neighborhood_id) 
			$.ajax({type: "PUT",
				url: "/users/" + user.id, 
				data: {
				name: newName,
				email: newEmail,
				password: user.password,
				subscribe: newSubscribeAnswer,
				subscription_neighborhood_id: new_subscription_neighborhood_id,
			}}).done(function(data){
				profileView(data)
				})
		}
	})
}
 
 
 
 
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