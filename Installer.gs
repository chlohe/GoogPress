function doGet() {
  return HtmlService.createTemplateFromFile("InstallerUI").evaluate().setTitle("GoogPress Installer").setFaviconUrl("https://googpress.org/images/favicon.ico");
}

function Install(email){
  
   var data = {
     'email' : email,
     'type' : 'share'
   };
  
   var options = {
     'method' : 'post',
     'payload' : data
   };

  var shareResponse = UrlFetchApp.fetch('https://script.google.com/macros/s/AKfycbzpb_GIzkEDmjjuh17hVMQYLiZCpCPHSOAsfsirEYsCWaEz9jT2/exec', options);
  
  if (shareResponse == "sharing success"){
    var creationResult = CreateGoogpress();
    if (creationResult == "success" || creationResult == "success without document"){
      
      var data = {
        'email' : email,
        'type' : 'delete'
      };
      
      var options = {
        'method' : 'post',
        'payload' : data
      };
      

      //Delete the shared folder to stop it clogging up our side
      var deleteResponse =  UrlFetchApp.fetch('https://script.google.com/macros/s/AKfycbzpb_GIzkEDmjjuh17hVMQYLiZCpCPHSOAsfsirEYsCWaEz9jT2/exec', options);
      if (deleteResponse == "deleting success"){
        return (creationResult == "success without document") ? "success without document" : "success";
      }
    }
  }
  return "failure";
  
}

function CreateGoogpress(){
 
  //Wait a few seconds for the request to be made
  Utilities.sleep (1000);
  
  //We give the file a minute to be shared
  for (var i = 0; i < 60; i++){
    
    Utilities.sleep(1000);

    var files = DriveApp.getFilesByName("GoogPressDistro")
    
    if (files.hasNext()){
      //The file has been copied over!
      var file = files.next();
      var name = file.getName();
      
      //Create a directory for GoogPress
      var home = DriveApp.createFolder("GoogPress");
      var posts = home.createFolder("Posts");
      
      home.addFile(file);
     
      //But we aren't the owner so we copy it once more.
      var myFile = file.makeCopy("GoogPress");      
      
      try {
        
        //Create a sample post
        var sample = DocumentApp.create("Hello World");
        var body = sample.getBody();
        body.appendParagraph("HI WORLD! This is a sample post.");
        var id = sample.getId();
        var sampleFile = DriveApp.getFileById(id);
        posts.addFile(sampleFile);
        DriveApp.removeFile(sampleFile);
        
      }
      
      catch (e) {
        
        return "success without document";
        
      }
      
      return "success";
    }
    
  }
  return "failure";
}
