const { playRound } = require("./quizLogic");
const { viewHighScores } = require("./quizData");
const { getInput } = require("./utils");

const showMenu = () => {
    let isRunning = true;

    while (isRunning) {
        console.log("\nMenu:");
        console.log("1. Play Round");
        console.log("2. View Stats");
        console.log("3. Exit");

        const choice = getInput("Choose an Action (Enter 1-3 or 'q' to quit): ");

        if (choice === "1") {
            const validOptions = ["5", "10", "12", "15", "20", "25", "30"];
            let numQuestions;

            while (true) {
                console.log("\nHow many questions would you like to answer?");
                validOptions.forEach(opt => console.log(opt));

                const input = getInput("Choose a number of questions (or 'q' to quit): ");

                if (validOptions.includes(input)) {
                    numQuestions = Number(input);
                    break;
                }

                console.log("Invalid choice. Please select a number from the list or 'q' to quit.");
            }

            playRound(numQuestions);
        }
        else if (choice === "2") {
            viewHighScores();
        }
        else if (choice === "3") {
            console.log("Goodbye!");
            isRunning = false;
        }
        else {
            console.log("Invalid choice. Please try again.");
        }
    }
};
module.exports = { showMenu };