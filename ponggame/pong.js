//global variables
var speedOfPaddle1 = 0;
const startPositionOfPaddle1 = positionOfPaddle1 = document.getElementById("paddle1").offsetTop;
var positionOfPaddle1 = document.getElementById("paddle1").offsetTop;
var speedOfPaddle2 = 0;
const startPositionOfPaddle2 = document.getElementById("paddle2").offsetTop;
var positionOfPaddle2 = document.getElementById("paddle2").offsetTop;


const paddleHeight = document.getElementById("paddle1").offsetHeight;
const paddleWidth = document.getElementById("paddle1").offsetWidth;

const gameboardHeight = document.getElementById("gameBoard").offsetHeight;
const gameboardWidth = document.getElementById("gameBoard").offsetWidth;

const ballHeight = document.getElementById("ball").offsetHeight;

const startTopPositionOfBall = document.getElementById("ball").offsetTop;
const startLeftPositionOfBall = document.getElementById("ball").offsetLeft;


var topPositionOfBall = startTopPositionOfBall;
var leftPositionOfBall = startLeftPositionOfBall;
var topSpeedOfBall = 0;
var leftSpeedOfBall = 0;

var bounce = new sound("jump.wav");
var buzz = new sound("buzzer.mp3");

//used to control game start/stop
var controlPlay;

	

//start ball motion
/*
window.addEventListener('load', function(){
	startBall();
});
*/
//move paddles
document.addEventListener('keydown', function(e) {
	//console.log("key down " + e.keyCode);
	//paddle1
	if(e.keyCode == 87 || e.which == 87){ // W
		speedOfPaddle1 = -10;
	}
	if(e.keyCode == 83 || e.which == 83){ // S
		speedOfPaddle1 = 10;
	}

	//paddle2
	if(e.keyCode == 38 || e.which == 38){ // up arrow
		speedOfPaddle2 = -10;
	}
	if(e.keyCode == 40 || e.which == 40){ // down arrow
		speedOfPaddle2 = 10;
	}

	
	

});


//stop paddles
document.addEventListener('keyup', function(e) {
	//console.log("key up " + e.keyCode);
	if(e.keyCode == 87 || e.which == 87){ // W
		speedOfPaddle1 = 0;
	}
	if(e.keyCode == 83 || e.which == 83){ 
		speedOfPaddle1 = 0;
	}
	if(e.keyCode == 38 || e.which == 38){ 
		speedOfPaddle2 = 0;
	}
	if(e.keyCode == 40 || e.which == 40){ 
		speedOfPaddle2  = 0;
	}
	
	
});

// object constructor to play sounds
// https://www.w3schools.com/graphics/game_sound.asp
function sound(src) {
  this.sound = document.createElement("audio");
  this.sound.src = src;
  this.sound.setAttribute("preload", "auto");
  this.sound.setAttribute("controls", "none");
  this.sound.style.display = "none";
  document.body.appendChild(this.sound);
  this.play = function(){
    this.sound.play();
  }
  this.stop = function(){
    this.sound.pause();
  }
}


//start the ball movement
function startBall(){
	let direction = 1;
	topPositionOfBall = startTopPositionOfBall;
	leftPositionOfBall = startLeftPositionOfBall;

	// 50% chance of starting in either direction (right ot left)
	if(Math.random() < 0.5){
		direction = 1;
	}else{
		direction = -1;
	}
	topSpeedOfBall = Math.random() * 2 + 3; //3-4.999
	leftSpeedOfBall = direction * (Math.random() * 2 + 3);


}//startBall

//update locations of paddles and ball
function show(){

	this.speed = 1;

let score1 = document.getElementById("player1");
let score2 = document.getElementById("player2");

	//update position of elements 
	positionOfPaddle1 += speedOfPaddle1;
	positionOfPaddle2 += speedOfPaddle2;
	topPositionOfBall += topSpeedOfBall;
	leftPositionOfBall += leftSpeedOfBall;
	
	//stop paddle from leaving top of gameboard
	if(positionOfPaddle1 <= 0){
		positionOfPaddle1 = 0;
	}

	if(positionOfPaddle2 <= 0){
		positionOfPaddle2 = 0;
	}

	//stop paddle from leaving bottom of gameboard
	if (positionOfPaddle1 >= gameboardHeight - paddleHeight){
		positionOfPaddle1 = gameboardHeight - paddleHeight;
	}

	if (positionOfPaddle2 >= gameboardHeight - paddleHeight){
		positionOfPaddle2 = gameboardHeight - paddleHeight;
	}

	//if ball hits top or bottom of gameboard change direction
	if(topPositionOfBall <= 0 || topPositionOfBall >= gameboardHeight - ballHeight){
		topSpeedOfBall *= -1;
	} // if

	//ball on left edge of gameboard

	if(leftPositionOfBall <= paddleWidth){

		//if ball hits left paddle, change direction
		if(topPositionOfBall > positionOfPaddle1 && topPositionOfBall < positionOfPaddle1 + paddleHeight){
			bounce.play();
			leftSpeedOfBall *= -1;
			this.speed = 2;
		}else{
			buzz.play();
			startBall();
			changeScore(player2);
		}//else
	}//if

	//ball on right edge of gameboard
	if(leftPositionOfBall >= gameboardWidth - paddleWidth - ballHeight){
		//if ball hits right paddle, change direction
		if(topPositionOfBall > positionOfPaddle2 && topPositionOfBall < positionOfPaddle2 + paddleHeight){
			bounce.play();
			leftSpeedOfBall *= -1;
			this.speed = 2;

		}else{
			buzz.play();
			startBall();
			changeScore(player1);
		}//else
	}//if
	



	document.getElementById("paddle1").style.top = positionOfPaddle1 + "px";
	document.getElementById("paddle2").style.top = positionOfPaddle2 + "px";
	document.getElementById("ball").style.top = topPositionOfBall + "px";
	document.getElementById("ball").style.left = leftPositionOfBall + "px";

}//show


function changeScore(e){
	e.textContent = parseInt(e.textContent) + 1;
}//changeScore


//resume game play
function resumeGame(){
	if(!controlPlay){
		controlPlay = window.setInterval(show, 1000/60);
	}//if
}//resumeGame

//pause game play
function pauseGame(){
	window.clearInterval(controlPlay);
	controlPlay = false;
}//pauseGame

//start game play
function startGame(){

	//resets scores, ball and paddle locations
	score1 = 0;
	score2 = 0;
	positionOfPaddle1 = startPositionOfPaddle1;
	positionOfPaddle2 = startPositionOfPaddle2;

	startBall();

	if(!controlPlay){
		controlPlay = window.setInterval(show, 1000/60);
	}//if
}//startGame

// stop game play
function stopGame(){
	window.clearInterval(controlPlay);
	controlPlay = false;

	//show lightbox with score
	let message1 = "Tie Game";
	let message2 = "Close to continue.";

	if(score2 > score1){
		message1 = "Player 2 wins with " + score2 + " points!";
		message2 = "Player 1 had " + score1 + " points!";
	}else if (score1 > score2){
		message1 = "Player 1 wins with " + score1 + " points!";
		message2 = "Player 2 had " + score2 + " points!";
	}//else

	showLightBox(message1, message2);

}//stopGame

/****Lightbox Code****/

//check the visibility of ID
function changeVisibility(divID){
	var element = document.getElementById(divID);

	//if element exists, it is considered true
	if(element){
		element.className = (element.className == 'hidden')? 'unhidden' : 'hidden';
	} //if
}// changeVisibility

//display message in lightbox

function showLightBox(message, message2){

	//set messages
	document.getElementById("message").innerHTML = message;
	document.getElementById("message2").innerHTML = message2;

	//show lightbox

	changeVisibility("lightbox");
	changeVisibility("boundaryMessage");
}//show lightbox

//close lightbox
function continueGame(){
	changeVisibility("lightbox");
	changeVisibility("boundaryMessage");

}// continueGame

/**** end of lightbox code ****/




