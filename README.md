# GoogPress
It's like WordPress but on Google.

[View demo](http://googpress.twistedcore.co.uk)


## Features

+ Host a blog using nothing more than Google Docs
+ Runs off a single HTML document. No PHP, JS or dynamic webserver required.

## General How-Tos
*Take a moment to realise how unfinished this project is. Now take a moment to realise how improved it will be in a month or two. Now reconsider your decision to try and get it working by yourself.*

### Drive-Side
1) Create a folder for your site on Google Drive (this will be our "base" folder).

2) Copy the script over into said folder (we'll probably write an installer so sit tight).

3) Create a folder called "Posts" in the base folder.

4) Create some Google Docs in the base folder (these will be your posts). Drag them into "Posts" when they're ready to publish!

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
Init ("https://your-script-url-here");
</script>
```

4) Create some ``` <div> ``` elements and set their ```data-googpress``` attribute to the name of the Google Doc containing your post.
```
<div data-googlepress="your-post-here"></div>
```

5) Deploy and enjoy!

### Heads up
You might want to create a new Google account specifically for this - it'll only take a few seconds and save you a lot of bother.
