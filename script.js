let currentQuestion = 1;
const totalQuestions = 1;  // Set this to the total number of questions
let reviewQuestions = new Set();
let userName = "";
let markedQuestions = []; // Array to store marked question numbers

// Function to mark a question for review
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


// Start the test and transition from the intro section to the test content
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
    document.getElementById('testContent').innerHTML += `<h3>Hello, ${userName}! Let's start the test.</h3>`;

    showQuestion(currentQuestion);
}

// Show the specific question
function showQuestion(questionNumber) {
    const questionElement = document.getElementById(`question${questionNumber}`);
    questionElement.style.display = 'block'; // Show the question

    // Hide the previous question (if applicable)
    if (questionNumber > 1) {
        const prevQuestion = document.getElementById(`question${questionNumber - 1}`);
        prevQuestion.style.display = 'none';
    }
    
    // Show the submit button when the last question is reached
    if (questionNumber === totalQuestions) {
        document.querySelector('.submit-section').style.display = 'block';
    }
}

// Move to the next question
function nextQuestion() {
    if (currentQuestion < totalQuestions) {
        currentQuestion++;
        showQuestion(currentQuestion);
    }
}

// Move to the previous question
function previousQuestion() {
    if (currentQuestion > 1) {
        currentQuestion--;
        showQuestion(currentQuestion);
    }
}

// Submit the test
function submitTest() {
    alert(`Test submitted by ${userName}.`);
    // You can calculate and show the results here
}
