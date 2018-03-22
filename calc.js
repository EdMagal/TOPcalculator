$(document).ready(function(){ 
var subtotal = 0; // tracks the calculations on the background
var currOperator = "add"; // tracks the operations
var thread = [0]; // Displays on the main screen
var currThread = []; //Displays on the top screen
var comma = false; //tracks if a comma has been inserted

  
// When a number is pressed
$(".number").click(function(){
  if (thread.length < 17){    
    thread.push(parseFloat($(this).val()));
    if (thread.length==2 && thread[0]==0){
      thread.shift();
    }
  };
  $("#total").text(thread.join(""));  
});

// When Plus, Minus, Multiply or Divide is pressed:
$(".operator").click(function(){
  // Checks if the last key was an operator and updates it  
  if (parseFloat(thread.join("")) == 0) {
    thread = [0];
    currThread.pop();
    currThread.push($(this).text());
    currOperator = $(this).val();
    $("#thread").text(currThread.join(""));
    return 0;
  }
  
  // Performs the operation based on the last current Operator
  currThread.push(parseFloat(thread.join(""))); // push value
  currThread.push($(this).text()); // push operator
  
  switch(currOperator){
    case("add"):
      subtotal += parseFloat(thread.join(""));
      break;
    case("subt"):
      subtotal -= parseFloat(thread.join(""));
      break;
    case("mult"):
      subtotal *= parseFloat(thread.join(""));
      break;
    case("divide"):
      subtotal /= parseFloat(thread.join(""));
      break;
  }
  comma = false;
  currOperator = $(this).val();
  thread = [0];
  $("#total").text(subtotal);
  $("#thread").text(currThread.join(""));
});

$("#dot").click(function(){
  if (!comma) {
    comma = true;
    thread.push(".");
    $("#total").text(thread.join(""));  
  } else {
   document.getElementById('audio').play()
  }
});

$("#CE").click(function(){
  thread = [0];
  comma = false;
  $("#total").text("0");
});

$("#C").click(function(){
  subtotal = 0;
  thread = [0];
  currOperator = "add";
  currThread = [];
  comma = false;
  $("#total").text(0);
  $("#thread").text("");
});
  
$("#posNeg").click(function(){
    if (parseFloat(thread.join(""))== 0) return 0;
    if (thread[0]=="-"){
      thread.shift();
      $("#total").text(thread.join(""));       
    } else {
      thread.unshift("-");
      $("#total").text(thread.join("")); 
    }
  });
  
$("#backSpace").click(function(){
    if (thread.length > 1){
      thread.pop();
      $("#total").text(thread.join(""));
    } else {
      thread = [0];
      $("#total").text(thread.join(""));
    }
});
  
  $("#equal").click(function(){
    switch(currOperator){
      case("add"):
        subtotal += parseFloat(thread.join(""));
        break;
      case("subt"):
        subtotal -= parseFloat(thread.join(""));
        break;
      case("mult"):
        subtotal *= parseFloat(thread.join(""));
        break;
      case("divide"):
        subtotal /= parseFloat(thread.join(""));
        break;
    }
    if (subtotal - Math.round(subtotal) == 0) { comma = false; }
    currOperator = "add";
    thread = [subtotal];
    $("#total").text(subtotal);
    subtotal = 0;
    currThread = [];
    $("#thread").text("");
  });
  
});
