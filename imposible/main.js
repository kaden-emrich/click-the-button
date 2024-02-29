// Kaden Emrich

var clicks = 0;

function init() {

    clicks = 0;

    button.init();

}// init


// Objects Start
var button = {
    
    element: document.getElementById("theButton"),

    count: 0,

    click: function() {

        console.log("click");

        clicks++;
        this.count;

        this.update();

    },

    update: function() {

        this.element.innerHTML = clicks;

        this.element.style.height = this.element.offsetWidth;
        
    },

    init: function() {

        this.element.innerHTML = clicks;

    }
}

// Objects End

// Run On Open Start

init();

// Run On Open End