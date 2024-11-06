function checkAnswers() {
    // Define correct answers
    const correctAnswers = {
        q1: "Paris",
        q2: "4"
    };

    let score = 0;
    const totalQuestions = Object.keys(correctAnswers).length;

    // Check answers
    Object.keys(correctAnswers).forEach((question) => {
        const userAnswer = document.querySelector(`input[name="${question}"]:checked`);
        if (userAnswer && userAnswer.value === correctAnswers[question]) {
            score++;
        }
    });

    // Display result
    document.getElementById("result").innerText = `You scored ${score} out of ${totalQuestions}`;
}
