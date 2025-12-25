const { playRound } = require("./quizLogic");
const { viewHighScores } = require("./quizData");
const prompt = require("prompt-sync")();

const showMenu = () => {
    let isRunning = true;

    while (isRunning) {
        console.log("\nMenu:");
        console.log("1. Play Round");
        console.log("2. View Stats");
        console.log("3. Exit");

        const choice = prompt("Choose an Action (Enter 1-3): ");

        if (choice === "1") {
            playRound(); // ✅ will now ask how many questions
        } else if (choice === "2") {
            viewHighScores();
        } else if (choice === "3") {
            console.log("Goodbye!");
            isRunning = false;
        } else {
            console.log("Invalid choice. Please try again.");
        }
    }
};

module.exports = { showMenu };


module.exports = { showMenu };