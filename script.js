function submitTest() {
    const form = document.getElementById("testForm");
    const resultDiv = document.getElementById("result");

    // Correct answers
    const correctAnswers = {
        q1: "Paris",
        q2: "12"
    };

    let score = 0;
    const totalQuestions = Object.keys(correctAnswers).length;

    // Loop through questions and check answers
    for (const [question, answer] of Object.entries(correctAnswers)) {
        const userAnswer = form[question].value;
        if (userAnswer === answer) {
            score++;
        }
    }

    // Display result
    resultDiv.innerHTML = `You scored ${score} out of ${totalQuestions}.`;
}
