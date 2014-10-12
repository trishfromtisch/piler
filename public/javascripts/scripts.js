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



