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
    document.querySelector("button[onclick='nextQuestion()']").disabled = questionNumber 
