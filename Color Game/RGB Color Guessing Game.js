var numSquares = 6;
var colors = generateRandomColors(numSquares);

// var colors = [
// 	"rgb(255, 0, 0)",
// 	"rgb(255, 255, 0)",
// 	"rgb(0, 255, 0)",
// 	"rgb(0, 255, 255)",
// 	"rgb(0, 0, 255)",
// 	"rgb(255, 0, 255)",
// ]

//Loop through (see for loop below) each of the six squares and assign one of
//the above colors to each one's background. Make sure to
//select first:

var squares = document.querySelectorAll(".square");
//Each time the pages loads, one of the colors will be chosen as the goal,
//the color that the user has to guess, the target color.
//So, picking a random color (use a function because since we can play new games,
//it's something we'll have to call a few times):
var pickedColor = pickColor();
//We also need to update the page so that it says which color is picked:
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var easyBtn = document.querySelector("#easyBtn");
var hardBtn = document.querySelector("#hardBtn");

easyBtn.addEventListener("click", function() {
	hardBtn.classList.remove("selected");
	easyBtn.classList.add("selected");
	numSquares = 3;
	//Generate new colors when clicking on Easy Button
	colors = generateRandomColors(numSquares);
	//Pick a new picked color
	pickedColor = pickColor();
	//Change display to show new picked color
	colorDisplay.textContent = pickedColor;
	//Hide the three bottom divs when we click on easy mode - loop through
	//and set the bottom three's display property to be "none".
	//To do this, we'll loop through all 6 at first, and for the first 3,
	//we're going to give them a new color, and for the bottom 3, we're
	//going to hide them:
	for(var i = 0; i < squares.length; i++) {
		if(colors[i]) {
			squares[i].style.background = colors[i];
		}	else {
			squares[i].style.display = "none";
		}
	}
});

hardBtn.addEventListener("click", function() {
	hardBtn.classList.add("selected");
	easyBtn.classList.remove("selected");
	numSquares = 6;
	colors = generateRandomColors(numSquares);
	//Pick a new picked color
	pickedColor = pickColor();
	//Change display to show new picked color
	colorDisplay.textContent = pickedColor;
	//Assign a new color to every square but we also need to make sure
	//that the three bottom colors (from easy mode) are unhidden.
	for(var i = 0; i < squares.length; i++) {
			squares[i].style.background = colors[i];
			squares[i].style.display = "block";
	}
});

//Code for the reset button
resetButton.addEventListener("click", function() {
	//generate all new colors (we already have this function in line 2)
	colors = generateRandomColors(numSquares);
	//pick a new random color from array
	pickedColor = pickColor(); //from line 21
	//change colorDisplay to match picked color
	colorDisplay.textContent = pickedColor;
	//to display "New Colors" after clicking on "Play Again?"
	this.textContent = "New Colors"
	//to take away "Correct!" message after winning and clicking on
	//"Play Again?":
	messageDisplay.textContent = "";
	//change colors of squares (already have this code down below)
	for(var i = 0; i < squares.length; i++) {
		squares[i].style.background = colors[i];
	}
	h1.style.background = "steelblue";
})

colorDisplay.textContent = pickedColor;

//We need to code to figure out which color it is we clicked on,
//and once we have that color, compare it to the picked color, and if they're
//different, we're going to change the background color of that square
//so that it goes to the same color as the background of the body (in the game,
//each time you click on the wrong square, it "disappears"). And if they are the same,
//then that means that the player has won and we need to do something else.
//If they're different, that means the wrong color was picked, so we also have to
//handle that. We can start by adding an Event Handler and we can use the same loop
//See below "add click listeners to squares":

for(var i = 0; i < squares.length; i++) {
	//add initial colors to squares
	squares[i].style.background = colors[i]; //We're going to take the "i" and use it
											//to access "colors".

	//add click listeners to squares
	squares[i].addEventListener("click", function() {
		//grab color of clicked square ("this" refers to the color that was clicked on)
		var clickedColor = this.style.background;
		//compare color to pickedColor
		if(clickedColor === pickedColor) {
			messageDisplay.textContent = "Correct!";
			resetButton.textContent = "Play Again?";
			changeColors(clickedColor); //This is needed to call the function below in line 59.
			//Change h1 background color when user chooses correct color:
			h1.style.background = clickedColor;
		} else {
			//for what happens when picking the wrong color: the color fades away and
			//matches the background color:
			this.style.background = "#232323" //This is the background color from the CSS file.
			messageDisplay.textContent = "Try Again"
		}
	});

}

//When you get the correct answer, all the squares (and the <h1> background)
//change color to match that answer. Write a separate function to do this:
function changeColors(color) {
	//loop through all squares:
	for(var i = 0; i < squares.length; i++) {
	//change each color to match given color
	squares[i].style.background = color;
	}
	
}

//In this function we need to do two things:
//1. Pick a random number.
//2. Use that number to access the color out of the array of colors (see start of code
//above - the original array of 6 rgb colors have been commented out) and
//return that color. So, start by picking a random number (to pick a random number in JS,
//use "Math.random" - this will pick a random number between 0 and 1, and it doesn't include 1.
//If you wanted to generate a random number between 0 and 6, for example to mimic a die roll, use:
//Math.random() * 6; this doesn't include 6. If you wanted that number to go from 1-6, use:
//Math.random() *6 + 1, then you can get as high as 6.99999. To get a whole number and chop off the
//decimal, use "Math.floor" to remove everything after the decimal point:
//Math.floor(Math.random() * 6 + 1) ). In our game, we can have 3 colors (easy mode) or
//6 colors (hard mode) (i.e. our array may have 3 or 6 items), so we'll just use the
//length of the array to generate our color:
function pickColor() {
	var random = Math.floor(Math.random() * colors.length);
	//Use this variable (random number) to access an element from the array at that index (the random
	//number that is picked, e.g. 3, is the index number of the array above:
	return colors[random];
}

//Making it so that we don't use the same 6 colors everytime. We want to generate 6 random colors and
//fill the array with those random colors and then pick one of those colors. Use a function:
function generateRandomColors(num) {
	//make an array (use an empty array: [])
	var arr = []
	//add num random colors to array (use a loop) - repeat num times
	for(var i = 0; i < num; i++) {
		//get random color and push into array
		arr.push(randomColor()) //This repeats 6 times, each time pushing in a random color into the array.
	}
	//return that array
	return arr;
}

//This is a separate function (which was called in the function above) that will generate
//a random color for us:
function randomColor() {
	//pick a "red" from 0-255
	//Use 256 because remember the random number rounds down and will not include 255 if we type 255:
	var r = Math.floor(Math.random() * 256);
	//pick a "green" from 0-255
	var g = Math.floor(Math.random() * 256);
	//pick a "blue" from 0-255
	var b = Math.floor(Math.random() * 256);
	return "rgb(" + r + ", " + g + ", " + b + ")"; //We return this so we can use it above.
												   //All of this will return one random color.
}
