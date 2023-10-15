var body = document.getElementById("body");
var timeText = document.getElementById("time");

var time = 0;

function updateTime(){
    timeText.textContent = time;

    if (time >= 20){
        body.style.background = "url(img/sunset.jpg) no-repeat";
        body.style.backgroundSize= "cover";
    }
     
    setTimeout(function(){
        time += 1; 
        console.log(time);
        updateTime();
    }, 1000);
}

updateTime();