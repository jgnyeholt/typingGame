<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Typing Game</title>
    <link rel="stylesheet" href="normalize.css">
    <link href="https://fonts.googleapis.com/css?family=Raleway&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="site.css">
  </head>
  <body>
    <div id="container">
      <div id="full-circle" class="shape full large circle"></div>
      <div id="full-circle2" class="shape full large circle"></div>
      <header>
        <h1>Typing Challenge</h1>
        <nav>
          <ul class="game-type">
            <li><a id="words" class="game-option selected" href="#">Words</a></li>
            <li><a id="phrases" class="game-option" href="#">Phrases</a></li>
          </ul>
        </nav>
      </header>
      <main>
        <div class="stats">
          <h3 class="completed-display">Words: <span id="completed" data-complete="0">0</span></h3>
          <h3 class="wpm-display" title="Words per minute">WPM: <span id="WPM"></span></h3>
          <h3 class="time-display">Time: <span id="min">00</span>:<span id="sec">00</span>.<span id="milli">00</span></h3>
        </div>
        <h2 id="word-container"></h2>
        <div>
          <input id="typing-container" disabled/>
        </div>
        <div>
          <button id="play-button" value="start">Start</button>
        </div>
      </main>

    </div>

    <script src="words.js"></script>
    <script src="phrases.js"></script>
    <script src="site.js"></script>
  </body>
</html>
