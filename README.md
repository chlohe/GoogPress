# GoogPress
It's like WordPress but on Google.

[View demo](http://googpress.twistedcore.co.uk)


## Features

+ Host a blog using nothing more than Google Docs
+ Runs off a single HTML document. No PHP, JS or dynamic webserver required.

## General How-Tos
*Take a moment to realise how unfinished this project is. Now take a moment to realise how improved it will be in a month or two. Now reconsider your decision to try and get it working by yourself.*

### Drive-Side
1) Using the [official installer](https://script.google.com/a/macros/tiffin.kingston.sch.uk/s/AKfycbzMTWqlvd5L7GK5mYvi0m0w9G1nZrluarAehNfHlc021HyxoaVu/exec), install GoogPress onto your Google Drive (takes approx. 2 minutes tops).

2) Once the installation is complete, follow the 'next steps' instructions on screen and then navigate back to Google Drive.

3) There you should find a newly-created folder called 'GoogPress' and within it another folder called 'Posts'.

4) Drag Google Docs into the aforementioned 'Posts' folder to publish them. 

![Like this](http://i.imgur.com/DjSJATa.png)

### Client-Side
1) Make some HTML.

2) Reference the GoogPress.js
```
<script type="text/javascript" src="GoogPress.js"> </script>
```

3) Initalise GoogPress with your Apps Script URL (again, we'll probably make an installer)
```
<script>
gp_Init ("https://your-script-url-here");
</script>
```

4) Create some ``` <div> ``` elements and set their ```data-googpress``` attribute to the name of the Google Doc containing your post.
```
<div data-googlepress="your-post-here"></div>
```

5) Deploy and enjoy!

