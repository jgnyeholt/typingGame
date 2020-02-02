document.addEventListener("DOMContentLoaded", () =>{
  init();
});

let wordArray = words.slice(0, words.length);
let gameType = null;

function init(){
  let wordContainer = document.getElementById("word-container");
  let typingContainer = document.getElementById("typing-container");
  const playButton = document.getElementById("play-button");
  const wordButton = document.getElementById("words");
  const phraseButton = document.getElementById("phrases");
  let completeDisplay = document.getElementById("completed");
  let wpmDisplay = document.getElementById("WPM");

  playButton.addEventListener("click", ()=>{
    if(playButton.value === "start"){
      typingContainer.disabled = false;
      typingContainer.focus();
      findWord();
      playButton.textContent = "Stop";
      playButton.value = "stop";
      startTimer();
    } else if (playButton.value === "stop"){
      resetGame();
    }
  }); //end play button listener

  typingContainer.addEventListener("input", ()=>{
    let wordToType = wordContainer.textContent;
    let wordToTypeLength = wordToType.length;
    let userInput = typingContainer.value;
    let userInputLength = userInput.length;
    let subtringToMatch = wordToType.substring(0, userInputLength);
    //Length of input != word
    if(wordToTypeLength != userInputLength){
      if(subtringToMatch == userInput){
        typingContainer.style.backgroundColor = "#55efc4";
      }
      else {
        typingContainer.style.backgroundColor = "#fab1a0";
      }
    }
    //Length is same
    else if (wordToTypeLength == userInputLength){
      if(subtringToMatch == userInput){ //input is correct
        let num = wordToType.split(" ").length;
        findWord();
        typingContainer.value = "";
        typingContainer.style.backgroundColor = "rgba(0,0,0,.05)";
        incrementCompleted(num);
        calculateWPM();
      }
      else {
        typingContainer.style.backgroundColor = "#fab1a0";
      }
    }
  }); //end typing listener

  wordButton.addEventListener("click", ()=>{
    wordArray = words.slice(0, words.length);
    wordButton.classList.add("selected");
    phraseButton.classList.remove("selected");
    gameType = "words";
    resetGame();
  });

  phraseButton.addEventListener("click", ()=>{
    wordArray = phrases.slice(0, phrases.length);
    phraseButton.classList.add("selected");
    wordButton.classList.remove("selected");
    gameType = "phrases";
    resetGame();
  });

  function resetGame(){
    typingContainer.disabled = true;
    typingContainer.blur();
    typingContainer.value = "";
    typingContainer.style.backgroundColor = "rgba(0,0,0,.05)";
    playButton.textContent = "Start";
    playButton.value = "start";
    completeDisplay.dataset.complete = 0;
    completeDisplay.textContent = 0;
    wordContainer.textContent = "";
    wpmDisplay.textContent = "";
    stopTimer();
  }
}



function findWord(){
  resetTimer();
  let wordContainer = document.getElementById("word-container");
  //Find random word based on random number
  let wordArrayLength = wordArray.length;

  if(wordArrayLength > 0){
    let randomNumber = Math.floor(Math.random() * wordArrayLength);
    let randomWord = wordArray[randomNumber];

    //Remove random word based on index
    wordArray.splice(randomNumber, 1);
    wordContainer.textContent = randomWord;
  } else {
    let typingContainer = document.getElementById("typing-container");
    const playButton = document.getElementById("play-button");
    typingContainer.disabled = true;
    typingContainer.blur();
    playButton.textContent = "Start";
    playButton.value = "start";
    if(gameType == "words"){
      wordContainer.textContent = "There are no words left!!";
      wordArray = words.slice(0, words.length);
    } else if (gameType == "phrases"){
      wordContainer.textContent = "There are no phrases left!!";
      wordArray = phrases.slice(0, phrases.length);
    }
  }
}

function incrementCompleted(numToIncrement){
  let completeDisplay = document.getElementById("completed");
  completeDisplay.style.backgroundColor = "#00b894";
  completeDisplay.style.color = "white";
  let complete = Number(completeDisplay.dataset.complete);
  let newCompleted = complete + numToIncrement;
  completeDisplay.dataset.complete = newCompleted;
  completeDisplay.textContent = newCompleted;
  setTimeout(function(){
    completeDisplay.style.transition = ".25s";
    completeDisplay.style.backgroundColor = "transparent";
    completeDisplay.style.color = "black";
  }, 250);

}


let milliseconds = 0;
let seconds = 0;
let minutes = 0;
let timerID;
let minutesDisplay = document.getElementById("min");
let secondsDisplay = document.getElementById("sec");
let milliDisplay = document.getElementById("milli");
let totalMilliseconds = 0; //Used for WPM


function startTimer(){
  timerID = setInterval(function(){
    totalMilliseconds += 10;
    milliseconds += 1;
    milliseconds < 10 ? milliDisplay.textContent = "0" + milliseconds : milliDisplay.textContent = milliseconds;
    if(milliseconds == 99){
      seconds += 1;
      milliseconds = 0;
      milliDisplay.textContent = "00";
      seconds < 10 ? secondsDisplay.textContent = "0" + seconds : secondsDisplay.textContent = seconds;
    }
    if(seconds == 59){
      minutes += 1;
      seconds = 0;
      secondsDisplay.textContent = "00";
      minutes < 10 ? minutesDisplay.textContent = "0" + minutes : minutesDisplay.textContent = minutes;

    }
  }, 10);
}

function stopTimer(){
  console.log(timerID);
  clearTimeout(timerID);
  milliseconds = 0;
  seconds = 0;
  minutes = 0;
  minutesDisplay.textContent = "00";
  secondsDisplay.textContent = "00";
  milliDisplay.textContent = "00";
}

function resetTimer(){
  milliseconds = 0;
  seconds = 0;
  minutes = 0;
  minutesDisplay.textContent = "00";
  secondsDisplay.textContent = "00";
  milliDisplay.textContent = "00";
}

function calculateWPM(){
  let wpmDisplay = document.getElementById("WPM");
  let currentWPM = wpmDisplay.textContent;
  let wordsCompleted = document.getElementById("completed").dataset.complete;
  let newWPM = (60000 * Number(wordsCompleted)) / totalMilliseconds;
  wpmDisplay.textContent = Math.floor(newWPM);

  //UI
  if(newWPM < currentWPM){
    wpmDisplay.style.backgroundColor = "#d63031";
    wpmDisplay.style.color = "white";
    setTimeout(function(){
      wpmDisplay.style.transition = ".25s";
      wpmDisplay.style.backgroundColor = "transparent";
      wpmDisplay.style.color = "black";
    }, 250);
  } else {
    wpmDisplay.style.backgroundColor = "#00b894";
    wpmDisplay.style.color = "white";
    setTimeout(function(){
      wpmDisplay.style.transition = ".25s";
      wpmDisplay.style.backgroundColor = "transparent";
      wpmDisplay.style.color = "black";
    }, 250);
  }
}
