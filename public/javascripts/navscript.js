//this function puts the New User form into the side bar
function newUserView (){
	var $sidebar = $("div.sidebar")
	$sidebar.empty()
	var newUserHtml = "<h4>New User</h4> <form role='form'> <div class='form-group'> <label for='name'>User Name</label> <input type='text' id='name' placeholder='e.g. PooperScooper123'> </div>"
	newUserHtml += "<div class='form-group'> <label for='email'>Email Address</label> <input type='email' class='form-control' id='email' placeholder='e.g. dogluvr@piler.com'> </div>"
	newUserHtml += "<div class='form-group'> <label for='password'>Password</label> <input type='password' class='form-control' id='password' placeholder='Password'> </div>" 
	newUserHtml += "<div class='form-group'> <label for='picture'>Picture</label> <input type='text' id='picture' placeholder='e.g. imgur.com/1234'> </div>"
	newUserHtml += "<div class='form-group'> <label for='subscribeNeighborhood'>Subscribe to a Neighborhood </label> <select id='subscribeNeighborhood'> <option value=''>-</option> </select> </div> </form>"
	newUserHtml += "<button type='submit' id='addUser' class='btn btn-default'>Submit</button>"
	$sidebar.append(newUserHtml);
	$.get("/neighborhoods", function(neighborhoods){
		$neighborhood = $("select#subscribeNeighborhood");
		neighborhoods = _.sortBy(neighborhoods, function(neighborhoodObject) {return neighborhoodObject.name})
		_.each(neighborhoods, function(neighborhoodInfo){
			$neighborhood.append("<option value='" + neighborhoodInfo["id"] + "'>" + neighborhoodInfo["name"] + "</option>")});
	});
	addNewUserButtonListener()
	}

name varchar(255),
email varchar(255),
subscribe boolean,
subscription_neighborhood_id integer,
picture text,
password varchar(15)
);

//This function adds an event listener onto the submit new user function, which sends out an AJAX 
function addNewUserButtonListener(){
	$("button#addUser").click(function(){
		var nameInput = $("input#name")
		var emailInput = $("input#email")
		var passwordInput = $("input#password")
		var pictureInput = $("input#picture")
		var subscribeNeighborhoodInput = $("select#subscribeNeighborhood")
		var name = nameInput.val()
		var email = emailInput.val()
		var password = passwordInput.val()
		var picture = pictureInput.val()

		if (subscribeNeighborhoodInput.val() == "") {
			var subscribeAnswer = false;
			var subscription_neighborhood_id = nil;
		} else {
			subscribeAnswer = true;
			subscription_neighborhood_id = subscribeNeighborhoodInput.val();
		}

		$.post("/users", {name: name, })
	})
}

$(function(){

	$(a#add).click(function(){
		newUserView();
	})



})