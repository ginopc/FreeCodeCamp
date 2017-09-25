/**
 * Script who manage operations
 * Author : Maurizio Aru
 * Date   : 2017-09-25
 */

$(document).ready(function(){
  
  /** define variables **/
  // stores the inputs from the user to calculate later
  var inputs = [''];
  //String to store current inputs
  var totalString;
  // operators array for validation without the .
  var operators1 = ['+', '-', '/', '*'];
  // operators array for validation with the .
  var operators2 = ['.'];
  // numbers
  var nums = [0,1,2,3,4,5,6,7,8,9];
  
  /** define functions **/
  function getValue(input){
    console.log('getValue(' + input + ') called');
    
    // eliminate duplicated '.' chars
    if (!operators1.includes(inputs[inputs.length-1]) && operators1.includes(input)){
      console.log('Input is an operator');
      inputs.push(input);
    }
    // if it is a number
    else if (inputs.length===1 && operators1.includes(input)===false){
      console.log('Input is a number');
      inputs.push(input);
    }
    // if last char it isn't an operator push to the inputs
    else if (operators1.includes(inputs[inputs.length-1]===false)){
      console.log('Input is another operator. Nothing is duplicated');
      inputs.push(input);
    }
    // if it is a number
    else if (nums.includes(Number(input))){
      console.log('Input is a number');
      inputs.push(input);
    }
  }
  
  function update(){
    console.log('update() called');
    totalString = inputs.join('');
    $('#history').html(totalString);
  }
  
  function getTotal(){
    console.log('getTotal() called');
    totalString = inputs.join('');
    $('#result').html(eval(totalString));
    //$('#result').html('0ll38135');
  }
  
  function deleteAll(){
    console.log("deleteAll() called");
    inputs = ['0'];
    $('#result').html(inputs.join(''));
  }
  
  function backOne(){
    console.log("backOne() called");
    if (inputs.length > 1)
      inputs.pop();
    else
      inputs = ['0'];
  }
  
  // set copyright year
  $('#copyYear').html(new Date().getFullYear());
  
  // buttons manager
  $('a').on('click', function(){
    if (this.id === 'deleteAll'){
      deleteAll();
      update();
    }
    else if (this.id === 'backOne') {
      backOne();
      update();
    }
    else if (this.id === 'total') {
      getTotal();
      update();
    }
    else {
      // filter double input operator
      if (inputs[inputs.length - 1].indexOf('+', '-', '/', '*', '.') === -1){
        console.log('previous number inserted');
        getValue(this.id);
      }
      else {
        console.log('previous operator inserted');
        getValue(this.id);
      }
      update();
    }
  });
});