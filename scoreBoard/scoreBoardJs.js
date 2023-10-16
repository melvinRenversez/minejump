score1 = localStorage.getItem("score1");
score2 = localStorage.getItem("score2");
score3 = localStorage.getItem("score3");
score4 = localStorage.getItem("score4");
score5 = localStorage.getItem("score5");

textScore1 = document.getElementById("score1");
textScore2 = document.getElementById("score2");
textScore3 = document.getElementById("score3");
textScore4 = document.getElementById("score4");
textScore5 = document.getElementById("score5");

textScore1.innerHTML = score1;
textScore2.innerHTML = score2;
textScore3.innerHTML = score3;
textScore4.innerHTML = score4;
textScore5.innerHTML = score5;