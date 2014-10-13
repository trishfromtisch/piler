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
    // var form = document.createElement('form'); 
    // var input = document.createElement('input');
    // var h3 = document.createElement('h3');
    // var button = document.createElement('button');
    // $(form).attr('action', 'users/:id');
    // $(form).attr('method', 'GET')
    // $(h3).text('Put Username');
    // $(button).text('Edit');
    // $(input).attr('name', 'name');
    // $(input).attr('type', 'text');
    // $(form).append(h3);
    // $(form).append(input);
    // $(form).append(button);
    // $('div.sidebar').append(form);
    // $('button').click(function(e){
    //  $.ajax({url:"/users/", success: function(e){
    //    debugger
    //  }});
    // });
    var template = _.template( $("#user_profile_template").html() );
    $('div.sidebar').append(template);
  })

whichNeighborhood()

function whichNeighborhood(){
  //this is where they pick the neighborhood
  $.get("/neighborhoods", function(neighborhood){
    neighborhoods = _.sortBy(neighborhood, function(neighborhoodObject) 
    {return neighborhoodObject.name})
    var innards = "<select name ='neighborhood' class='neighborhood'>"

    for (var i = 0; i < neighborhoods.length; i ++){
      innards += "<option value="+ neighborhoods[i].id+">" + neighborhoods[i].name + "</option>"
    }

    innards += "</select>"+"<button id='enter'>ENTER</button>"
    $(".sidebar").html(innards)
    $("#enter").click(function(event){
      neighborhood_id = $("[name='neighborhood']").val()
      resetMap($("select option[value=" + neighborhood_id + "]").text())
     RSS(neighborhood_id)
     
   })
  })
}



function RSS(neighborhood_id){
  $.get("neighborhoods/"+ neighborhood_id + "/reports", function(report){
    reports = _.sortBy(report, function(reportObject) {return reportObject.created_at}).reverse()
      if (reports.length == 0){
        alert("No reports for that area")
      } else {
        var innards = ""
        for (var i = 0; i < reports.length && i < 10; i++){
          innards += "<li>" + reports[i].created_at+"  <img src='"+reports[i].picture+"' width='50' height ='50'></li><button class='btn btn-primary btn-lg' data-toggle='modal' data-target='#"+reports[i].id+"'>MORE INFORMATION</button>"    
           innards += "<div class='modal fade' id='"+reports[i].id+"' tabindex='-1' role='dialog' aria-labelledby='myModalLabel' aria-hidden='true'><div class='modal-dialog'><div class='modal-content'><div class='modal-header'><button type='button' class='close' data-dismiss='modal'><span aria-hidden='true'>&times;</span><span class='sr-only'>Close</span></button><h4 class='modal-title' id='myModalLabel'>"+reports[i].description+"<br>VOTES "+ reports[i].votes+" </h4></div><div class='modal-body'>"
            innards += "</div><div class='modal-footer'><button type='button' class='btn btn-primary comment'>Add Comment</button><button type='button' class='btn btn-primary up'>UP VOTE</button><button type='button' class='btn btn-primary down'>DOWN VOTE</button><button type='button' class='btn btn-default close' data-dismiss='modal'>Close</button></div></div></div></div>"
            $(".sidebar").html(innards)

          $.get("/reports/"+reports[i].id+"/comments", function(comments){
            $(".modal-body").append("<h4>COMMENTS</h4>")
            for (var i = 0; i < comments.length; i ++){
              $(".modal-body").append("<p>"+comments[i].content+"</p>")
            }
          
          })
         upVoting(reports[i].votes,reports[i].id)
         downVoting(reports[i].votes, reports[i].id)
         comment(reports[i])
        }
     
      }
  })
}


function upVoting(votes, id){
  $(".up").click(function(event){
    newVotes = votes + 1
    $.ajax({
      url:"/reports/"+id,
      type: 'PUT',
      data: {votes: newVotes},
      success: function(result){
        alert("Thanks for your Vote") 
      }
    })
  })
}


function downVoting(votes, id){
  $(".down").click(function(event){
    newVotes = votes - 1
    $.ajax({
      url:"/reports/"+id,
      type: 'PUT',
      data: {votes: newVotes},
      success: function(result){
        alert("Thanks for your Vote")
      }
    })
  })
}



function comment(report){
  $(".comment").click(function(event){
    $(".modal-body").html("<textarea name='comment' rows = 5 cols= 10 placeholder='Comment'></textarea><br><input name='email' placeholder='email'><input name='password' placeholder='password'><br><button class='commentEnter'>ENTER</button>")
    $(".commentEnter").click(function(event){
    email = $("[name='email']").val().toLowerCase()
    password = $("[name='password']").val().toLowerCase()
    $.get("/users", function(users){
      for (var i = 0; i < users.length; i ++){
          if (users[i].email.toLowerCase() == email && users[i].password.toLowerCase() == password){
         comment = $("[name='comment']").val()
          $.ajax({
            url:"/comments",
            type: 'POST',
            data:{report_id: report.id, content: comment, user_id: users[i].id},
            success: function(result){
            alert("Comment was Successful")
            }
          })

        } else if ( i == users.length - 1 && users[i].email.toLowerCase() != email && users[i].password.toLowerCase() != password) {
          alert("Wrong password and user combination")
          $("[name='email']").val("")
          $("[name='password']").val("")
        }
      }
    })
  })
  })
}
    

  var geocodeAPI = "https://maps.googleapis.com/maps/api/geocode/json?address="
  function formatAddressForRequest(address) {
    return address.split(" ").join("+")
  }
  var mapInitialOptions = {
    center: {lat: 40.7127837, lng: -74.0059413},
    zoom: 13
  }
  var mainMap = new google.maps.Map(document.querySelector("div.map"), mapInitialOptions)
  function populateMapMarkers() {
    $.get("/reports", function() {
      var list = arguments[0]
      _.each(list, makeMarker)
    })
  }
  
  
  function makeMarker(report) {
    var thing = []
    $.get(geocodeAPI + formatAddressForRequest(report.location), function(){
      var coords = arguments[0].results[0].geometry.location
      var point = new google.maps.LatLng(coords.lat, coords.lng)
      var marker = new google.maps.Marker({position: point})
      marker.id = report.id
      marker.setMap(mainMap)
    })
  }


  populateMapMarkers()

  function resetMap(name) {
    $.get(geocodeAPI + formatAddressForRequest(name), function(){
      var coords = arguments[0].results[0].geometry.location
      mainMap.setCenter({lat: coords.lat, lng: coords.lng})
      mainMap.setZoom(15)
    })
  }



}
