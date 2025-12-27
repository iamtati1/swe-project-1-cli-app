const { playRound } = require("./quizLogic");
const { viewHighScores } = require("./quizData");
const { getInput } = require("./utils");

const {
    generateMathQuestion,
    generateScienceQuestion,
    generateReadingQuestion,
    generateLanguageQuestion,
} = require("./quizData");

const numQuestionsOptions = [5, 10, 12, 15, 20, 25, 30];

const showMenu = () => {
    let isRunning = true;

    while (isRunning) {
        console.log("\nMenu:");
        console.log("1. Play Round");
        console.log("2. View High Scores");
        console.log("3. Exit");

        const choice = getInput("Choose an option: ");

        switch (choice) {
            case "1":
                // --- Step 1: Choose category ---
                console.log("\nChoose a category:");
                console.log("1. Math");
                console.log("2. Science");
                console.log("3. Reading");
                console.log("4. Language");

                const categoryChoice = getInput("Enter choice (1–4): ");
                let questionGenerator;

                switch (categoryChoice) {
                    case "1":
                        questionGenerator = generateMathQuestion;
                        break;
                    case "2":
                        questionGenerator = generateScienceQuestion;
                        break;
                    case "3":
                        questionGenerator = generateReadingQuestion;
                        break;
                    case "4":
                        questionGenerator = generateLanguageQuestion;
                        break;
                    default:
                        console.log("❌ Invalid category.");
                        continue;
                }

                // --- Step 2: Choose number of questions ---
                console.log(`\nChoose number of questions: ${numQuestionsOptions.join(", ")}`);
                let numQuestions;
                while (true) {
                    const input = getInput("Enter number: ");
                    if (numQuestionsOptions.includes(Number(input))) {
                        numQuestions = Number(input);
                        break;
                    }
                    console.log("❌ Invalid choice. Try again.");
                }

                // --- Step 3: Play the round ---
                playRound(numQuestions, questionGenerator);
                break;

            case "2":
                viewHighScores();
                break;

            case "3":
                console.log("Goodbye!");
                isRunning = false;
                break;

            default:
                console.log("❌ Invalid choice. Try again.");
        }
    }
};

module.exports = { showMenu };