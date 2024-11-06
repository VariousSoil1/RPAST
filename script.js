let currentQuestion = 1;
const totalQuestions = 114;  // Total questions for the test
let markedQuestions = []; // Store marked questions
let reviewQuestions = new Set();
let userName = "";

function markForReview(questionNumber) {
    // Check if the question has already been marked
    if (!markedQuestions.includes(questionNumber)) {
        markedQuestions.push(questionNumber); // Add to the marked list
        updateReviewList(); // Update the review sidebar
    }
}

// Update the review sidebar to show marked questions
function updateReviewList() {
    let reviewList = document.getElementById("reviewList");
    reviewList.innerHTML = ""; // Clear the existing review list

    // Loop through each marked question and add it to the sidebar list
    markedQuestions.forEach(function (questionNumber) {
        let li = document.createElement("li");
        li.textContent = "Question " + questionNumber;
        li.onclick = function () {
            goToQuestion(questionNumber); // Go to the question when clicked
        };
        reviewList.appendChild(li); // Append to the review list
    });
}

// Function to navigate to a specific question when clicked from the review list
function goToQuestion(questionNumber) {
    let allQuestions = document.querySelectorAll(".question");
    allQuestions.forEach(function (question) {
        question.style.display = "none"; // Hide all questions
    });

    let currentQuestion = document.getElementById("question" + questionNumber);
    if (currentQuestion) {
        currentQuestion.style.display = "block"; // Show the selected question
    }
}

// Function to start the test
function startTest() {
    let userName = document.getElementById("userName").value;
    if (!userName) {
        alert("Please enter your name.");
        return;
    }
    document.getElementById("introSection").style.display = "none";
    document.getElementById("testContent").style.display = "block";
    showQuestion(1); // Start with the first question
}

// Function to show the current question
function showQuestion(questionNumber) {
    let allQuestions = document.querySelectorAll(".question");
    allQuestions.forEach(function (question) {
        question.style.display = "none"; // Hide all questions
    });

    let currentQuestion = document.getElementById("question" + questionNumber);
    if (currentQuestion) {
        currentQuestion.style.display = "block"; // Show the selected question
    }
}

// Example functions to navigate between questions
function nextQuestion() {
    let currentQuestion = document.querySelector(".question:visible");
    let currentQuestionNumber = parseInt(currentQuestion.id.replace("question", ""));
    showQuestion(currentQuestionNumber + 1);
}

function previousQuestion() {
    let currentQuestion = document.querySelector(".question:visible");
    let currentQuestionNumber = parseInt(currentQuestion.id.replace("question", ""));
    showQuestion(currentQuestionNumber - 1);
}
