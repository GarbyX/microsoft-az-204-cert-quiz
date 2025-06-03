let questions = [];
let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 30;
let timer;

// Fetch questions from JSON file
fetch("questions.json")
    .then(response => response.json())
    .then(data => {
        questions = data;
        loadQuestion();
    });

function loadQuestion() {
    clearInterval(timer);
    timeLeft = 30;
    document.getElementById("time-left").textContent = timeLeft;

    timer = setInterval(() => {
        timeLeft--;
        document.getElementById("time-left").textContent = timeLeft;
        if (timeLeft === 0) nextQuestion();
    }, 1000);

    document.getElementById("question-container").textContent = questions[currentQuestionIndex].question;
    const optionsContainer = document.getElementById("options-container");
    optionsContainer.innerHTML = "";

    questions[currentQuestionIndex].options.forEach(option => {
        const button = document.createElement("button");
        button.textContent = option;
        button.onclick = () => {
            if (option === questions[currentQuestionIndex].correct) score++;
            nextQuestion();
        };
        optionsContainer.appendChild(button);
    });

    document.getElementById("progress-count").textContent = currentQuestionIndex + 1;
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        clearInterval(timer);
        document.getElementById("question-container").textContent = `Quiz Complete! Your score: ${score}/${questions.length}`;
        document.getElementById("options-container").innerHTML = "";
        document.getElementById("progress").style.display = "none";
        document.getElementById("timer").style.display = "none";
        document.getElementById("next-btn").style.display = "none";
    }
}

document.getElementById("next-btn").addEventListener("click", nextQuestion);
