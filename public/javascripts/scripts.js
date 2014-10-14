

window.onload = function(){
//When you click a#file, "File a Report" sidebar apppears
  $('a#file').click(function(){
    $('div.sidebar').children().remove()
    var template = _.template( $("#file_report_template").html() );
    $('div.sidebar').append(template);
  });





  $.get("/neighborhoods", function(neighborhood){
    neighborhoods = _.sortBy(neighborhood, function(neighborhoodObject) {return neighborhoodObject.name})
    var innards = "<h2>Choose your neighborhood</h2><select name ='neighborhood' class='neighborhood'>"
    var div = document.createElement('div');
    $(div).attr('id', 'option');
    for (var i = 0; i < neighborhoods.length; i ++){
      innards += "<option value="+ neighborhoods[i].id+">" + neighborhoods[i].name + "</option>"
      }
    innards += "</select>"+"<button class='btn btn-primary btn-sm' id='enter'>ENTER</button>"
    $(div).html(innards);
    $('div#piler').append(div);
    $("#enter").click(function(event){
      neighborhood_id = $("[name='neighborhood']").val()

      resetMap($("select option[value=" + neighborhood_id + "]").text())

     RSS(neighborhood_id)
     
   })

  })


function RSS(neighborhood_id){
   $.get("neighborhoods/"+ neighborhood_id + "/reports", function(report){
     reports = _.sortBy(report, function(reportObject) {return reportObject.created_at}).reverse()
       if (reports.length == 0){
         alert("No reports for that area")
       } else {
         var innards = ""
         for (var i = 0; i < reports.length && i < 10; i++){
           innards += "<li>" + reports[i].created_at+"  <img src='"+reports[i].picture+"' width='50' height ='50'></li><button class='btn btn-primary btn-lg' data-toggle='modal' data-target='#"+reports[i].id+"'>MORE INFORMATION</button>"    
           innards += "<div class='modal fade' id='"+reports[i].id+"' tabindex='-1' role='dialog' aria-labelledby='myModalLabel' aria-hidden='true'><div class='modal-dialog'><div class='modal-content'><div class='modal-header'><button type='button' class='close' data-dismiss='modal'><span aria-hidden='true'>&times;</span><span class='sr-only'>Close</span></button><h4 class='modal-title' id='myModalLabel'>"+reports[i].description+"<br>VOTES "+ reports[i].votes+" </h4></div><div class='modal-body comment"+reports[i].id+"'>"
             innards += "</div><div class='modal-footer'><button type='button' class='btn btn-primary comment'>Add Comment</button><button type='button' class='btn btn-primary up'>UP VOTE</button><button type='button' class='btn btn-primary down'>DOWN VOTE</button><button type='button' class='btn btn-default close' data-dismiss='modal'>Close</button></div></div></div></div>"
             $(".sidebar").html(innards)
            upVoting(reports[i].votes,reports[i].id)
            downVoting(reports[i].votes, reports[i].id)
            comment(reports[i])
             
             closeButton()
 
           $.get("/reports/"+reports[i].id+"/comments", function(comments){
            
             for (var i = 0; i < comments.length; i ++){
              $(".comment"+comments[i].report_id).append("<p>"+comments[i].content+"</p>")

             }
            
           
           })


            
 
          


        $("li").mouseover(makeMarkerDoSomething)
        

        }
    
      }
  })
}



function upVoting(votes, id){

  $(".up").click(function(event){
    console.log(id)
    newVotes = votes + 1
    $.ajax({
      url:"/reports/"+id,
      type: 'PUT',
      data: {votes: newVotes},
      success: function(result){
        alert("Thanks for your Vote") 
        $(".close").click()
        window.location.reload()
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
        $(".close").click()
        window.location.reload()
      }
    })
  })
}



function comment(report){
  $(".comment").click(function(event){
    $(".modal-body").html("<textarea name='comment' rows = 5 cols= 10 placeholder='Comment'></textarea><br><input name='email' placeholder='email' id='email'><input name='password' placeholder='password'><br><button class='commentEnter'>ENTER</button>")
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
            $(".close").click()
            window.location.reload()
            }
          })
          break;

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
  
  var markers = []
  function makeMarker(report) {
    var position = report.location
    position = position.split("#").join("apt ")
    $.get(geocodeAPI + formatAddressForRequest(position), function(){
      var coords = arguments[0].results[0].geometry.location
      var point = new google.maps.LatLng(coords.lat, coords.lng)
      var marker = new google.maps.Marker({position: point, title: report.location, id: report.id})
      marker.id = report.id
      marker.setMap(mainMap)
      markers.push(marker)
      marker.addListener("mouseover", blinkReportInSidebar)
    })
  }

  function blinkReportInSidebar(feed){
    var listItem = $("div#" + this.id + ".modal")
    if (listItem.length != 0) {
      listItem.siblings("li").addClass("red")
      window.setTimeout(function(){listItem.siblings("li").removeClass("red")}, 300)
    }
  }


function closeButton(){
   $(".close").click(function(event){

    window.location.reload()
   
   })

}


  function makeMarkerDoSomething() {
    var id = $(this).siblings(".modal").attr("id")
    _.each(markers, function(marker) {
      if (marker.id == id) {
        marker.setAnimation(google.maps.Animation.BOUNCE)
        window.setTimeout(function(){marker.setAnimation(null)}, 720)
      }
    })
  }


  populateMapMarkers()

  function resetMap(name) {
    $.get(geocodeAPI + formatAddressForRequest(name) + ",+nyc", function(){
      var coords = arguments[0].results[0].geometry.location
      mainMap.setCenter({lat: coords.lat, lng: coords.lng})
      mainMap.setZoom(15)
    })
  }





}
