
function start(){
    time = parseInt(document.getElementById('text').value);

    var scores = [localStorage.getItem("score1"), localStorage.getItem("score2"), localStorage.getItem("score3"), localStorage.getItem("score4"), localStorage.getItem("score5")];
    
    console.log(scores);

    console.log(time);

    for (var i = 0; i < 5; i++) {
        if (time > scores[i]) {
            // Décaler les scores existants vers le bas
            for (var j = 4; j > i; j--) {
                scores[j] = scores[j - 1];
            }

            // Insérer le nouveau score à la position i
            scores[i] = (time).toString();

            // Mettre à jour le localStorage avec les nouveaux scores
            for (var k = 0; k < 5; k++) {
                localStorage.setItem("score" + (k + 1), scores[k]);
            }
            break; // Sortir de la boucle car le score a été inséré
        }
    }
}

function Reset(){

    localStorage.removeItem("score1");
    localStorage.removeItem("score2");
    localStorage.removeItem("score3");
    localStorage.removeItem("score4");
    localStorage.removeItem("score5");

}
