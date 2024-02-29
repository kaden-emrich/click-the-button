const theButton = document.getElementById('the-button');
const gameArea = document.getElementById('game');
const buttonLable = document.getElementById('button-lable');

var winScreen = Object();
winScreen.div = document.getElementById('win-screen');
winScreen.main = document.querySelector('#win-screen h1');
winScreen.heading = document.querySelector('#win-screen h2');
winScreen.nextButton = document.getElementById('next-button');
winScreen.levelDisplay = document.getElementById('level-display');

// winScreen.nextFunc = undefined;

const levels = [
    setUpLvl1,
    setUpLvl2,
    setUpLvl3,
    setUpLvl4,
    setUpLvl5
]

var level = 1;

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
    winScreen.set("again");
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

function lvl3Finish() {
    hideGameArea();
    winScreen.set("you found him :)");
    winScreen.show();
}
function setUpLvl3() {
    winScreen.hide();
    cleanGameArea();
    theButton.classList.add('invisable');

    theButton.innerText = "You found me!";

    theButton.onmouseenter = () => {
        theButton.classList.remove('invisable');
    }
    theButton.onmouseleave = () => {
        theButton.classList.add('invisable');
    }
    theButton.onclick = () => {
        lvl3Finish();
    }

    showGameArea();
}

var lvl4Interval = undefined;
var lvl4Time = 500;
function lvl4Finish() {
    clearInterval(lvl4Interval);
    hideGameArea();
    winScreen.set(`You watched it bounce for ${Math.floor(lvl4Time/1000)} seconds`);
    winScreen.show();
}
function setUpLvl4() {
    winScreen.hide();
    cleanGameArea();
    theButton.classList.add('absolute');

    lvl4Time = 500;

    let speed = 5;

    let xVelocity = speed;
    let yVelocity = 0-speed;

    let xPosition = window.innerWidth/2 - theButton.clientWidth;
    let yPosition = window.innerHeight/2 - theButton.clientHeight;

    theButton.style.top = yPosition + "px";
    theButton.style.left = xPosition + "px";

    lvl4Interval = setInterval(() => {

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

        lvl4Time += 1000/60;
    }, 1000/60);

    theButton.onclick = lvl4Finish;

    showGameArea();
}

function lvl5Finish() {
    hideGameArea();
    winScreen.set("good dog");
    winScreen.show();
} 
function setUpLvl5() {
    var lvl5Clicked = false;
    winScreen.hide();
    cleanGameArea();
    buttonLable.innerText = "don't";

    theButton.onclick = () => {
        lvl5Clicked = true;
        hideGameArea();
        winScreen.set("You know what the word \"don't\" means right?", false);
        winScreen.show();
    }

    setTimeout(() => {
        if(!lvl5Clicked) {
            lvl5Finish();
        }
    }, 5000)

    showGameArea();
}




function init() {
    level = 1;
    setUpLvl1();
}

init();