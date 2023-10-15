var body = document.body;
var timeText = document.getElementById("time");
var steve = document.getElementById("steve");
var enemy = document.createElement("div");  

var time = 0;
var isJumping = false;
var isAttacking = false;
var speedAttack = 3;

steve.style.border = "1px solid black";
enemy.style.border = "1px solid black";


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
    enemy.style.height = "165px";
    enemy.style.width = "43px";
    enemy.style.background = "url(img/zombie.png) no-repeat";
    enemy.style.position = "absolute";
    enemy.style.left = "97%";
    enemy.style.bottom = "21%";
    body.appendChild(enemy);
    if (!isAttacking){
        void steve.offsetWidth; 
        isAttacking = true;
        enemy.style.animation = "attack " + speedAttack + "s linear";
        setTimeout(function(){
            isAttacking = false;
            enemy.remove();
            enemyAttack();
        }, speedAttack * 1000);
    }
}

function Colliding(){
    var steveRect = steve.getBoundingClientRect();
    var enemyRect = enemy.getBoundingClientRect();
    return(
        steveRect.left < enemyRect.right &&
        steveRect.right > enemyRect.left &&
        steveRect.top < enemyRect.bottom &&
        steveRect.bottom > enemyRect.top 
    )
}

function updateTime(){
    timeText.textContent = time;

    if (time >= 20){
        body.style.background = "url(img/sunset.jpg) no-repeat";
        body.style.backgroundSize= "cover";
    }
     
    setTimeout(function(){
        time += 1; 
        updateTime();
    }, 1000);
}

setInterval(function () {
    if (Colliding()) {
        alert("Game Over");
    }
}, 16);

updateTime();
enemyAttack();