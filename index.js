const ACCENT_COLOR = "#3eb667";
const ERROR_COLOR = "#ff1010";

const introMsg = "Sabbir Mollah is currently working on Assistive Technologies for visually impaired people. He is a professional with expertise in Machine Learning and Deep Learning research and development. He is currently working as a Machine Learning Engineer at Apurba Technologies Ltd."

var currentCharacterIndex = 0;
var startTime;
var wrongPresses = 0;

function displayStringAsChars(introMsg){
    var introMsgTag = document.getElementById("intro-msg");
    for(let i=0; i< introMsg.length; i++){
        var char = introMsg[i];
        var charTag = document.createElement("span");
        charTag.id = "character-" + (i+1);
        charTag.textContent = char;
        introMsgTag.appendChild(charTag);
    }
}

function colorCurrentCharacter(){
    var currentCharacterTag = 1;
}

function setWPMScore(){
    wpmScoreTag = document.getElementById("wpm-score");
    var numberOfWords = introMsg.split(" ").length;
    var currentTime = Date.now();
    var timeDifferenceInSeconds = (currentTime - startTime)/1000;
    var timeDifferenceInMinutes = timeDifferenceInSeconds/60;
    
    var wpm = Math.floor(numberOfWords / timeDifferenceInMinutes);
    wpmScoreTag.textContent = wpm;
    console.log(startTime,currentTime,timeDifferenceInMinutes,wpm);
}

function setAccuracyScore(){
    accuracyScoreTag = document.getElementById("accuracy-score");
    var totalChars = introMsg.length;
    var correctPresses = totalChars - wrongPresses;
    var accuracy = Math.floor(correctPresses*100/totalChars);
    accuracyScoreTag.textContent = accuracy;
}

function setWPMAndAccuracy(){
    setWPMScore();
    setAccuracyScore();
}

function onKeyboardButtonPress(key){
    if(currentCharacterIndex==0){
        // Game starts now
        startTime = Date.now();
    }

    var currentCharacterTag = document.getElementById("character-" + (currentCharacterIndex+1));
    currentCharacter = currentCharacterTag.textContent;
    if(currentCharacter==key){
        // Correct keypress
        currentCharacterTag.style.background = "";
    }
    else{
        // Wrong keypress
        currentCharacterTag.style.background = ERROR_COLOR;
        wrongPresses++;
    }
    currentCharacterIndex++;
    if(currentCharacterIndex==introMsg.length){
        // Game ends now
        setWPMAndAccuracy();
        gameInitialization();
    }
    else{
        currentCharacterTag = document.getElementById("character-" + (currentCharacterIndex+1));
        currentCharacterTag.style.background = ACCENT_COLOR;
    }
    
}

function resetCharactersBG(){
    var length = introMsg.length;
    for(let i=0; i<length; i++){
        var characterTag = document.getElementById("character-" + (i+1));
        characterTag.style.background = "";
    }
}

function gameInitialization(){
    resetCharactersBG();
    currentCharacterIndex = 0;
    wrongPresses = 0;
    var firstCharacterTag = document.getElementById("character-1");
    firstCharacterTag.style.background = ACCENT_COLOR;
}

function onResetButtonPressed(){
    gameInitialization();
}

function main(){
    displayStringAsChars(introMsg);
    gameInitialization();

    document.addEventListener("keypress", function onEvent(event) {
        onKeyboardButtonPress(event.key);
    });

    resetButtonElement = document.getElementById("reset-button");
    resetButtonElement.addEventListener("click", function onEvent(event) {
        onResetButtonPressed();
    });

    // Trigger mobile soft keyboard
    var introMsgDivTag = document.getElementById("intro-msg-div");
    var hiddenInput = document.getElementById("hiddenInput");
    introMsgDivTag.addEventListener("click", function onEvent(event) {
        console.log("Hello");
        hiddenInput.style.visibility = 'visible';
        hiddenInput.style.background = "white";
        hiddenInput.style.border = "none";
        hiddenInput.style.caretColor = "transparent";
        hiddenInput.focus();
    });
}

main();