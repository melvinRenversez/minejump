var body = document.body;
var timeText = document.getElementById("time");
var steve = document.getElementById("steve");

var time = 0;
var isJumping = false;

document.addEventListener("keydown", function(event){
    if (event.key === " " && !isJumping){
        isJumping = true;
        steve.style.animation = "none";
        void steve.offsetWidth; 
        steve.style.animation = "jump 1s linear";
        setTimeout(function(){
            isJumping = false;
        }, 1000);
    }
})

function enemyAttack(){
    var enemy = document.createElement("div");
    enemy.style.height = "170px";
    enemy.style.width = "100px";
    enemy.style.background = "url(img/zombie.png) no-repeat";
    body.appendChild(enemy);
}

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
enemyAttack();