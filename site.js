document.addEventListener("DOMContentLoaded", () =>{
  init();
});

function init(){
  let wordContainer = document.getElementById("word-container");
  let typingContainer = document.getElementById("typing-container");
  const playButton = document.getElementById("play-button");
  playButton.addEventListener("click", ()=>{
    if(playButton.value === "start"){
      typingContainer.disabled = false;
      typingContainer.focus();
      findWord();
      playButton.textContent = "Stop";
      playButton.value = "stop";
    } else if (playButton.value === "stop"){
      typingContainer.disabled = true;
      typingContainer.blur();
      playButton.textContent = "Start";
      playButton.value = "start";
    }

  });

  typingContainer.addEventListener("input", ()=>{
    let wordToType = wordContainer.textContent;
    let wordToTypeLength = wordToType.length;
    let userInput = typingContainer.value;
    let userInputLength = userInput.length;

    let subtringToMatch = wordToType.substring(0, userInputLength);

    //Length of input != word
    if(wordToTypeLength != userInputLength){
      if(subtringToMatch.toLowerCase() == userInput.toLowerCase()){
        typingContainer.style.backgroundColor = "#55efc4";
      }
      else {
        typingContainer.style.backgroundColor = "#fab1a0";
      }
    }
    //Length is same
    else if(wordToTypeLength == userInputLength){
      if(subtringToMatch.toLowerCase() == userInput.toLowerCase()){
        findWord();
        typingContainer.value = "";
        typingContainer.style.backgroundColor = "rgba(0,0,0,.05)";
        incrementCompleted();
      }
      else {
        typingContainer.style.backgroundColor = "#fab1a0";
      }
    }
  });
}



function findWord(){
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
    wordContainer.textContent = "There are no words left!!";
    typingContainer.disabled = true;
    typingContainer.blur();
    playButton.textContent = "Start";
    playButton.value = "start";
    wordArray = words.slice(0, words.length);
  }
}

function incrementCompleted(){
  let completeDisplay = document.getElementById("completed");
  completeDisplay.style.backgroundColor = "#00b894";
  let complete = Number(completeDisplay.dataset.complete);
  let newCompleted = complete + 1;
  completeDisplay.dataset.complete = newCompleted;
  completeDisplay.textContent = newCompleted;
  setTimeout(function(){
    completeDisplay.style.transition = ".25s";
    completeDisplay.style.backgroundColor = "white";
  }, 250);

}

let wordArray = words.slice(0, words.length);
