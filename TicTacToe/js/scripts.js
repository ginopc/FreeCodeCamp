/**
 *  Tic Tac Toe styles
 *
 *  Author  : Maurizio Aru
 *  Created : 2017-07-13
 */

var player1, player2, gameStatus;

$(document).ready(function(){
	
	init();
	showSelectSymbol();
});

/* Init application */
function init() {
	console.log('Init application...');
	player1 = new Player('x', false);
	player2 = new Player('0', true);
	gameStatus = new State(player1, player2);
	console.log('App initialized!');
}

function showSelectSymbol(){
	var symbol = "x";
	console.log("Show Select Symbol Screen");
	$("#symbolSelect").show();
	$("#gameboard").hide();
	$(".symbol").on('click', function(){
		
		symbol = ($(this).hasClass("fa-times") ? 'x' : '0');
		console.log("Selected " + symbol + " symbol");
		player1.setSign(symbol);
		player2.setSign( ( symbol === 'x' ? '0' : 'x') );
		$('#player1_symbol').removeClass("fa fa-times fa-circle-o");
		$('#player1_symbol').addClass( (player1.getSign() === 'x' ? "fa fa-times" : "fa fa-circle-o") );
		$('#player2_symbol').removeClass("fa fa-times fa-circle-o");
		$('#player2_symbol').addClass( (player2.getSign() === 'x' ? "fa fa-times" : "fa fa-circle-o") );
		playGame();
	});
}

/* show game board screen and start the game */
function playGame(){
	console.log("Start Game");
	$("#symbolSelect").hide();
	$("#gameboard").show();
	$(".square").on('click', OnSquareClick);
}

function showMessage(message){
	console.log("Show Message '" + message + "'");
	$("#gameboard").show();
	$("#gamepad").hide();
	$("#messagebox").show();
	$("#message").text(message);
	$("#messageOK").on('click', function(){
		$("#messagebox").hide();
		$("#gamepad").show();
	});
}

function OnSquareClick(){
   console.log("Square Clicked");
	
	var currentSquare = $(this);
	var currentTurn = gameStatus.getCurrentTurn();
	
	if ( currentSquare.hasClass('fa-times') || currentSquare.hasClass('fa-circle-o') ) {
		return;
	}
	else {
		if (currentTurn === 'x') {
			currentSquare.addClass('fa fa-times');
			if (checkIfPlayerWon('fa-times')){
				showMessage("Congrats, Player " + currentTurn + " has won!");
				// showMessage("Congrats, Player <i class=\"" + (currentTurn === 'x' ? "fa fa-times" : "fa fa-circle-o") + "\"></i> has won!");
				gameStatus.playerWin();
				boardReset();
			}
			else {
				console.log('Player '+ currentTurn +' has\'nt won. Game continue');
				console.log("player1("+ player1.getSign() +"): "+ player1.getScore() + "");
				gameStatus.changeTurn();
			}
		}
		else {
			currentSquare.addClass('fa fa-circle-o');
			if (checkIfPlayerWon('fa-circle-o')){
				showMessage("Congrats, Player " + currentTurn + " has won!");
				// showMessage("Congrats, Player <i class=\"" + (currentTurn === 'x' ? "fa fa-times" : "fa fa-circle-o") + "\"></i> has won!");
				gameStatus.playerWin();
				boardReset();
			}
			else {
				console.log('Player '+ currentTurn +' has\'nt won. Game continue');
				console.log("player1("+ player1.getSign() +"): "+ player1.getScore() + "");
				gameStatus.changeTurn();
			}
		}
	}
}
   
function checkIfPlayerWon(symbol) {
	
	// horizonal line
	if ( $('#sq1').hasClass(symbol) && $('#sq2').hasClass(symbol) && $('#sq3').hasClass(symbol) ) {
		return true;
	}
	else if ( $('#sq4').hasClass(symbol) && $('#sq5').hasClass(symbol) && $('#sq6').hasClass(symbol) ) {
		return true;
	}
	else if ( $('#sq7').hasClass(symbol) && $('#sq8').hasClass(symbol) && $('#sq9').hasClass(symbol) ) {
		return true;
	}
	// vertical line
	else if ( $('#sq1').hasClass(symbol) && $('#sq4').hasClass(symbol) && $('#sq7').hasClass(symbol) ) {
		return true;
	}
	else if ( $('#sq2').hasClass(symbol) && $('#sq5').hasClass(symbol) && $('#sq8').hasClass(symbol) ) {
		return true;
	}
	else if ( $('#sq3').hasClass(symbol) && $('#sq6').hasClass(symbol) && $('#sq9').hasClass(symbol) ) {
		return true;
	}
	// oblique line
	else if ( $('#sq1').hasClass(symbol) && $('#sq5').hasClass(symbol) && $('#sq9').hasClass(symbol) ) {
		return true;
	}
	else if ( $('#sq3').hasClass(symbol) && $('#sq5').hasClass(symbol) && $('#sq7').hasClass(symbol) ) {
		return true;
	}
	else {
		return false;
	}
}

function boardReset(){
	console.log("Reset Game Board");
	$('.square').removeClass('fa fa-times');
	$('.square').removeClass('fa fa-circle-o');
	console.log(gameStatus.toString());
	$('#player1_score').text(player1.getScore());
	$('#player2_score').text(player2.getScore());
}



/* classe che rappresenta il giocatore */ 
function Player(sign, isComputer){
	
	this.isComputer = isComputer;
	this.score = 0;
	this.sign = sign;
	
	this.setSign = function(newSign){
		this.sign = newSign;
	}
	
	this.getSign = function(){
		return this.sign;
	}
	
	this.win = function(){
		this.score = parseInt(this.score) + 1;
	}
	
	this.getScore = function(){
		return this.score;
	}
	
	this.toString = function(){
		var result = "{ " + 
			"sign: '" + this.sign + "', " + 
			"score: " + this.score + ", " +
			"isComputer: " + this.isComputer +
			"}";
		console.log("Person: " + result);
		return result;
	}
}

/* classe che rappresenta lo stato attuale del gioco */
function State(Player1, Player2){
	
	this.player1 = Player1;
	this.player2 = Player2;
	this.gameInPlay = false;
	this.turn = player1.getSign;
	
	/* check if game is playing */
	function isPlaying() {
		return this.gameInPlay;
	}
	
	this.getCurrentTurn = function(){
		return this.turn;
	}
	
	this.changeTurn = function(){
		this.turn = (this.turn == 'x' ? '0' : 'x');
	}
	
	this.playerWin = function(){
		if (player1.getSign() === this.turn){
			player1.win()
		}
		else if (player2.getSign() === this.turn) {
			player2.win();
		}
		else {
			console.log("ERROR: who is winner?");
		}
	}
	
	this.toString = function(){
		var result;
		
		result = "{ "+
			"player1: " + player1.toString() + ", " + 
			"player2: " + player2.toString() +
			"}";
		console.log("Game Status: " + result);
		return result;
	}
}