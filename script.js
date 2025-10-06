const startBtn = document.getElementById('startbtn');
const startScreen = document.getElementById('startscreen');
const quizContainer = document.getElementById('quiz-container');
const questionText = document.getElementById('question-text');
const answerButtons = document.getElementById('answer-buttons');
const nxtbtn = document.getElementById('nxtbtn');
const timerDisplay = document.getElementById('timer'); //  Timer display

let currentQuestionIndex = 0;
let score = 0;
let selectedAnswer = null;
let timer; //  to store setInterval
let timeLeft = 10; //  10 seconds for each question

   
// Quiz questions
const quizData = [
  {
    question: "What does HTML stand for?",
    answers: [
      "A. Hyper Text Markup Language",
      "B. Home Tool Markup Language",
      "C. Hyperlinks Text Management Languages",
      "D. Hyper Text Management Language"
    ],
    correct: 0
  },
  {
    question: "Which CSS property changes text color?",
    answers: [
      "A. font-style",
      "B. color",
      "C. text-decoration",
      "D. background"
    ],
    correct: 1
  },
  {
    question: "What does JS stand for?",
    answers: [
      "A. JavaStructure",
      "B. JavaScript",
      "C. JustStyle",
      "D. JScript"
    ],
    correct: 1
  },
  {
    question:"Which of the following is the smallest unit of data in a computer?",
    answers:[
    
"A. Byte",
"B. Bit",
"C. Kilobyte",
"D. Nibble",
],
correct:0
  },
  {
    question:"Q2. Which of the following is NOT an operating system?",
    answers:[
      "A. Windows",
      "B.Linux",
      "C. Oracle",
      "D. macOS",
    ],
    correct:2
  }

];



// Start quiz
startBtn.addEventListener('click', () => {
  startScreen.style.display = 'none';
  quizContainer.style.display = 'block';
  showQuestion();
});

// Show question and start timer
function showQuestion() {
  clearInterval(timer); // Stop previous timer if any
  timeLeft = 10;
  timerDisplay.textContent = `Time left: ${timeLeft} seconds`;
  timer = setInterval(updateTimer, 1000); // Start countdown

  const currentQuestion = quizData[currentQuestionIndex];
  questionText.textContent = currentQuestion.question;

  // Clear previous answers
  answerButtons.innerHTML = '';
  selectedAnswer = null;
  nxtbtn.disabled = true; // Disable next until answer is selected

  currentQuestion.answers.forEach((answer, index) => {
    const btn = document.createElement('button');
    btn.textContent = answer;
    btn.classList.add('answer-btn');
    btn.addEventListener('click', () => selectAnswer(index, btn));
    answerButtons.appendChild(btn);
  });
}

// Timer countdown logic
function updateTimer() {
  timeLeft--;
  timerDisplay.textContent = `Time left: ${timeLeft} seconds`;

  if (timeLeft <= 0) {
    clearInterval(timer);
    autoMoveNext(); // Auto move if time ends
  }
}

// When an answer is selected
function selectAnswer(index, button) {
  selectedAnswer = index;
  const buttons = document.querySelectorAll('.answer-btn');

  buttons.forEach(btn => btn.disabled = true); // Prevent further changes
  if(index === quizData[currentQuestionIndex].correct) {
    button.style.backgroundColor = 'green';
    score++;
  } else {
    button.style.backgroundColor = 'red';
  }
  nxtbtn.disabled = false; // Enable next button

  clearInterval(timer); // Stop timer when answered
}

// Next button click handler
nxtbtn.addEventListener('click', () => {
  goToNextQuestion();
});

// Auto move if time runs out and no answer selected
function autoMoveNext() {
  selectedAnswer = null; // Unanswered
  goToNextQuestion();
}



// Common logic to move to next question
function goToNextQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex < quizData.length) {
    showQuestion();
  } else {
    endQuiz();
  }
}

// End of quiz
function endQuiz() {
  clearInterval(timer);
  questionText.textContent = "Quiz Finished!";
  answerButtons.innerHTML = `<p style="color:lightgreen;">Thanks for playing TechTrek! Your score is: ${score}</p>`;
  timerDisplay.textContent = '';
  nxtbtn.style.display = 'none';
}







