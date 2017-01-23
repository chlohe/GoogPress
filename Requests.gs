// Handling people that come snooping
function doGet() {
  return HtmlService.createHtmlOutputFromFile('Index');
}

//This is how we'll interface with the outside world
function doPost(e) {
  
  var requestType = e.parameters.type; 
  var id = e.parameters.id;
  var asHtml = e.parameters.asHtml;
  var start = e.parameters.start;
  var end = e.parameters.end;
  
  var result = "";
  
  if (requestType == undefined){
   return ContentService.createTextOutput("Failed to specify request type"); 
  }
  
  //What do we want?
  if (requestType.toString().tidy() == "page"){
    
    //Do we have what we need to go through with this request?
    if (id != undefined && asHtml != undefined){

      id = decodeURIComponent(id);
      
      var doc = openDoc(id.toString(), "Posts");
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
         result = openDoc(doc, "Posts").getBody().getText(); 
      }
      
    }
    else
    {
     result = "Missing id/asHtml parameters"; 
    }
    
  }
  else if (requestType.toString().tidy() == "post"){
    
    if (asHtml != undefined){
      
      var files = getDocFilesInFolderByDate("Posts");
      
      if (start != undefined && end != undefined)
      {
        //Posts start at 1 (NOT 0)
        start -= 1;
        end -= 1;
        
        if (end > files.length){
         return "Out of bounds"; 
        }
        
        //Return the stuff of interest
        files = files.slice(start, (end - start + 1));
      }

      var docContent = []; //Where our posts are stored
      
      //Get the posts
      if (asHtml.toString().tidy() == "true"){
        for (var i = 0; i < files.length; i++){        
          docContent.push(DocToHtml(DocumentApp.openById(files[i].getId()))); 
        }
      }
      else
      {
        for (var i = 0; i < files.length; i++){        
          docContent.push(DocumentApp.openById(files[i].getId()).getBody().getText()); 
        }
      }
      
      result = JSON.stringify(docContent);
      
    }
    
  }
  
  return ContentService.createTextOutput(result);
  
}
