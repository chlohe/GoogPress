function openSheet(sheetName, containerFolder) {
  
  var file, files = (containerFolder == undefined) ? DriveApp.getFilesByName(sheetName) : openFolder(containerFolder).getFilesByName(sheetName); 
  
  if (files.hasNext ()){
    file = files.next(); 
  } else {
    return "Not Found";
  }
  
  return SpreadsheetApp.openById(file.getId());
  
}

function openDoc(docName, containerFolder) { //Find docName in containerFolder. 
  
  var file, files = (containerFolder == undefined) ? DriveApp.getFilesByName(docName) : openFolder(containerFolder).getFilesByName(docName); 
  
  if (files.hasNext ()){
    file = files.next(); 
  } else {
    return "Not Found";
  }
  
  return DocumentApp.openById(file.getId());
  
}

function openFolder (fileName){

  var folder, folders = DriveApp.getFoldersByName(fileName);
 
  if (folders.hasNext()) {
    folder = folders.next();
  } else {
    //If it doesn't exist then make it
    folder = DriveApp.createFolder(fileName);
  } 
  
  return folder;
  
}

function clearLogs (){

  Logger.clear();
  
}

