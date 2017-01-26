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

2) Reference JQuery

```
<script
  src="https://code.jquery.com/jquery-3.1.1.min.js"
  integrity="sha256-hVVnYaiADRTO2PzUGmuLJr8BLUSjGIZsDYGmIJLv2b8="
  crossorigin="anonymous"></script>
```

3) Reference GoogPress.js
```
<script type="text/javascript" src="GoogPress.js"> </script>
```

4) Initalise GoogPress with your Apps Script URL
```
<script>
gp_Init ("https://your-script-url-here");
</script>
```

5) Create some ``` <div> ``` elements and set their ```data-googpress``` attribute to the name of the Google Doc containing your post.
```
<div data-googlepress="your-post-here"></div>
```

6) Deploy and enjoy!

## In Depth

Here are the things you can do with GoogPress.js:

### Loading Individual Posts:


### Loading Multiple Posts:

```function gp_loadPosts(container, postDivClass, terminator, startIndex, endIndex)```

```container``` The div containing all the posts

```postDivClass``` Any classes that need to be added to the posts

```terminator``` Any code you want between posts (eg. ```<hr/>```)

** Optional: **

```startIndex``` Where the posts start. 1 = latest post, 2 = second latest post... 

```endIndex``` Where the posts end.

##### Example:
``` 
//Load the 3 most recent posts
gp_loadPosts($("#post-container"),"postClass", "<hr/>", 1, 3);
```
##### Results in something like:
``` 
<div id="post-container">
    <div class="postClass">
        I am the latest post
    </div>
    <hr/>
    <div class="postClass">
        I am not the latest post
    </div>
    <hr/>
    <div class="postClass">
        I am also not the latest post
    </div>
    <hr/>
</div>
```


