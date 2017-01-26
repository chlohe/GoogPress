function DocToHtml(doc, type) {
  var body = doc.getBody();
  var numChildren = body.getNumChildren();
  var output = [];
  var images = [];
  var listCounters = {};

  // Walk through all the child elements of the body.
  for (var i = 0; i < numChildren; i++) {
    var child = body.getChild(i);
    output.push(processItem(child, listCounters, images));
  }

  var html = output.join('\r');
  //emailHtml(html, images);
  if (type != undefined){
    createDocumentForHtml(doc.getName(), html, images, type);
  }
  return html;
}

function createDocumentForHtml(name, html, images, type) {
  var newDoc = DocumentApp.create(name);
  newDoc.getBody().setText(html);
  //for(var j=0; j < images.length; j++)
    //newDoc.getBody().appendImage(images[j].blob);
  newDoc.saveAndClose();
  var folder = openFolder (type + "Cache");
  var docFile = DriveApp.getFileById(newDoc.getId());
  folder.addFile (docFile);
  DriveApp.removeFile(docFile);
}

function dumpAttributes(atts) {
  // Log the paragraph attributes.
  for (var att in atts) {
    Logger.log(att + ":" + atts[att]);
  }
}

function processItem(item, listCounters, images) {
  var output = [];
  var prefix = "", suffix = "";

  if (item.getType() == DocumentApp.ElementType.PARAGRAPH) {
    switch (item.getHeading()) {
        // Add a # for each heading level. No break, so we accumulate the right number.
      case DocumentApp.ParagraphHeading.HEADING6: 
        prefix = "<h6>", suffix = "</h6>"; break;
      case DocumentApp.ParagraphHeading.HEADING5: 
        prefix = "<h5>", suffix = "</h5>"; break;
      case DocumentApp.ParagraphHeading.HEADING4:
        prefix = "<h4>", suffix = "</h4>"; break;
      case DocumentApp.ParagraphHeading.HEADING3:
        prefix = "<h3>", suffix = "</h3>"; break;
      case DocumentApp.ParagraphHeading.HEADING2:
        prefix = "<h2>", suffix = "</h2>"; break;
      case DocumentApp.ParagraphHeading.HEADING1:
        prefix = "<h1>", suffix = "</h1>"; break;
      default: 
        prefix = "<p>", suffix = "</p>";
    }
    
    var positionedImages = item.getPositionedImages();
    if (positionedImages.length != 0){ 
      Logger.log ("POSITIONED IMAGES: " + positionedImages[0].getTopOffset() + " LEFT: " + positionedImages[0].getLeftOffset() + " TYPE: " + positionedImages[0].getLayout());     
      //TODO: Find out if lines down = getTopOffset / fontsize
    }
    
    if (item.getNumChildren() == 0)
      return "";
  }
  else if (item.getType() == DocumentApp.ElementType.INLINE_IMAGE)
  {
    processImage(item, images, output);
  }
  else if (item.getType()===DocumentApp.ElementType.TABLE){
    prefix = "<table class=\"alt uniform fixed\">", suffix = "</table>"; 
  }
  else if (item.getType()===DocumentApp.ElementType.TABLE_ROW){
    prefix = "<tr>", suffix = "</tr>"; 
  }
  else if (item.getType()===DocumentApp.ElementType.TABLE_CELL){
    prefix = "<td>", suffix = "</td>"; 
  }
  else if (item.getType()===DocumentApp.ElementType.LIST_ITEM) {
    var listItem = item;
    var gt = listItem.getGlyphType();
    var key = listItem.getListId() + '.' + listItem.getNestingLevel();
    var counter = listCounters[key] || 0;

    // First list item
    if ( counter == 0 ) {
      // Bullet list (<ul>):
      if (gt === DocumentApp.GlyphType.BULLET
          || gt === DocumentApp.GlyphType.HOLLOW_BULLET
          || gt === DocumentApp.GlyphType.SQUARE_BULLET) {
        prefix = '<ul class="small"><li>', suffix = "</li>";

          suffix += "</ul>";
        }
      else {
        // Ordered list (<ol>):
        prefix = "<ol><li>", suffix = "</li>";
      }
    }
    else {
      prefix = "<li>";
      suffix = "</li>";
    }

    if (item.isAtDocumentEnd() || item.getNextSibling().getType() != DocumentApp.ElementType.LIST_ITEM) {
      if (gt === DocumentApp.GlyphType.BULLET
          || gt === DocumentApp.GlyphType.HOLLOW_BULLET
          || gt === DocumentApp.GlyphType.SQUARE_BULLET) {
        suffix += "</ul>";
      }
      else {
        // Ordered list (<ol>):
        suffix += "</ol>";
      }

    }

    counter++;
    listCounters[key] = counter;
  }

  output.push(prefix);

  if (item.getType() == DocumentApp.ElementType.TEXT) {
    processText(item, output);
  }
  else {


    if (item.getNumChildren) {
      var numChildren = item.getNumChildren();

      // Walk through all the child elements of the doc.
      for (var i = 0; i < numChildren; i++) {
        var child = item.getChild(i);
        output.push(processItem(child, listCounters, images));
      }
    }

  }

  output.push(suffix);
  return output.join('');
}


function processText(item, output) {
  var text = item.getText();
  var indices = item.getTextAttributeIndices();

  
  if (indices.length <= 1) {
    // Assuming that a whole para fully italic that starts with a quotation mark is a quotation
    if(item.isBold()) {
      output.push('<b>' + text + '</b>');
    }
    else if(item.isItalic()) {
      if (text.trim().charAt(0) == '“' || text.trim().charAt(0) == '"'){ //Accomodate for all the speech marks
        //It's a quotation
        output.push('<blockquote>' + text + '</blockquote>');
      }
      else
      {
        output.push('<i>' + text + '</i>');
      }
    }
    else if(item.isUnderline()) {
      output.push('<u>' + text + '</u>')
    }
    else if (text.trim().indexOf('http://') == 0) {
      output.push('<a href="' + text + '" rel="nofollow">' + text + '</a>');
    }
    else {
      output.push(text);
    }
  }
  else {

    for (var i=0; i < indices.length; i ++) {
      var partAtts = item.getAttributes(indices[i]);
      var startPos = indices[i];
      var endPos = i+1 < indices.length ? indices[i+1]: text.length;
      var partText = text.substring(startPos, endPos);
      
      if (partAtts.FOREGROUND_COLOR) {
        output.push('<font color="' + partAtts.FOREGROUND_COLOR + '">');
      }

      if (partAtts.ITALIC) {
        output.push('<i>');
      }
      if (partAtts.BOLD) {
        output.push('<b>');
      }
      if (partAtts.UNDERLINE) {
        output.push('<u>');
      }


      // If someone has written [xxx] and made this whole text some special font, like superscript
      // then treat it as a reference and make it superscript.
      // Unfortunately in Google Docs, there's no way to detect superscript
      if (partText.indexOf('[')==0 && partText[partText.length-1] == ']') {
        output.push('<sup>' + partText + '</sup>');
      }
      else if (partText.trim().indexOf('http://') == 0) {
        output.push('<a href="' + partText + '" rel="nofollow">' + partText + '</a>');
      }
      else if (partAtts.LINK_URL){
        Logger.log ('"' + partText + '" links to ' + partAtts.LINK_URL);        
        output.push('<a href="' + partAtts.LINK_URL + '">' + partText + "</a>");
      }
      else {
        output.push(partText);
      }
      
      // Begin closing tags (preserve order from above
      if (partAtts.FOREGROUND_COLOR) {
        output.push('</font>');
      }

      if (partAtts.ITALIC) {
        output.push('</i>');
      }
      if (partAtts.BOLD) {
        output.push('</b>');
      }
      if (partAtts.UNDERLINE) {
        output.push('</u>');
      }

    }
    
  }

}


function processImage(item, images, output)
{
  images = images || [];
  var blob = item.getBlob();
  var contentType = blob.getContentType();
  var extension = "";
  if (/\/png$/.test(contentType)) {
    extension = ".png";
  } else if (/\/gif$/.test(contentType)) {
    extension = ".gif";
  } else if (/\/jpe?g$/.test(contentType)) {
    extension = ".jpg";
  } else {
    throw "Unsupported image type: "+contentType;
  }
  var imagePrefix = "Image_";
  var imageCounter = images.length;
  var name = imagePrefix + imageCounter + extension;
  imageCounter++;
  
  Logger.log(item.getAttributes());
  
  //output.push('<img src="cid:'+name+'" />');
  /*images.push( {
  "blob": blob,
  "type": contentType,
  "name": name});*/
  var base64 = Utilities.base64Encode(blob.getBytes());
  output.push('<img src="data:image/'+extension.substring(1)+';base64,'+base64+'" style="width:'+ item.getWidth() +'px;height:' + item.getHeight() + 'px;"/>');

}
