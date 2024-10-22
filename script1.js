const questions = [
    {
        question: "What causes a tsunami?",
        answers: [
            "Earthquakes",
            "Volcanoes",
            "Landslides",
            "All of the above"
        ],
        correct: 3
    },
    {
        question: "How fast can a tsunami travel?",
        answers: [
            "20 mph",
            "50 mph",
            "200 mph",
            "600 mph"
        ],
        correct: 3
    },
    {
        question: "What should you do if a tsunami warning is issued?",
        answers: [
            "Stay on the beach",
            "Evacuate to higher ground",
            "Ignore the warning",
            "Wait for the tsunami to pass"
        ],
        correct: 1
    },
];

let currentQuestionIndex = 0;
let score = 0;

const questionElement = document.getElementById("question");
const answersElement = document.getElementById("answers");
const nextButton = document.getElementById("next-button");
const scoreContainer = document.getElementById("score-container");
const scoreElement = document.getElementById("score");
const restartButton = document.getElementById("restart-button");

function startGame() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.classList.add("hidden");
    scoreContainer.classList.add("hidden");
    showQuestion();
}

function showQuestion() {
    resetState();
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.innerText = currentQuestion.question;

    currentQuestion.answers.forEach((answer, index) => {
        const button = document.createElement("button");
        button.innerText = answer;
        button.classList.add("answer");
        button.addEventListener("click", () => selectAnswer(index));
        answersElement.appendChild(button);
    });
}

function resetState() {
    nextButton.classList.add("hidden");
    while (answersElement.firstChild) {
        answersElement.removeChild(answersElement.firstChild);
    }
}

function selectAnswer(index) {
    const currentQuestion = questions[currentQuestionIndex];
    if (index === currentQuestion.correct) {
        score++;
    }
    nextButton.classList.remove("hidden");
}

nextButton.addEventListener("click", () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
});

function showScore() {
    resetState();
    questionElement.innerText = "Quiz Complete!";
    scoreElement.innerText = score;
    scoreContainer.classList.remove("hidden");
}

restartButton.addEventListener("click", startGame);

startGame();
