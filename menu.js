const { viewHighScores } = require('./quizData');
const prompt = require('prompt-sync')();
const { playRound } = require("./quizLogic");

const showMenu = () => {
    let isRunning = true;

    while (isRunning) {
        console.log("\nMenu:");
        console.log("1. Play Round");
        console.log("2. View Stats");
        console.log("3. Exit");

        const choice = prompt("Choose an Action (Enter 1-3): ");

        if (choice === "1") {
            playRound();
        } else if (choice === "2") {
            viewHighScores();
        } else if (choice === "3") {
            console.log("Goodbye!");
            isRunning = false;
        } else {
            console.log("Invalid choice. Please try again.");
        }
    }

    const quizData = require("./quizData");

    console.log("🎉 Welcome to the Quiz!\n");

    const ready = prompt("Are you ready to start? (y/n): ");

    if (ready.toLowerCase() === "y") {
        let score = 0;

        const question = quizData[0]; // 👈 THIS is where question comes from

        console.log(question.question);

        for (let i = 0; i < question.choices.length; i++) {
            console.log(`${i + 1}. ${question.choices[i]}`);
        }

        const answer = prompt("Your answer (number): ");

        if (question.choices[answer - 1] === question.answer) {
            console.log("✅ Correct!");
            score++;
        } else {
            console.log("❌ Incorrect.");
        }

        console.log(`\nYour score: ${score}`);
    }
};

module.exports = { showMenu };