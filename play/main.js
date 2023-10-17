var theButton = document.getElementById("the-button");
var clickCounter = document.getElementById("click-counter");
var buttonHeading = document.getElementById("button-heading");

var numClicks = 0;

function buttonClick() {

    console.log("click"); // for debugging
    
    numClicks += 1;
    clickCounter.innerText = numClicks;

    if(numClicks == 1) {

        theButton.innerText = "again";

        buttonHeading.classList.add("shrink-out");
        setTimeout(() => {
            buttonHeading.classList.add("hide");
            buttonHeading.classList.remove("shrink-out");
        }, 1000);

    }

    if(numClicks == 2) {

        //theButton.innerText = "Again";
        theButton.classList.add("bold");

    }

    if(numClicks == 3) {
        
        theButton.innerText = "AGAIN";

    }

    if(numClicks == 4) {
        
        theButton.innerText = "AGAIN!";

    }

    if(numClicks == 5) {

        theButton.classList.remove("bold");
        theButton.innerText = "okay.";

    }

    if(numClicks == 6) {

        theButton.innerText = "thanks";

    }

    if(numClicks == 7) {

        theButton.innerText = "that's enough";

    }

    if(numClicks == 8) {

        theButton.innerText = "you can stop now";

    }

    if(numClicks == 9) {

        theButton.innerText = "no need to continue";

    }

    if(numClicks == 10) {

        theButton.innerText = "stop";

    }

    if(numClicks > 10 && numClicks <= 15) {

        theButton.parentElement.parentElement.style.display = "block";
        theButton.parentElement.classList.add("pos-absolute");
        
        theButton.style.top = rng(0, window.innerHeight - theButton.offsetHeight) + "px";
        theButton.style.left = rng(0, window.innerWidth - theButton.offsetWidth) + "px";

        theButton.innerText = "DONT click";

    }

    if(numClicks == 16) {

        theButton.parentElement.parentElement.style = "";
        theButton.style = "";
        theButton.parentElement.classList.remove("pos-absolute");

        theButton.innerText = "ok I give up.";

    }

    // if(numClicks == 5) {

    //     clickCounter.parentElement.classList.add("fade-in");
    //     clickCounter.parentElement.classList.remove("transparent");

    // }

}// click()

function init() {

    theButton = document.getElementById("the-button");
    clickCounter = document.getElementById("click-counter");
    buttonHeading = document.getElementById("button-heading");

    numClicks = 0;

}// init()