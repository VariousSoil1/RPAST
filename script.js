// Global variables to track the test state
let currentQuestion = 0;
let userAnswers = {};
let markedQuestions = [];
let timer;
let totalQuestions = 3; // Set to 3 for sample questions, change for more questions
let timeLeft = 3600; // Timer set to 1 hour (3600 seconds)

// Wait until the DOM is fully loaded before executing any scripts
document.addEventListener("DOMContentLoaded", function () {
    const startButton = document.getElementById("startButton");
    if (startButton) {
        startButton.addEventListener("click", startTest);  // Properly attaching the event listener
    }
});

// Function to start the test
function startTest() {
    const userName = document.getElementById('userName').value.trim();
    if (userName === "") {
        alert("Please enter your name.");
        return;
    }

    // Start the timer
    startTimer();

    document.getElementById('introSection').style.display = 'none';
    document.getElementById('testContent').style.display = 'block';
    showQuestion(currentQuestion);
}

// Function to start and update the timer
function startTimer() {
    timer = setInterval(function () {
        if (timeLeft <= 0) {
            clearInterval(timer);
            alert("Time's up! The test is automatically submitted.");
            submitTest();
        } else {
            document.getElementById("timer").innerText = `Time Left: ${formatTime(timeLeft)}`;
            timeLeft--;
        }
    }, 1000);
}

// Function to format the time as HH:MM:SS
function formatTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

// Function to show a specific question
function showQuestion(index) {
    const questions = document.querySelectorAll('.question');
    questions.forEach((q, i) => {
        q.style.display = i === index ? 'block' : 'none';
    });

    // Update navigation buttons
    document.getElementById('previousButton').disabled = index === 0;
    document.getElementById('nextButton').disabled = index === questions.length - 1;

    // Show Submit button on the last question
    document.querySelector('.submit-section').style.display = index === questions.length - 1 ? 'block' : 'none';
}

// Function to navigate to the next question
function nextQuestion() {
    if (currentQuestion < totalQuestions - 1) {
        currentQuestion++;
        showQuestion(currentQuestion);
    }
}

// Function to navigate to the previous question
function previousQuestion() {
    if (currentQuestion > 0) {
        currentQuestion--;
        showQuestion(currentQuestion);
    }
}

// Function to mark a question for review
function markForReview(questionNumber) {
    if (!markedQuestions.includes(questionNumber)) {
        markedQuestions.push(questionNumber);
        const reviewList = document.getElementById('reviewList');
        const li = document.createElement('li');
        li.textContent = `Question ${questionNumber}`;
        reviewList.appendChild(li);
    }
}

// Function to save user answer for a question
function saveAnswer(questionNumber) {
    const question = document.querySelector(`#question${questionNumber}`);
    const selectedAnswer = question.querySelector('input[type="radio"]:checked');
    if (selectedAnswer) {
        userAnswers[questionNumber] = selectedAnswer.value;
    }
}

// Function to submit the test
function submitTest() {
    clearInterval(timer);
    alert("Test Submitted! Thank you for completing the test.");
    // Optionally, display user answers or submit the result to the server
}

// Add event listeners for saving answers when they change
document.querySelectorAll('input[type="radio"]').forEach((radio) => {
    radio.addEventListener("change", function () {
        const questionNumber = radio.closest('.question').id.replace('question', '');
        saveAnswer(questionNumber);
    });
});
