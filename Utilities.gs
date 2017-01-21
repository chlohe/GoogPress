function openSheet(sheetName) {
  
  var file, files = DriveApp.getFilesByName(sheetName); 
  
  if (files.hasNext ()){
    file = files.next(); 
  } else {
    return "Not Found";
  }
  
  return SpreadsheetApp.openById(file.getId());
  
}

function openDoc(sheetName) {
  
  var file, files = DriveApp.getFilesByName(sheetName); 
  
  if (files.hasNext ()){
    file = files.next(); 
  } else {
    return "Not Found";
  }
  
  return DocumentApp.openById(file.getId());
  
}

function clearLogs (){

  Logger.clear();
  
}