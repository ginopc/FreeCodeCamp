/* =========================
 *
 * Simone Game logic
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

    sequence: [],
    step: 0,
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
    colors: [RED,BLUE,YELLOW,GREEN],
    nextSequence: function() {
        var nextColor = this.colors[Math.floor(Math.random() * this.colors.length)];
        console.log("the random color is:", nextColor);
        this.sequence.push(nextColor);
        this.playSequence();
        // this.step = 0; //reset step count to start new check
    },
    playSequence: function(){        
        console.log("Play the sequence:", this.sequence);
        var i = 0;
        simon.tHnd = setInterval(function(){
            var color = simon.sequence[i];
            console.log('Lighting '+ color + '...');
            
            // light button
            simon.enlight(color);

            i++;
            if (i === simon.sequence.length) clearInterval(simon.tHnd);
        }, 700);

    },
    enlight: function(color){
        
        //debugger
        switch(color){
            case RED:
                $('#RED').addClass('button-red-filled');
                break;

            case BLUE:
                $('#BLUE').addClass('button-blue-filled');
                break;

            case YELLOW:
                $('#YELLOW').addClass('button-yellow-filled');
                break;

            case GREEN:
                $('#GREEN').addClass('button-green-filled');
                break;
        }

        setTimeout(function(){
                $('#RED').removeClass('button-red-filled');
                $('#BLUE').removeClass('button-blue-filled');
                $('#YELLOW').removeClass('button-yellow-filled');
                $('#GREEN').removeClass('button-green-filled');
        }, 500);
    }
};

$(document).ready(function(){
    console.log("App ready!");

    $('.simon-button').click(function(){
        
        var color = $(this).attr('id');
        console.log('New color:', color);
        simon.sendColor(color);
    });

    $('#startBtn').click(function(){
        simon.nextSequence();
        $('#startBtn').enabled = false;
    });
});


