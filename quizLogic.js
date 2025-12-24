const prompt = require("prompt-sync")();
const { questions, updateHighScores } = require("./quizData");

function playRound() {
    const name = prompt("Enter your name: ");
    console.log("\n🎮 Starting a round...\n");

    let score = 0;
    const question = questions[0]; // ✅ NOW this exists

    console.log(question.question);

    question.choices.forEach((choice, index) => {
        console.log(`${index + 1}. ${choice}`);
    });

    const answer = prompt("Your answer (number): ");

    if (Number(answer) === question.answerIndex + 1) {
        console.log("✅ Correct!");
        score++;
    } else {
        console.log("❌ Incorrect.");
    }

    console.log(`\nScore: ${score}\n`);

    updateHighScores(name, score);
}

module.exports = { playRound };
