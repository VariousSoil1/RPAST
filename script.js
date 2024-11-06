let currentQuestionIndex = 0;
let totalQuestions = 114; // Adjust as necessary
const reviewQuestions = new Set();

function startTest() {
    const userName = document.getElementById("userName").value;
    if (!userName) {
        alert("Please enter your name.");
        return;
    }

    // Hide intro and show test content
    document.getElementById("introSection").style.display = "none";
    document.getElementById("testContent").style.display = "block";
    showQuestion(currentQuestionIndex);
}

function showQuestion(index) {
    // Hide all questions, then show the current one
    const questions = document.querySelectorAll(".question");
    questions.forEach(q => q.style.display = "none");

    questions[index].style.display = "block";
    updateNavigationButtons();
    toggleSubmitButton();
}

function nextQuestion() {
    if (currentQuestionIndex < totalQuestions - 1) {
        currentQuestionIndex++;
        showQuestion(currentQuestionIndex);
    }
}

function previousQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        showQuestion(currentQuestionIndex);
    }
}

function markForReview(questionIndex) {
    reviewQuestions.add(questionIndex);
    updateReviewSidebar();
}

function updateReviewSidebar() {
    const reviewList = document.getElementById("reviewList");
    reviewList.innerHTML = "";
    reviewQuestions.forEach(questionIndex => {
        const listItem = document.createElement("li");
        listItem.textContent = `Question ${questionIndex}`;
        reviewList.appendChild(listItem);
    });
}

function updateNavigationButtons() {
    document.querySelector(".navigation button[onclick='previousQuestion()']").disabled = (currentQuestionIndex === 0);
    document.querySelector(".navigation button[onclick='nextQuestion()']").disabled = (currentQuestionIndex === totalQuestions - 1);
}

function toggleSubmitButton() {
    const submitSection = document.querySelector(".submit-section");
    if (currentQuestionIndex === totalQuestions - 1) {
        submitSection.style.display = "block";
    } else {
        submitSection.style.display = "none";
    }
}

function submitTest() {
    alert("Test submitted! Thank you for participating.");
    // Implement actual submission logic here
}
