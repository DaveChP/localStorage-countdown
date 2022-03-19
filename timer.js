let total_seconds = 0;
let minutes = 0;
let seconds = 0;
let displaySeconds = "";
let displayMinutes = "";


const init = function () {
console.log("app launched");

  if(localStorage.getItem("total_seconds")){
    total_seconds = parseInt(localStorage.getItem("total_seconds"));
    if (total_seconds > 0) {total_seconds++}
    triggerTimer();
  } 
  else {
    total_seconds = 15;
    let button = document.createElement('button');
    button.setAttribute('id', 'start');
    button.innerHTML='start';
    document.body.appendChild(button);
  } // end if/else total_seconds set;

} // end init function;


window.onload = init();

document.addEventListener('click', function(event) {
    if(event.target.id=='start'){
     // remove button once clicked;
     document.getElementsByTagName('button')[0].remove();
     triggerTimer();
    } // end if;

    if(event.target.id=='reset'){
      localStorage.clear();
    } // end if;
    
}); // end event listener;


function triggerTimer() {
  minutes = parseInt(total_seconds/60);
  seconds = parseInt(total_seconds%60);
  formatTime();
  document.getElementById("quiz-time-left").innerHTML = `Time left: ${displayMinutes} minutes, ${displaySeconds} seconds`;

  if(total_seconds == 0){
    setTimeout(done(),1);
    } else {
      total_seconds = total_seconds -1 ;
      minutes = parseInt(total_seconds/60);
      seconds = parseInt(total_seconds%60);
      localStorage.setItem("total_seconds",total_seconds)
      setTimeout(triggerTimer,1000);
    } // end if/else;
 
} // end triggerTimer function;

function formatTime(){
  displaySeconds = (seconds < 10) ? "0"+ seconds : "" + seconds;
  displayMinutes = (minutes < 10) ? "0"+ minutes : "" + minutes;
} // end formatTime function;

function done() {
  const newDiv = document.createElement('div');
  newDiv.innerHTML = "time up!";
  document.body.appendChild(newDiv);
  const button = document.createElement('button')
  button.innerHTML = "clear storage";
  button.setAttribute('id', 'reset');
  document.body.appendChild(button);
} // end done function;