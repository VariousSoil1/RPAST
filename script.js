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

function submitTest() {
    alert("Test Submitted! Thank you for participating.");
    // You can also handle submitting data or redirecting to another page here.
}
