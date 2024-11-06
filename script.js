let currentQuestion = 1;
const totalQuestions = 114;  // Total questions for the test
let reviewQuestions = new Set();
let userName = "";

// Show the introductory section to collect user info
function startTest() {
    userName = document.getElementById("userName").value;
    if (!userName) {
        alert("Please enter your name.");
        return;
    }
    // Hide the intro and show the test content
    document.getElementById("introSection").style.display = "none";
    document.getElementById("testContent").style.display = "block";
    showQuestion(currentQuestion);
    document.getElementById("sidebar").style.display = "block"; // Show the sidebar
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

function markForReview(questionNumber) {
    const reviewList = document.getElementById("reviewList");
    if (reviewQuestions.has(questionNumber)) {
        reviewQuestions.delete(questionNumber);
        // Remove from the review list
        document.getElementById(`review${questionNumber}`).remove();
    } else {
        reviewQuestions.add(questionNumber);
        // Add to the review list
        const listItem = document.createElement("li");
        listItem.id = `review${questionNumber}`;
        listItem.textContent = `Question ${questionNumber}`;
        listItem.addEventListener('click', () => {
            // When a marked question is clicked, jump to it
            currentQuestion = questionNumber;
            showQuestion(currentQuestion);
        });
        reviewList.appendChild(listItem);
    }
}

<!-- Intro Section -->
<div id="introSection">
    <h1>Welcome to the Rivals Test</h1>
    <input type="text" id="userName" placeholder="Enter your name">
    <button onclick="startTest()">Start Test</button>
</div>

<!-- Test Content Section -->
<div id="testContent" class="container" style="display: none;">
    <div id="question1" class="question">
        <!-- Question 1 -->
        <p>What is the best weapon in Rivals?</p>
        <button onclick="nextQuestion()">Next</button>
    </div>
    <div id="question2" class="question hidden">
        <!-- Question 2 -->
        <p>How do you earn keys in Rivals?</p>
        <button onclick="nextQuestion()">Next</button>
    </div>
    <!-- Add more questions here -->
    <div class="submit-section" style="display: none;">
        <button onclick="submitTest()">Submit Test</button>
    </div>
</div>

<!-- Sidebar for Review Questions -->
<div id="sidebar" class="sidebar">
    <h3>Marked for Review</h3>
    <ul id="reviewList">
        <!-- Review list items will appear here -->
    </ul>
</div>


function submitTest() {
    alert("Test Submitted! Thank you for participating.");
    // You can also handle submitting data or redirecting to another page here.
}
