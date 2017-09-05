/**
 *  Tic Tac Toe styles
 *
 *  Author  : Maurizio Aru
 *  Created : 2017-07-13
 */

var gameStatus;
var grid = [
	[ ' ', ' ', ' '],
	[ ' ', ' ', ' '],
	[ ' ', ' ', ' ']
];

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

function moveAI(){
	for (var i=0; i<3; i++) {
		for (var j=0; j<3; j++) {
			if (grid[i][j] === ' ') {
				return {
					i: i,
					j: j
				}
			}
		}
	}
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
	const PLAYER_TOKEN = gameStatus.getPlayer1().getSign();
	const COMPUTER_TOKEN = gameStatus.getPlayer2().getSign();
	
   console.log("Square Clicked");
	
	var currentSquare = $(this);
	var currentTurn = gameStatus.getCurrentTurn();
	var i = currentSquare.data('i');
	var j = currentSquare.data('j');
	
	console.log('count: ' + gameStatus.turnCount);
	if ( grid[i][j] !== ' ') {
		// nothing to do
		console.log('Square full. Nothing to do');
		return;
	}
	else {
		grid[i][j] = currentTurn;
		updateBoard();
		console.log('Grid: ' + grid);
		
		const status = IsGameOver();
		if ( (status === PLAYER_TOKEN) || (status === COMPUTER_TOKEN) ){
			console.log('Win player ' + status);
			showMessage("Congrats, Player " + status + " has won!");
			gameStatus.playerWin();
			resetBoard();
		}
		else if (status == null){
			console.log('Tie game!');
			showMessage("Tie Game!");
			resetBoard();
		}
		else {
			console.log('Game is not over. Play another turn');
			gameStatus.changeTurn();
			computerTurn();
		}
	}
}

// play computer turn
function computerTurn(){
	console.log('Computer turn');
	const PLAYER_TOKEN = gameStatus.getPlayer1().getSign();
	const COMPUTER_TOKEN = gameStatus.getPlayer2().getSign();
	const cell = moveAI();
	
	grid[cell.i][cell.j] = COMPUTER_TOKEN;
	updateBoard();
	console.log('Grid: ' + grid);
	
	const status = IsGameOver();
	if ( (status === PLAYER_TOKEN) || (status === COMPUTER_TOKEN) ){
		console.log('Win player ' + status);
		showMessage("Congrats, Player " + status + " has won!");
		gameStatus.playerWin();
		resetBoard();
	}
	else if (status == null){
		console.log('Tie game!');
		showMessage("Tie Game!");
		resetBoard();
	}
	else {
		console.log('Game is not over. Play another turn');
		gameStatus.changeTurn();
	}
}

function IsGameOver(){
	var currentTurn = gameStatus.getPlayer1().getSign();

	console.log('IsGameOver?');
	// check horizontal
	for (var i=0; i<3; i++){
		if ( (grid[i][0] !== ' ') &&
				(grid[i][0] === grid[i][1]) &&
				(grid[i][0] === grid[i][2]) ){
					return grid[i][0];
		}
	}
	
	// check vertical
	for (var i=0; i<3; i++){
		if ( (grid[0][i] !== ' ') &&
					(grid[0][i] === grid[1][i]) &&
					(grid[0][i] === grid[2][i]) ){
						return grid[0][i];
		}
	}

	// check diagonal upper left - bottom right
	if ( (grid[0][0] !== ' ') &&
				(grid[0][i] === grid[1][1]) &&
				(grid[0][0] === grid[2][2]) ){
					return grid[0][0];
	}

	// check diagonal bottom left - upper right
	if ( (grid[2][0] !== ' ') &&
				(grid[2][0] === grid[1][1]) &&
				(grid[2][0] === grid[0][2]) ){
					return grid[2][0];
	}
	
	// check if there is empty cells
	for (var i=0; i<3; i++){
		for (var j=0; j<3; j++){
			if (grid[i][j] === ' '){
				return false;
			}
		}
	}
	
	return null; // tie game
}

function updateBoard(){
	
	const PLAYER_TOKEN = gameStatus.getPlayer1().getSign();
	const COMPUTER_TOKEN = gameStatus.getPlayer2().getSign();
	
	console.log("Update board");
	$('#player1_score').text(gameStatus.getPlayer1().getScore());
	$('#player2_score').text(gameStatus.getPlayer2().getScore());
	$('#player_turn').removeClass('fa fa-times fa-circle-o');
	$('#player_turn').addClass( (gameStatus.getCurrentTurn() === 'x' ? 'fa fa-times' : 'fa fa-circle-o') );
  
  for (var i=0; i<3; i++){
	  for (var j=0; j<3; j++){
			if (grid[i][j] !== ' '){
				console.log('grid['+ i +']['+ j + ']: ' + grid[i][j]);
				$('.square[data-i=' + i + '][data-j=' + j + ']').addClass( (grid[i][j] === 'x' ? 'fa fa-times' : 'fa fa-circle-o') );
			}
	  }
  }
}

function resetBoard(){
	console.log("Reset Game Board");
	
	// reset grid
	for (var i=0; i<3; i++){
		for (var j=0; j<3; j++){
			grid[i][j] = ' ';
		}
	}
	
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