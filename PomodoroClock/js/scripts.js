$(document).ready(function(){
  
  // default variables
  var breakTime = 5;
  var sessionTime = 25;
  var csTime = 25;
  
  var init = function() {
    $('#resetAll').hide();
    $('#breakTime').html(breakTime);
    $('#sessionTime').html(sessionTime);
  }
  
  var update = function(){
    $('#breakTime').html(breakTime);
    $('#sessionTime').html(sessionTime);
  }
  
  /* main */
  init();

  
  $('#sub5_break').click(function(){
    if (breakTime > 0)
      breakTime -= 1;
    
    $('#breakTime').html(breakTime);
  });
  
  $('#add5_break').click(function(){
    breakTime += 1;
    $('#breakTime').html(breakTime);
  });
  
  $('#sub5_session').click( function(){
    if (sessionTime > 0)
      sessionTime -= 1;
    
    $('#sessionTime').html(sessionTime);
  });
  
  $('#add5_session').click(function(){
    sessionTime += 1;
    $('#sessionTime').html(sessionTime);
  });
  
  
  $('#startCount').click(function(){
    var sCounter;
    var bCounter;
    var count;

    count = sessionTime;
    if (count > 0){
      $('#counterType').html("Session Time");
      $('#resetAll').show();
      // $('#startCount, #sub5_break, #add5_break, #sub5_session, #add5_session').prop('disabled', true);
      $('#startCount, #breakCtrl, #sessionCtrl').hide();
      $('#counter').html(count);
    }
    // start session count
    sCounter = setInterval(sessionTimer, 1000);

    /* implements session timer */ 
    function sessionTimer(){
      count -= 1;
      $('#counter').html(count);

      if (count === 0){
        // stop session count
        clearInterval(sCounter);
        
        // start break count
        count = breakTime;
        $('#counterType').html('Break Time');
        $('#counter').html(count);
        bCounter = setInterval(breakTimer, 1000);
      }

    }
    
    /* implements break timer */
    function breakTimer(){
      count -= 1;
      $('#counter').html(count);
      
      if (count === 0) {
        // stop break count
        clearInterval(bCounter);
  
        // start session count
        count = sessionTime;
        $('#counter').html(count);
        $('#counterType').html('Session Time');
        sCounter = setInterval(sessionTimer, 1000);
      }
    }
    
    $('#resetAll').click(function(){
      clearInterval(sCounter);
      clearInterval(bCounter);
      $('#counterType').html('Counter OFF');
      $('#counter').html('-');
      $('#resetAll').hide();
      // $('#startCount, #sub5_break, #add5_break, #sub5_session, #add5_session').prop('disabled', false);
      $('#startCount, #breakCtrl, #sessionCtrl').show();
    });
    
  });
  
});

