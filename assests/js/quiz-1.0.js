const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressBarFull");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");
const timerElement = document.getElementById("timerCount");
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuesions = [];

var timerInterval;
var timerCount = 60;

let questions = [
  {
    question: "Where is the correct place to insert a JavaScript?",
    choice1: "The <body> section",
    choice2: "The <head> section",
    choice3: "Inside the <heading> section",
    choice4: "Both the <head> section and the <body> section are correct",
    answer: 4
  },
  {
    question: "The external JavaScript file must contain the <script> tag.",
    choice1: "False",
    choice2: "True",
    choice3: "Depend upon Developer",
    choice4: "Depends upon Application",
    answer: 1
  },
  {
    question: "How do you create a function in JavaScript?",
    choice1: "function myFunction()",
    choice2: "function:myFunction()",
    choice3: "function = myFunction()",
    choice4: "function:=myFunction()",
    answer: 1
  }
];

//CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 3;

startGame = () => {
  questionCounter = 0;
  score = 0;
  timerInterval = setInterval(timer, 1000);
  availableQuesions = [...questions];
  getNewQuestion();
};

timer = () => {
  timerCount--;
  if (timerCount === 0) {
    clearInterval(timerInterval);
    localStorage.setItem("mostRecentScore", score);
    //go to the end page
    return window.location.assign("score.html");
  } else {
    timerElement.textContent = timerCount;
  }
};

getNewQuestion = () => {
  if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    clearInterval(timerInterval);
    localStorage.setItem("mostRecentScore", score);
    //go to the end page
    return window.location.assign("score.html");
  }
  questionCounter++;
  progressText.innerText = `${questionCounter}/${MAX_QUESTIONS}`;
  //Update the progress bar
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

  const questionIndex = Math.floor(Math.random() * availableQuesions.length);
  currentQuestion = availableQuesions[questionIndex];
  question.innerText = currentQuestion.question;

  choices.forEach(choice => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuesions.splice(questionIndex, 1);
  acceptingAnswers = true;
};

choices.forEach(choice => {
  choice.addEventListener("click", e => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    const classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply === "correct") {
      timerCount = timerCount + 10;
      incrementScore(CORRECT_BONUS);
    } else {
      timerCount = timerCount - 10;
    }

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

incrementScore = num => {
  score += num;
  scoreText.innerText = score;
};

startGame();