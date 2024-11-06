let currentQuestion = 1;
const totalQuestions = 114;  // Total questions for the test
let markedQuestions = []; // Store marked questions
let reviewQuestions = new Set();
let userName = "";

function markForReview(questionNumber) {
    // Check if the question has already been marked for review
    if (!markedQuestions.includes(questionNumber)) {
        markedQuestions.push(questionNumber); // Add to the list
        updateReviewList(); // Update sidebar
    }
}

// Update the review sidebar
function updateReviewList() {
    let reviewList = document.getElementById("reviewList");
    reviewList.innerHTML = ""; // Clear the current list

    // Add each marked question to the list
    markedQuestions.forEach(function (questionNumber) {
        let li = document.createElement("li");
        li.textContent = "Question " + questionNumber;
        li.onclick = function () {
            goToQuestion(questionNumber); // Navigate to the marked question
        };
        reviewList.appendChild(li);
    });
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

// Go to a specific question when clicked from the review list
function goToQuestion(questionNumber) {
    // Hide all questions
    let allQuestions = document.querySelectorAll(".question");
    allQuestions.forEach(function (question) {
        question.style.display = "none";
    });

    // Show the selected question
    let question = document.getElementById("question" + questionNumber);
    if (question) {
        question.style.display = "block";
    }
}

// Show the introductory section to collect user info
function startTest() {
    userName = document.getElementById("userName").value;
    if (!userName) {
        alert("Please enter your name.");
        return;
    }
    // Hide the intro section and show the test container
    document.getElementById("introSection").style.display = "none";
    document.getElementById("testContent").style.display = "block";
    
    // Set the user's name in the header or anywhere needed
    document.getElementById('testContent').innerHTML += `<h3>Hello, ${userName}! Please start the test.</h3>`;

    showQuestion(currentQuestion);
}

function showQuestion(questionNumber) {
    // Hide all questions and display the current one
    document.querySelectorAll(".question").forEach(q => q.style.display = "none");
    const currentQ = document.getElementById(`question${questionNumber}`);
    if (currentQ) currentQ.style.display = "block";

    // Hide/Show Next and Previous Buttons
    document.querySelector("button[onclick='previousQuestion()']").disabled = questionNumber === 1;
    document.querySelector("button[onclick='nextQuestion()']").disabled = questionNumber === totalQuestions;

    // Show Submit Button only on the last question
    const submitButton = document.querySelector(".submit-section");
    if (questionNumber === totalQuestions) {
        submitButton.style.display = "block";  // Show the Submit button
    } else {
        submitButton.style.display = "none";   // Hide the Submit button
    }
}

function nextQuestion() {
    if (currentQuestion < totalQuestions) {
        currentQuestion++;
        showQuestion(currentQuestion);
    }
}

function previousQuestion() {
    if (currentQuestion > 1) {
        currentQuestion--;
        showQuestion(currentQuestion);
    }
}

function submitTest() {
    alert("Test Submitted! Thank you for participating.");
    // You can also handle submitting data or redirecting to another page here.
}
