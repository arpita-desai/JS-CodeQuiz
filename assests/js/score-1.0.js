const playername = document.getElementById("playername");
const saveScoreBtn = document.getElementById("saveScoreBtn");
const finalScore = document.getElementById("finalScore");
const mostRecentScore = localStorage.getItem("mostRecentScore");

const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

const MAX_HIGH_SCORES = 5;

finalScore.innerText = mostRecentScore;

playername.addEventListener("keyup", () => {
  saveScoreBtn.disabled = !playername.value;
});

saveHighScore = e => {
  console.log("clicked the save button!");
  e.preventDefault();

  const score = {
    score: mostRecentScore,
    name: playername.value
  };
  highScores.push(score);
  highScores.sort( (a,b) => b.score - a.score);
  highScores.splice(5);

  localStorage.setItem('highScores', JSON.stringify(highScores));
  window.location.assign('file:///C:/My%20Work/Arpi/JS_Work/JS-CodeQuiz/JS-CodeQuiz/index.html');
};
