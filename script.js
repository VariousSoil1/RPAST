let currentQuestion = 1;
const totalQuestions = 114;  // Total questions for the test
let reviewQuestions = new Set();

document.addEventListener("DOMContentLoaded", () => {
    showQuestion(currentQuestion);
});

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
    if (reviewQuestions.has(questionNumber)) {
        reviewQuestions.delete(questionNumber);
        alert(`Question ${questionNumber} unmarked for review.`);
    } else {
        reviewQuestions.add(questionNumber);
        alert(`Question ${questionNumber} marked for review.`);
    }
}

function submitTest() {
    let correctAnswers = 0;
    for (let i = 1; i <= totalQuestions; i++) {
        const question = document.querySelector(`input[name="q${i}"]:checked`);
        if (question && checkAnswer(i, question.value)) {
            correctAnswers++;
        }
    }
    displayResult(correctAnswers, totalQuestions);
}

function checkAnswer(questionNumber, selectedAnswer) {
    // Define correct answers for each question
    const correctAnswers = {
        1: 'b',  // For question 1, correct answer is 'b'
        2: 'b',  // For question 2, correct answer is 'b'
        // Continue for all other questions
    };
    return correctAnswers[questionNumber] === selectedAnswer;
}

function displayResult(correctAnswers, totalQuestions) {
    const result = document.getElementById('result');
    result.innerHTML = `You answered ${correctAnswers} out of ${totalQuestions} questions correctly.`;
}
