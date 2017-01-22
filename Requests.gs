//This is how we'll interface with the outside world
  
function doPost(e) {
  
  var requestType = e.parameters.type; 
  var id = e.parameters.id;
  var asHtml = e.parameters.asHtml;
  
  var result = "";
  
  if (requestType == undefined){
   return ContentService.createTextOutput("Failed to specify request type"); 
  }
  
  //What do we want?
  if (requestType.toString().tidy() == "page"){
    
    //Do we have what we need to go through with this request?
    if (id != undefined && asHtml != undefined){

      id = decodeURIComponent(id);
      
      var doc = openDoc(id.toString());
      Logger.log(doc);
      if (doc == "Not Found"){
        return ContentService.createTextOutput("Resource Not Found. Remember: this stuff is case sensitive!"); 
      }
      
      //Plaintext or HTML?
      if (asHtml.toString().tidy() == "true"){
        //Convert to HTML
        result = DocToHtml(doc);
      }
      else
      {
        //Return plaintext
         result = openDoc(doc).getBody().getText(); 
      }
      
    }
    else
    {
     result = "Missing id/asHtml parameters"; 
    }
    
  }
  
  return ContentService.createTextOutput(result);
  
}
