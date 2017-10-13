/* =========================
 *
 * Simon Game logic
 *
 * author  : Maurizio Aru
 * created : 2017-09-27 
 * =========================
 */
const RED = "RED";
const BLUE = "BLUE";
const YELLOW = "YELLOW";
const GREEN = "GREEN";

/**********************/
/*  Game logic class  */
/**********************/
var simon = { 

	/* class properties */
    sequence: [],
    step: 0,
    colors: [RED,BLUE,YELLOW,GREEN],
	 
	 /* class methods */
    sendColor: function(color){
        if (!this.sequence.length){
            // start the game
            this.nextSequence();
        }
        else {
            if (color === this.sequence[this.step]){
                // got to next step
                if (this.step < this.sequence.length - 1){
                    this.step++;
                }
                else {
                    console.log('Sequence complete!');
                    this.step = 0;
                    this.nextSequence();
                }
            }
            else {
                // !lose condition
                alert('WRONG!!');
                this.step = 0;
                this.nextSequence();
            }
        }
        console.log("NEW COLOR:", color);
    },
    nextSequence: function() {
        var nextColor = this.colors[Math.floor(Math.random() * this.colors.length)];
        console.log("the random color is:", nextColor);
        this.sequence.push(nextColor);
		  $('.steps').text(this.sequence.length);
        console.log("the sequence:", this.sequence);
		  this.playSequence();
    },
	 playSequence: function(){
		 console.log("Play the sequence:", this.sequence);
		 var i = 0;
		 simon.tHnd = setInterval(function(){
			var color = simon.sequence[i];
			console.log("Lighting", color, "...");
			
			// light button
			simon.lightButton(color);
			
		  // play button sound
		  var sound = new Audio();
		  sound.src = $('#sound-' + color.substring(0,1) ).attr('src');
		  sound.play();
		  
			i++;
			if (i === simon.sequence.length) clearInterval(simon.tHnd);
		 }, 700);
	 },
	 lightButton: function(color){
		
		// light button
		$('#'+ color).addClass('button-'+ color + '-filled');
		
		// dark button after 1 sec
		setTimeout(function(){
			for(var i=0; i<simon.colors.length; i++){
				$('.simon-button').removeClass('button-'+ simon.colors[i] +'-filled');
			}
		}, 500);
	 },
	 reset: function(){
		 console.log('Resetting game...');
		this.step = 0;
		this.sequence = [];
		$('.steps').text(this.sequence.length);
	 }
};

$(document).ready(function(){
    console.log("App ready!");

    $('.simon-button').click(function(){
        
        var color = $(this).attr('id');
        console.log('New color:', color);
        simon.sendColor(color);
		  simon.lightButton(color);
		  
		  // play button sound
		  var sound = new Audio();
		  sound.src = $('#sound-' + $(this).text()).attr('src');
		  sound.play();
    });

    $('#startBtn').click(function(){
		console.log('Game start');
      simon.nextSequence();
      $('#startBtn').enabled = false;
    });
	 
	 $('#resetBtn').click(function(){
		console.log('Game reset');
		simon.reset();
	 });
});


