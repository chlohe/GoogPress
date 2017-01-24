function doPost(e){
 
  var type = e.parameters.type;
  var email = e.parameters.email;
  
  var result = "failed";
  
  if (type != undefined && email != undefined){
    
    if (type == "share"){
      Share(email); 
      result = "sharing success";
    }
    
    if (type == "delete"){
      Delete(email);
      result = "deleting success";
    }
    
  }
  
  return ContentService.createTextOutput(result);
  
}

function Share(email) {
  
  //Share the code with the requestor
  var code = DriveApp.getFilesByName("GoogPress").next().makeCopy("GoogPressDistro");
  code.addEditor(email);
  
  //They have this code for 2 minutes
  Utilities.sleep(12000);
  Delete(email);
    
}

function Delete(email){
  
  Logger.log("Deleting Distro...");
  
  var files = DriveApp.getFilesByName("GoogPressDistro");
  
  //Look for the GoogPressDistro that has the user as an editor
  while (files.hasNext()){
   
    var file = files.next();
    var editors = file.getEditors();

    for (var i = 0; i < editors.length; i++){
      var editor = editors [i];

      if (editor.getEmail() == email){
        //Kill it
        file.removeEditor(email).setTrashed(true);
      }
    }
    
  }
  
}

function Tests(){
 
  //Share("email address");
  //Delete("email address");
  
}
