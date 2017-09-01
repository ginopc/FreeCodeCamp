/**
 *  Tic Tac Toe styles
 *
 *  Author  : Maurizio Aru
 *  Created : 2017-07-13
 */

var gameStatus;

$(document).ready(function(){
	
	init();
	showSelectSymbol();
});

/* Init application */
function init() {
	console.log('Init application...');
	gameStatus = new Status(new Player('x', false), new Player('0', true));
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
		
		gameStatus.getPlayer1().setSign(symbol);
		gameStatus.getPlayer2().setSign( ( symbol === 'x' ? '0' : 'x') );
		gameStatus.setCurrentTurn(symbol);
		
		$('#player1_symbol').removeClass("fa fa-times fa-circle-o");
		$('#player1_symbol').addClass( (gameStatus.getPlayer1().getSign() === 'x' ? "fa fa-times" : "fa fa-circle-o") );
		$('#player2_symbol').removeClass("fa fa-times fa-circle-o");
		$('#player2_symbol').addClass( (gameStatus.getPlayer2().getSign() === 'x' ? "fa fa-times" : "fa fa-circle-o") );
		
		// start game
		playGame();
	});
}

/* show game board screen and start the game */
function playGame(){
	console.log("Game started");
	$("#symbolSelect").hide();
	$("#gameboard").show();
	$(".square").on('click', OnSquareClick);
	updateBoard()
}

function updateBoard(){
  console.log("Update board");
  $('#player1_score').text(gameStatus.getPlayer1().getScore());
  $('#player2_score').text(gameStatus.getPlayer2().getScore());
  $('#player_turn').removeClass('fa fa-times fa-circle-o');
  $('#player_turn').addClass( (gameStatus.getCurrentTurn() === 'x' ? 'fa fa-times' : 'fa fa-circle-o') );
}

function showMessage(message){
	console.log("Show Message '" + message + "'");
	$("#gameboard").show();
	$("#gamepad").hide();
	$("#messagebox").show();
	$("#message").html(message);
	$("#messageOK").on('click', function(){
		$("#messagebox").hide();
		$("#gamepad").show();
	});
}

/* Square click event listener */
function OnSquareClick(){
   console.log("Square Clicked");
	
	var currentSquare = $(this);
	var currentTurn = gameStatus.getCurrentTurn();
	
	console.log('count: ' + gameStatus.turnCount);
	if ( currentSquare.hasClass('fa-times') || currentSquare.hasClass('fa-circle-o') ) {
		// nothing to do
		console.log('Square full. Nothing to do');
		return;
	}
	else {
		if (currentTurn === 'x') {
			currentSquare.addClass('fa fa-times');
			if (checkIfPlayerWon('fa-times')){
				showMessage("Congrats, Player " + currentTurn + " has won!");
				gameStatus.playerWin();
				resetBoard();
			}
			else {
				console.log('Player '+ currentTurn +' has\'nt won. Game continue');
				console.log("player1("+ gameStatus.getPlayer1().getSign() +"): "+ gameStatus.getPlayer1().getScore() + "");
				gameStatus.changeTurn();
			}
		}
		else {
			currentSquare.addClass('fa fa-circle-o');
			if (checkIfPlayerWon('fa-circle-o')){
				showMessage("Congrats, Player " + currentTurn + " has won!");
				// showMessage("Congrats, Player <i class=\"" + (currentTurn === 'x' ? "fa fa-times" : "fa fa-circle-o") + "\"></i> has won!");
				gameStatus.playerWin();
				resetBoard();
			}
			else {
				console.log('Player '+ currentTurn +' has\'nt won. Game continue');
				console.log("player2("+ gameStatus.getPlayer2().getSign() +"): "+ gameStatus.getPlayer2().getScore() + "");
				gameStatus.changeTurn();
			}
		}
		if (gameStatus.getCount() >= 9){ // = 9 turns
			showMessage("Play ended. Restart New Play");
			gameStatus.restartGame();
			resetBoard();
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

function resetBoard(){
	console.log("Reset Game Board");
	$('.square').removeClass('fa fa-times');
	$('.square').removeClass('fa fa-circle-o');
	console.log(gameStatus.toString());
	$('#player1_score').text(gameStatus.getPlayer1().getScore());
	$('#player2_score').text(gameStatus.getPlayer2().getScore());
}



/* Player class */
function Player(sign, isComputer){
	
	this.isComputer = isComputer;
	this.score = 0;
	this.sign = sign;
	
	this.getSign = function(){
		return this.sign;
	}

	this.setSign = function(newSign){
      // filter only valid signs
      if ( (sign === 'x') || (this.sign === '0') ) {
        console.log('Player sign changed from \'' + this.sign + '\' to ' + newSign);
        this.sign = newSign;
      }
	}
	
	this.win = function(){
		this.score = parseInt(this.score) + 1;
	}
	
	this.getScore = function(){
		return this.score;
	}
	
	this.toString = function(){
      var result = {};

      result.sign = this.sign;
      result.score = this.score;
      result.isComputer = this.isComputer;

      console.log("Person: " + JSON.stringify(result));
      return JSON.stringify(result);
	}
}

/* Game status class */
function Status(Ply1, Ply2){
	
	this.player1 = Ply1;
	this.player2 = Ply2;
	this.gameInPlay = false;
	this.turn = this.player1.getSign;
	this.turnCount = 0;
	
	/* check if game is playing */
	this.isPlaying = function() {
		return this.gameInPlay;
	}
	
	this.getPlayer1 = function(){
		return this.player1;
	}
	
	this.getPlayer2 = function(){
		return this.player2;
	}
	
	this.getCurrentTurn = function(){
		return this.turn;
	}
	
	this.setCurrentTurn = function(value) {
		this.turn = value;
	}
	
	this.playerWin = function(){
		if (this.player1.getSign() === this.turn){
			this.player1.win()
			this.turnCount = 0;
		}
		else if (this.player2.getSign() === this.turn) {
			this.player2.win();
			this.turnCount = 0;
		}
		else {
			console.log("ERROR: who is winner?");
		}
	}
	
	this.changeTurn = function(){
		this.turn = (this.turn == 'x' ? '0' : 'x');
		this.turnCount += 1;
		return this.turn;
	}
	
	this.getCount = function(){
		return this.turnCount;
	}
	
	this.restartGame = function(){
		this.turnCount = 0;
		this.turn = this.player1.getSign();
	}
	
	this.toString = function(){
      var result = {};

      result.player1 = this.player1.toString();
      result.player2 = this.player2.toString();

      console.log("Game Status: " + JSON.stringify(result));
      return JSON.stringify(result);
	}
}