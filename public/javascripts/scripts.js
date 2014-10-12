function whichNeighborhood(){
  //this is where they pick the neighborhood
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
  //getting the RSS feed
  $("#enter").click(function(event){
    neighborhood_id = $("[name='neighborhood']").val()
    $.get("neighborhoods/"+ neighborhood_id + "/reports", function(reports){

      var innards = ""
      for (var i = 0; i < reports.length; i++){
        innards += "<li>" + reports[i].created_at+"</li><button class='btn btn-primary btn-lg' data-toggle='modal' data-target='#"+reports[i].id+"'>MORE INFORMATION</button>"    
        innards += "<div class='modal fade' id='"+reports[i].id+"' tabindex='-1' role='dialog' aria-labelledby='myModalLabel' aria-hidden='true'><div class='modal-dialog'><div class='modal-content'><div class='modal-header'><button type='button' class='close' data-dismiss='modal'><span aria-hidden='true'>&times;</span><span class='sr-only'>Close</span></button><h4 class='modal-title' id='myModalLabel'>Modal title</h4></div><div class='modal-body'>"
        innards += "</div><div class='modal-footer'><button type='button' class='btn btn-default' data-dismiss='modal'>Close</button><button type='button' class='btn btn-primary'>Save changes</button></div></div></div></div>"
        
   

       $(".sidebar").html(innards)

         $.get("/reports/"+reports[i].id+"/comments", function(comments){
        for (var i = 0; i < comments.length; i ++){

            $(".modal-body").append("<p>"+comments[i].content+"</p>")
          }
          
        })
       }
          })

})


}


