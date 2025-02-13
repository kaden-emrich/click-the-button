// By: Kaden Emrich

/*

Playtesters:
Andrew Popovic
Viekses Horn
Ethan Jezior
Greg Janvier
Bogdan Gura

*/

// make a level where there are just a lot of buttons and you need to click all of them to win

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
const hCheckboxArea = document.getElementById('human-checkbox-area');
const textInputArea = document.getElementById('text-input-level-area');
const darkness = document.getElementById("darkness");

const decoyButtons = document.querySelectorAll('.decoy-button');

var lastMouseX = 0;
var lastMouseY = 0;
var mouseX = 0;
var mouseY = 0;

var mouseMoveDist = 0;

document.body.onmousemove = (event) => {
    lastMouseX = mouseX;
    lastMouseY = mouseY;

    mouseX = event.clientX;
    mouseY = event.clientY;
    mouseMoveDist = Math.sqrt(Math.pow(lastMouseX-mouseX, 2) + Math.pow(lastMouseY-mouseY, 2));
}

// winScreen.nextFunc = undefined;

// You can't fail a safe level but you can fail a danger level
const levels = [
    setUpLvl1, // safe
    setUpLvl2, // danger
    bouncyLevelSetup, // safe
    dontLevelSetup, // danger
    sneekyLevelSetup, // safe
    forceFieldLevelSetup, // danger
    popLevelSetup, // safe
    decoyLevelSetup, // danger
    itLevelSetup, // danger
    runAwayLevelSetup, // safe
    diyLevelSetup, // danger
    darkLevelSetup, // safe
    humanLevelSetup // danger
];

// maybe make an atari breakout level?
// quick time event?
// guitar hero?

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

    winScreen.heading.innerHTML = "that's all I have for now";
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

    theButton.style.scale = 1.00;

    theButton.style = "";

    buttonLable.innerHTML = '';
    buttonLable.style.opacity = 1;

    forceField.classList.add('hidden');
    forceFieldControls.classList.add('hidden');

    hCheckboxArea.classList.add('hidden');
    textInputArea.classList.add('hidden');
    darkness.classList.add('hidden');

    hideDecoyButtons();

    document.onclick = null;

    clearInterval(bouncyLevelInterval);
    clearInterval(runAwayLevelInterval);
    clearInterval(darkLevelInterval);
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
        theButton.innerText = "click again";

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
var bouncySlow = 0.90;
var bouncyInsultRelScale = 5;
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
    buttonLable.style.opacity = 0.01;
    buttonLable.innerText = "your aim is terrible";

    bouncyLevelTime = 500;

    let speed = 4.0;

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

    document.onclick = () => {
        speed *= bouncySlow;
        xVelocity *= bouncySlow;
        yVelocity *= bouncySlow;
        buttonLable.style.opacity = parseFloat(buttonLable.style.opacity) * (1+bouncyInsultRelScale*(1.0 - bouncySlow));
    }

    showGameArea();
}

var runAwayLevelInterval = undefined;
function runAwayLevelFinish() {
    document.onclick = null;
    clearInterval(runAwayLevelInterval);
    hideGameArea();
    cleanGameArea();
    winScreen.set("You caught him");
    winScreen.show();
}
function runAwayLevelSetup() {
    winScreen.hide();
    cleanGameArea();
    theButton.classList.add('absolute');

    let xPosition = window.innerWidth/2 - theButton.offsetWidth/2;
    let yPosition = window.innerHeight/2 - theButton.offsetHeight/2;

    var minDist = 100;

    theButton.style.top = yPosition + "px";
    theButton.style.left = xPosition + "px";

    showGameArea();

    theButton.onmouseenter = () => {
        theButton.onmouseenter = undefined;
        runAwayLevelInterval = setInterval(() => {
            let distX = mouseX-(xPosition + theButton.offsetWidth/2);
            let distY = mouseY-(yPosition + theButton.offsetHeight/2);
            let dist = Math.sqrt(distX*distX + distY*distY);

            console.log(`(${distX}, ${distY}) = ${dist}`);

            if(dist < minDist) {
                let dir = distX == 0 ? 
                        distY > 0 ?
                            Math.PI/2 : 0-Math.PI/2 : distX > 0 ? 
                                Math.PI + Math.atan((distY)/(distX)) : distY > 0 ? 
                                    Math.atan((distY)/(distX)) : Math.atan((distY)/(distX));
                let dif = minDist - dist;

                dif = lerp(20, 1, dist / minDist);

                let xOffset = Math.cos(dir) * dif;
                let yOffset = Math.sin(dir) * dif;

                console.log(`[${xOffset}, ${yOffset}]`);
                console.log(dir);

                let nextX = xPosition + xOffset;
                let nextY = yPosition + yOffset;

                if(nextX < 0) {
                    nextX = 0;
                }
                else if(nextX > window.innerWidth - theButton.offsetWidth) {
                    nextX = window.innerWidth - theButton.offsetWidth;
                }

                if(nextY < 0) {
                    nextY = 0;
                }
                else if(nextY > window.innerHeight - theButton.offsetHeight) {
                    nextY = window.innerHeight - theButton.offsetHeight;
                }

                xPosition = nextX;
                yPosition = nextY;
            }

            theButton.style.top = yPosition + "px";
            theButton.style.left = xPosition + "px";
        }, 1000/60);
    }
    
    

    theButton.onclick = runAwayLevelFinish;
}

var sneekyLevelDone = false;
var sneekyLevelHover = false;
function sneekyLevelFinish() {
    sneekyLevelDone = true;
    hideGameArea();
    winScreen.set("you found him :)");
    winScreen.show();
}
function sneekyLevelSetup() {
    winScreen.hide();
    cleanGameArea();
    theButton.classList.add('invisable');

    theButton.classList.add('absolute');

    sneekyLevelDone = false;
    sneekyLevelHover = false;

    showGameArea();

    buttonLable.innerText = "Where did he go?";
    theButton.innerText = "You found me!";

    theButton.style.top = Math.random() * (window.innerHeight - theButton.clientHeight * 2) + "px";
    theButton.style.left = Math.random() * (window.innerWidth - theButton.clientWidth * 2) + "px";

    theButton.onmouseenter = () => {
        theButton.classList.remove('invisable');
        sneekyLevelHover = true;
    }
    theButton.onmouseleave = () => {
        theButton.classList.add('invisable');
        sneekyLevelHover = false;
    }
    theButton.onclick = () => {
        sneekyLevelFinish();
    }

    setTimeout(function peekaboo() {
        if(!sneekyLevelDone) {
            if(!sneekyLevelHover) {
                theButton.innerText = "Peekaboo!";
                theButton.classList.remove('invisable');

                setTimeout(() => {
                    theButton.classList.add('invisable');
                    theButton.innerText = "You found me!";
                }, 500);
            }

            setTimeout(peekaboo, Math.floor((Math.random()*5000) + 2000));
        }
    }, 5000);
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
    winScreen.set("You aren't qualified to operate those controls.\n Management WILL be hearing about this");
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

    forceField.onclick = () => {
        hideGameArea();
        cleanGameArea();
        winScreen.set("Touching a deadly force field kills you.\nWho knew?\n\n¯\\_(ツ)_/¯", false);
        winScreen.show();
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

    buttonLable.innerText = "Which one?";

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

function itLevelFinish() {
    hideGameArea();
    cleanGameArea();
    winScreen.set("You aren't so easily tricked...");
    winScreen.show();
}
function itLevelSetup() {
    winScreen.hide();
    cleanGameArea();

    buttonLable.innerHTML = 'click <span id="it-text">it</span>';

    buttonLable.querySelector('#it-text').onclick = itLevelFinish;
    theButton.onclick = () => {
        hideGameArea();
        winScreen.set("That wasn't it", false);
        winScreen.show();
    }

    showGameArea();
}

function humanLevelFinish() {
    hideGameArea();
    cleanGameArea();
    winScreen.set("You can't be too careful these days...");
    winScreen.show();
}
function humanLevelSetup() {
    winScreen.hide();
    cleanGameArea();

    // buttonLable.innerText = "To click the button:";

    // theButton.classList.add('hidden');

    hCheckboxArea.querySelector('input').checked = false;
    hCheckboxArea.classList.remove('hidden');

    // hCheckboxArea.querySelector('input').onclick = () => {
    //     if(hCheckboxArea.querySelector('input').checked) {
    //         theButton.classList.remove('hidden');
    //     }
    //     else {
    //         theButton.classList.add('hidden');
    //     }
    // }

    theButton.onclick = () => {
        if(hCheckboxArea.querySelector('input').checked) {
            humanLevelFinish();
        }
        else {
            hideGameArea();
            winScreen.set("Only humans are allowed click the button", false);
            winScreen.show();
        }
    }
    showGameArea();
}

function diyLevelFinish() {
    hideGameArea();
    cleanGameArea();
    winScreen.set("You are a professional button constructor!");
    winScreen.show();
}
function diyLevelSetup() {
    winScreen.hide();
    cleanGameArea();

    buttonLable.innerText = "D.I.Y. button time!";

    textInputArea.querySelector('input').value = "";
    theButton.innerText = "";

    textInputArea.classList.remove('hidden');
    theButton.classList.add('hidden');

    textInputArea.onkeyup = (event) => {
        if(event.key == "Enter") {
            // maybe fail???
            return;
        }
        if(textInputArea.querySelector('input').value == "") {
            theButton.classList.add('hidden');
        }
        else {
            theButton.classList.remove('hidden');
        }
        
        theButton.innerText = textInputArea.querySelector('input').value;
    }

    theButton.onclick = () => {
        if(textInputArea.querySelector('input').value  == 'click') {
            diyLevelFinish();
        }
        else {
            hideGameArea();
            winScreen.set("Your father would be disappointed of you", false);
            winScreen.show();
        }
    };
    showGameArea();
}

var darkLevelInterval = undefined;
function darkLevelFinish() {
    darkLevelDone = true;
    clearInterval(darkLevelInterval);
    hideGameArea();
    cleanGameArea();
    winScreen.set("That flashlight came in handy");
    winScreen.show();
}
function darkLevelSetup() {
    cleanGameArea();

    theButton.classList.add('hidden');

    winScreen.nextButton.style.pointerEvents = "none";

    darkness.classList.remove('darkness-fade');
    darkness.classList.remove('hidden');
    darkness.classList.remove('flashlight');

    showGameArea();

    setTimeout(() => darkness.classList.add('darkness-fade'));

    setTimeout(() => {
        winScreen.nextButton.style.pointerEvents = "all";
        winScreen.hide();
        darkLevelInterval = setInterval(updateDarkness, 1000/60);

        theButton.classList.remove('hidden');

        theButton.classList.add('absolute');

        theButton.style.top = Math.random() * (window.innerHeight - theButton.clientHeight*2) + "px";
        theButton.style.left = Math.random() * (window.innerWidth - theButton.clientWidth*2) + "px";

        doBlink = false;
        setTimeout(() => darkness.classList.add('flashlight'), 500);
        // setTimeout(() => doBlink = true, 2000);

        theButton.onclick = darkLevelFinish;
    }, 2000);
}
var doBlink = false;
var blinkTime = 2;
var timeScenceBlink = 0;
function updateDarkness() {
    if(doBlink) {
        if(timeScenceBlink == blinkTime) {
            darkness.style.background = "transparent";
            timeScenceBlink++;
        }
        else if(timeScenceBlink == blinkTime * 2) {
            if(Math.random() * 100 < 1) {
                darkness.style.background = "black";
                timeScenceBlink = 0;
            }
        }
        else if(timeScenceBlink > blinkTime * 2 && Math.random() * 1000000 < 1) {
            darkness.style.background = "black";
            timeScenceBlink = 0;
        }
        else {
            timeScenceBlink++;
        }
    }

    darkness.style.left = mouseX + "px";
    darkness.style.top = mouseY + "px";
}

function expandLevelSetup() { // i dont know what to do with this level
    winScreen.hide();
    cleanGameArea();
    var expandScale = 1.00;
    var scaleIncrement = 0.50;

    theButton.onclick = () => {
        expandScale += scaleIncrement;
        theButton.style.scale = expandScale;
    }
    theButton.oncontextmenu = (event) => {
        event.preventDefault();
        expandScale -= scaleIncrement;
        theButton.style.scale = expandScale;
    }

    showGameArea();
}

var popInterval;
function popLevelFinish(popText) {
    hideGameArea();
    clearInterval(popInterval);
    popInterval = undefined;
    popText.remove();
    winScreen.set("weeee!");
    winScreen.show();
}
function popLevelSetup() {
    winScreen.hide();
    cleanGameArea();
    theButton.classList.add('hidden');

    theButton.classList.add('absolute');

    showGameArea();

    buttonLable.innerHTML = "<span id='pop-text'>click</span> the button";
    let popText = document.getElementById('pop-text');
    theButton.innerText = "click";

    theButton.style.top = popText.offsetTop + "px";
    theButton.style.left = popText.offsetLeft + "px";

    popText.onclick = () => {
        popText.onclick = undefined;
        popText.classList.add('invisable');
        popText.classList.add('unclickable');
        theButton.style.top = popText.offsetTop + "px";
        theButton.style.left = popText.offsetLeft + "px";
        theButton.classList.remove('hidden');

        startPopAnimation();
    }
    theButton.onclick = () => {
        popLevelFinish(popText);
    }
}
function startPopAnimation() {
    let vx = 5;
    let vy = -10;
    let bounceFactor = 0.8;
    let gravity = 0.5;

    let grounded = false;

    popInterval = setInterval(() => {
        if(!grounded) {
            vy += gravity;
        }

        if(theButton.offsetTop + theButton.offsetHeight > window.innerHeight) {
            theButton.style.top = (window.innerHeight - theButton.offsetHeight) + "px";
            vx *= bounceFactor;
            vy *= -bounceFactor;
            vy += gravity;
            if(Math.abs(vy) < 2) {
                vy = 0;
                grounded = true;
            }
        }

        if(theButton.offsetTop < 0) {
            theButton.style.top = 0 + "px";
            vx *= bounceFactor;
            vy *= -bounceFactor;
        }

        if(theButton.offsetLeft < 0) {
            theButton.style.left = 0 + "px";
            vx *= -bounceFactor;
            vy *= bounceFactor;
        }

        if(theButton.offsetLeft + theButton.offsetWidth > window.innerWidth) {
            theButton.style.left = (window.innerWidth - theButton.offsetWidth) + "px";
            vx *= -bounceFactor;
            vy *= bounceFactor;
        }

        theButton.style.left = (theButton.offsetLeft + vx) + "px";
        theButton.style.top = (theButton.offsetTop + vy) + "px";
    }, 1000/60);
}

function init() {
    level = 0;
    nextLevel();
}

init();