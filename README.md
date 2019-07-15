# GoogPress
It's like WordPress but on Google.

[View demo](http://googpress.org) | [Installer](https://script.google.com/macros/s/AKfycbzMTWqlvd5L7GK5mYvi0m0w9G1nZrluarAehNfHlc021HyxoaVu/exec) | [GoogPress.js CDN](https://cdn.googpress.org/0.1/GoogPress.min.js)

## Our Story

Once upon a time there were two "developers", Peter and Stewart. They had just taken over the production team for the [Young Scientists' Journal](https://ysjournal.com/) and were tasked with "making the website great [work] again". After a survey of the site's contributors, it turned out that people don't like hardly-working XML-based editors (Wordpress Annotum). Thus, with the team being so broke that they couldn't really afford anything that costed money, GoogPresss was born. 

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

```html
<script
  src="https://code.jquery.com/jquery-3.1.1.min.js"
  integrity="sha256-hVVnYaiADRTO2PzUGmuLJr8BLUSjGIZsDYGmIJLv2b8="
  crossorigin="anonymous"></script>
```

3) Reference GoogPress.js
```html
<script type="text/javascript" src="https://cdn.googpress.org/0.1/GoogPress.min.js"> </script>
```

4) Initalise GoogPress with your Apps Script URL
```html
<script>
  gp_Init ("https://your-script-url-here");
</script>
```

5) Create some ``` <div> ``` elements and set their ```data-googpress``` attribute to the name of the Google Doc containing your post.
```html
<div data-googlepress="your-post-here"></div>
```

6) Deploy and enjoy!

### Frequently Asked Questions
What's my Apps Script URL?

*You can get your Apps Script URL by opening your Google Drive and navigating to the GoogPress folder. There you should find a file called 'GoogPress'.*

![Like this](http://i.imgur.com/VcukwPm.png)

*Open it up (if it prompts you to use a third party application, pick 'Google Apps Script') and on the menu navigate to Publish > Deploy as Web App*

![Like this](http://i.imgur.com/JKWl4YR.png)

*Publish your app making sure that it's accessible to everyone, even anonymous*

![Like this](http://i.imgur.com/p690VE7.png)

*Copy the URL it gives you. It should look something like 'https://script.google.com/macros/s/xxxxxxxxxxxxxx'*

![Like this](http://i.imgur.com/IfTA41m.png)



## In Depth

Here are the things you can do with GoogPress.js:

### Initialisation:

This will initialise GoogPress and fill any divs with a ```data-googpress``` attribute with content.

```function gp_Init(url)```

```url``` The URL of the the web app.

##### Example:
```html
<div data-googpress="post1"></div>
<hr/>
<div data-googpress="post2"></div>
<hr/>

<script>
    gp_Init ("https://your-script-url-here");
</script>
```
##### Results in something like:
```html
<div data-googpress="post1">
    Content of post1
</div>
<hr/>
<div data-googpress="post2"></div>
    Content of post2
<hr/>
```

### Loading Individual Posts:

```function gp_loadPost (name, container)```

```name``` The name of the post you want to retrieve. This should be the name of it's Google Doc.

```container``` The div containing all the posts

##### Example:
```javascript
//Load the post 'Hi World'
gp_loadPost ("Hi World", $("#post"));
```
##### Results in something like:
```html
<div id="post">
  Content of 'Hi World'
</div>
```


### Loading Multiple Posts:

```function gp_loadPosts(container, postDivClass, terminator, startIndex, endIndex)```

```container``` The div containing all the posts

```postDivClass``` Any classes that need to be added to the posts

```terminator``` Any code you want between posts (eg. ```<hr/>```)

Optional:

```startIndex``` Where the posts start. 1 = latest post, 2 = second latest post... 

```endIndex``` Where the posts end.

##### Example:
```javascript
//Load the 3 most recent posts
gp_loadPosts($("#post-container"),"postClass", "<hr/>", 1, 3);
```
##### Results in something like:
```html
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


## Contribute
Yeah just send us a pull-request.
