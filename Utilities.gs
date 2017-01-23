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

function getDocFilesInFolderByDate(folderName) {

  var folder = openFolder(folderName)
  var arryFileDates = [];
  var objFilesByDate = {};
  var result = [];
  
  
  var files = folder.getFilesByType(MimeType.GOOGLE_DOCS);
  var fileDate = "";
  
  while (files.hasNext()) {
    var file = files.next();
    Logger.log('xxxx: file data: ' + file.getLastUpdated());
    Logger.log('xxxx: file name: ' + file.getName());
    Logger.log('xxxx: mime type: ' + file.getMimeType())
    Logger.log(" ");
    
    fileDate = file.getLastUpdated();
    objFilesByDate[fileDate] = file;
    
    arryFileDates.push(file.getLastUpdated());
  }
  arryFileDates.sort(function(a,b){return b-a});
  
  for (var i = 0; i < arryFileDates.length; i++){
    result.push (objFilesByDate[arryFileDates[i]]);
  }
  
    
  return result;
   
}