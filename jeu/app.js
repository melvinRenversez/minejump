var body = document.body;
var timeText = document.getElementById("time");
var steve = document.getElementById("steve");
var enemy = document.createElement("div");
var gameOverArea = document.getElementById("gameOver");  
var scoreText = document.getElementById("score");

var time = 0;
var isJumping = false;
var isAttacking = false;
var isDead = false;
var boardUpdated = false;

var startSpeed = 3;
var speedAttack = 0;

var level = 1;
var levelMax = 10;


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
    if (event.key === "ArrowLeft"){
        localStorage.removeItem("score1");
        localStorage.removeItem("score2");
        localStorage.removeItem("score3");
        localStorage.removeItem("score4");
        localStorage.removeItem("score5");
    }
})

function enemyAttack(){
    if (isDead){
        return;
    }
    enemy.style.height = "165px";
    enemy.style.width = "43px";
    enemy.style.background = "url(../img/entity/zombie.png) no-repeat";
    enemy.style.position = "absolute";
    enemy.style.left = "97%";
    enemy.style.bottom = "21%";
    body.appendChild(enemy);

    if (!isAttacking){
        void steve.offsetWidth; 
        isAttacking = true;
        enemy.style.animation = "attack " + speedAttack + "s linear";
        setTimeout(function(){
            if (isDead){
                return;
            }
            isAttacking = false;
            enemy.remove();
            enemyAttack();
        }, speedAttack * 1000);
    }

    function checkCollision(){
        if (Colliding()) {
            enemy.style.left = enemy.getBoundingClientRect().left + "px";
            steve.style.animation = "none";
            enemy.style.animation = "none";
            isAttacking = false;
            isDead = true;
            steve.style.visibility = "hidden";
            gameOver();
            return;
        }
        requestAnimationFrame(checkCollision);
    }

    checkCollision();

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
    if (isDead){
        return;
    }
    timeText.textContent = time;
    if (time >= 200){
        level = 10
    }else if (time >= 180){
        level = 9
    }else if (time >= 160){
        level = 8
    }else if (time >= 140){
        level = 7
    }else if (time >= 120){
        level = 6
    }else if (time >= 100){
        level = 5
    }else if (time >= 80){
        level = 4
    }else if (time >= 60){
        level = 3
    }else if (time >= 40){
        body.style.background = "url(../img/background/ender-dragon.jpg) no-repeat";
        body.style.backgroundSize= "cover";
        level = 2;
    }else if (time >= 20){
        body.style.background = "url(../img/background/sunset.jpg) no-repeat";
        body.style.backgroundSize= "cover";
        level = 1;
    }else if (time < 20){
        body.style.background = "url(../img/background/montagne.jpg) no-repeat";
        body.style.backgroundSize= "cover";
        level = 0;
    }
    setTimeout(function(){
        time ++; 
        updateTime();
    }, 1000);
}
function levelModif(){

    var alpha = 2 / levelMax;

    speedAttack = startSpeed - alpha * level

    setTimeout(function(){
        levelModif();
    })
}

function gameOver(){
    scoreBoard();
    gameOverArea.style.visibility = "visible";
    scoreText.innerHTML = "Votre score est de " + time;
}

function restart(){
    time = 0;
    isJumping = false;
    isAttacking = false;
    isDead = false;
    speedAttack = 3;
    boardUpdated = false;
    gameOverArea.style.visibility = "hidden";
    steve.style.visibility = "visible";
    enemyAttack();
    updateTime();
}

function scoreBoard(){
    if (!boardUpdated){
        var score = parseInt(time);
        var scores = [localStorage.getItem("score1"), localStorage.getItem("score2"), localStorage.getItem("score3"), localStorage.getItem("score4"), localStorage.getItem("score5")];
    
        for (var i = 0; i < 5; i++) {
            if (score > scores[i]) {
                // Décaler les scores existants vers le bas
                for (var j = 4; j > i; j--) {
                    scores[j] = scores[j - 1];
                }
    
                // Insérer le nouveau score à la position i
                scores[i] = (score).toString();
    
                // Mettre à jour le localStorage avec les nouveaux scores
                for (var k = 0; k < 5; k++) {
                    localStorage.setItem("score" + (k + 1), scores[k]);
                }
                break; // Sortir de la boucle car le score a été inséré
            }
        }
        boardUpdated = true;
    }
}

levelModif();
updateTime();
enemyAttack();