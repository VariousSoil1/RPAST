let currentQuestion = 1;
const totalQuestions = 2;
let reviewQuestions = new Set();

document.addEventListener("DOMContentLoaded", () => {
    showQuestion(currentQuestion);
});

function showQuestion(questionNumber) {
    // Hide all questions
    document.querySelectorAll(".question").forEach(q => q.style.display = "none");

    // Show current question
    const currentQ = document.getElementById(`question${questionNumber}`);
    if (currentQ) currentQ.style.display = "block";

    // Enable/Disable navigation buttons
    document.querySelector("button[onclick='previousQuestion()']").disabled = questionNumber === 1;
    document.querySelector("button[onclick='nextQuestion()']").disabled = questionNumber === totalQuestions;
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
    if (reviewQuestions.has(questionNumber)) {
        reviewQuestions.delete(questionNumber);
        alert(`Question ${questionNumber} unmarked for review.`);
    } else {
        reviewQuestions.add(questionNumber);
        alert(`Question ${questionNumber} marked for review.`);
    }
}
