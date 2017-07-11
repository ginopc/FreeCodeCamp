$(document).ready(function(){

   var player = 1;
   var player1Score = 0;
   var player2Score = 0;
   
   $('.square').on('click', function(){
      
      var currentSquare = $(this);
      
      if ( currentSquare.hasClass('fa-times') || currentSquare.hasClass('fa-circle-o') ) {
         // nothing to do, symbol there is
      }
      else {
         if (player === 1) {
            currentSquare.addClass('fa fa-times');
            if (checkIfPlayerWon('fa-times')){
               alert('Congrats, Player' + player + ' has won!');
               player1Score++;
               boardReset();
            }
            else {
               console.log('Player '+ player +' has\'nt won. Game continue');
               player = 2;
            }
         }
         else {
            currentSquare.addClass('fa fa-circle-o');
            if (checkIfPlayerWon('fa-circle-o')){
               alert('Congrats, Player' + player + ' has won!');
               player2Score++;
               boardReset();
            }
            else {
               console.log('Player '+ player +' has\'nt won. Game continue');
               player = 1;
            }
         }
      }
   });
   
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
      $('.square').removeClass('fa fa-times');
      $('.square').removeClass('fa fa-circle-o');
      $('#player1_score').text(player1Score);
      $('#player2_score').text(player2Score);
   }
});