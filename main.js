// Kaden Emrich

const theButton = document.getElementById('the-button'); // his name is Benedict
const gameArea = document.getElementById('game');
const buttonLable = document.getElementById('button-lable');

var winScreen = Object();
winScreen.div = document.getElementById('win-screen');
winScreen.main = document.querySelector('#win-screen h1');
winScreen.heading = document.querySelector('#win-screen h2');
winScreen.nextButton = document.getElementById('next-button');
winScreen.levelDisplay = document.getElementById('level-display');

const forceField = document.getElementById('force-field');
const forceFieldControls = document.getElementById('force-field-control');

const decoyButtons = document.querySelectorAll('.decoy-button');

// winScreen.nextFunc = undefined;

const levels = [
    setUpLvl1,
    setUpLvl2,
    bouncyLevelSetup,
    dontLevelSetup,
    sneekyLevelSetup,
    forceFieldLevelSetup,
    decoyLevelSetup
]

var level = 0;

function hideGameArea() {
    gameArea.classList.add('hidden');
}
function showGameArea() {
    gameArea.classList.remove('hidden');
}

winScreen.show = function() {
    winScreen.div.classList.remove('hidden');
}
winScreen.hide = function() {
    winScreen.div.classList.add('hidden');
}
winScreen.set = function(header = "", win = true) {
    if(win) {
        winScreen.main.innerText = "You Win!";
        winScreen.nextButton.innerText = "Next Level";
        winScreen.nextButton.onclick = nextLevel;
    }
    else {
        winScreen.main.innerText = "You Lose!";
        winScreen.nextButton.innerText = "Restart";
        winScreen.nextButton.onclick = init;
    }

    winScreen.heading.innerHTML = header;
    winScreen.levelDisplay.innerHTML = level;
}

winScreen.end = function() {
    winScreen.main.innerText = "The End";
    winScreen.nextButton.innerText = "Restart";
    winScreen.nextButton.onclick = init;

    winScreen.heading.innerHTML = "that's it";
    winScreen.levelDisplay.innerHTML = levels.length;
}

function showDecoyButtons() {
    for(let i = 0; i < decoyButtons.length; i++) {
        decoyButtons[i].classList.remove('hidden');
    }
}

function hideDecoyButtons() {
    for(let i = 0; i < decoyButtons.length; i++) {
        decoyButtons[i].classList.add('hidden');
    }
}

function nextLevel() {
    level++;
    // winScreen.hide();
    if(level - 1 >= levels.length) {
        winScreen.end();
    }
    else {
        levels[level - 1]();
    }
}

//start setups

function cleanGameArea() {
    theButton.innerText = "click";

    theButton.onclick = undefined;
    theButton.onmouseenter = undefined;
    theButton.onmouseleave = undefined;

    theButton.classList.remove('invisable');
    theButton.classList.remove('absolute');

    theButton.style = "";

    buttonLable.innerHTML = '';

    forceField.classList.add('hidden');
    forceFieldControls.classList.add('hidden');

    hideDecoyButtons();
}

function lvl1Finish() {
    // console.log("complete lvl1"); // for debugging
    hideGameArea();
    winScreen.set();
    winScreen.show();
}
function setUpLvl1() {
    winScreen.hide();
    cleanGameArea();
    buttonLable.innerText = "click the button";
    theButton.onclick = () => {
        lvl1Finish();
    }
    showGameArea();
}

var lvl2IsFinished = false;
function lvl2Finish() {
    lvl2IsFinished = true;
    hideGameArea();
    winScreen.set("You were paying attention\n(or mistakenly clicked it twice)");
    winScreen.show();
}
function setUpLvl2() {
    winScreen.hide();
    cleanGameArea();
    lvl2IsFinished = false;
    theButton.onclick = () => {
        theButton.innerText = "again";

        theButton.onclick = () => {
            lvl2Finish();
        }
        
        setTimeout(() => {
            if(!lvl2IsFinished) {
                hideGameArea();
                winScreen.set("You weren't paying attention.", false);
                winScreen.show();
            }
        }, 500);
    }
    showGameArea();
}

var bouncyLevelInterval = undefined;
var bouncyLevelTime = 500;
function bouncyLevelFinish() {
    clearInterval(bouncyLevelInterval);
    hideGameArea();
    winScreen.set(`You watched it bounce for ${Math.floor(bouncyLevelTime/1000)} seconds`);
    winScreen.show();
}
function bouncyLevelSetup() {
    winScreen.hide();
    cleanGameArea();
    theButton.classList.add('absolute');

    bouncyLevelTime = 500;

    let speed = 5;

    let xVelocity = speed;
    let yVelocity = 0-speed;

    let xPosition = window.innerWidth/2 - theButton.clientWidth;
    let yPosition = window.innerHeight/2 - theButton.clientHeight;

    theButton.style.top = yPosition + "px";
    theButton.style.left = xPosition + "px";

    bouncyLevelInterval = setInterval(() => {

        if(xPosition <= 0) {
            xVelocity = speed;
        }
        if(xPosition >= window.innerWidth - theButton.clientWidth) {
            xVelocity = 0-speed;
        }
        if(yPosition <= 0) {
            yVelocity = speed;
        }
        if(yPosition >= window.innerHeight - theButton.clientHeight) {
            yVelocity = 0-speed;
        }
        
        xPosition += xVelocity;
        yPosition += yVelocity;

        theButton.style.top = yPosition + "px";
        theButton.style.left = xPosition + "px";

        bouncyLevelTime += 1000/60;
    }, 1000/60);

    theButton.onclick = bouncyLevelFinish;

    showGameArea();
}

function sneekyLevelFinish() {
    hideGameArea();
    winScreen.set("you found him :)");
    winScreen.show();
}
function sneekyLevelSetup() {
    winScreen.hide();
    cleanGameArea();
    theButton.classList.add('invisable');

    theButton.classList.add('absolute');

    showGameArea();

    buttonLable.innerText = "Where did he go?";
    theButton.innerText = "You found me!";

    theButton.style.top = Math.random() * (window.innerHeight - theButton.clientHeight) + "px";
    theButton.style.left = Math.random() * (window.innerWidth - theButton.clientWidth) + "px";

    theButton.onmouseenter = () => {
        theButton.classList.remove('invisable');
    }
    theButton.onmouseleave = () => {
        theButton.classList.add('invisable');
    }
    theButton.onclick = () => {
        sneekyLevelFinish();
    }
}

function dontLevelFinish() {
    hideGameArea();
    winScreen.set("You didn't");
    winScreen.show();
} 
function dontLevelSetup() {
    var lvl5Clicked = false;
    winScreen.hide();
    cleanGameArea();
    buttonLable.innerText = "don't";

    theButton.onclick = () => {
        lvl5Clicked = true;
        hideGameArea();
        winScreen.set("You didn't don't\nNext time do don't\nBut don't do", false);
        winScreen.show();
    }

    setTimeout(() => {
        if(!lvl5Clicked) {
            dontLevelFinish();
        }
    }, 5000)

    showGameArea();
}

function forceFieldLevelFinish() {
    hideGameArea();
    cleanGameArea();
    winScreen.set("You aren't qualified to operate those controls.\n Management will be hearing about this");
    winScreen.show();
}
function forceFieldLevelSetup() {
    winScreen.hide();
    cleanGameArea();

    forceField.classList.remove('hidden');
    forceFieldControls.classList.remove('hidden');

    forceFieldControls.querySelector('input').checked = true;
    forceField.classList.remove('hidden');

    theButton.onclick = forceFieldLevelFinish;

    forceFieldControls.querySelector('.switch').onclick = () => {
        if(forceFieldControls.querySelector('input').checked) {
            forceField.classList.remove('hidden');
        }
        else {
            forceField.classList.add('hidden');
        }
    }

    showGameArea();
}


function decoyLevelFinish() {
    hideGameArea();
    cleanGameArea();
    winScreen.set("Good choice");
    winScreen.show();
}
function decoyLevelSetup() {
    winScreen.hide();
    cleanGameArea();

    for(let i = 0; i < decoyButtons.length; i++) {
        decoyButtons[i].onclick = () => {
            hideGameArea();
            winScreen.set("No, thats not him.", false);
            winScreen.show();
        }
    }

    showDecoyButtons();

    theButton.onclick = decoyLevelFinish;

    showGameArea();
}

function init() {
    level = 0;
    nextLevel();
}

init();