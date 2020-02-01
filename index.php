<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title>Typing Game</title>
    <link href="https://fonts.googleapis.com/css?family=Raleway&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="site.css">
  </head>
  <body>
    <main>
      <div>
        <h3>Completed: <span id="completed" data-complete="0">0</span></h3>
      </div>
      <h2 id="word-container"></h2>
      <div>
        <input id="typing-container" disabled/>
      </div>
      <div>
        <button id="play-button" value="start">Start</button>
      </div>
    </main>
    <script src="words.js"></script>
    <script src="site.js"></script>
  </body>
</html>
