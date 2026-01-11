const { playRound } = require("./quizLogic");
const { viewHighScores } = require("./quizData");
const { getInput } = require("./utils");
const { showMainMenu } = require("./ui");
const prompt = require("prompt-sync")();
const {
    generateMathQuestion,
    generateScienceQuestion,
    generateReadingQuestion,
    generateLanguageQuestion,
} = require("./quizData");

const numQuestionsOptions = [5, 10, 15];

const showMenu = async () => {
    let isRunning = true;

    while (isRunning) {
        showMainMenu(); // 🌸 Pink menu stays here

        const choice = getInput("");

        switch (choice) {
            case "1": {
                console.log("\nChoose category:");
                console.log("1. Math");
                console.log("2. Science");
                console.log("3. Reading");
                console.log("4. Language");

                const categoryChoice = getInput("Enter choice: ");

                const categoryMap = {
                    "1": ["Math", generateMathQuestion],
                    "2": ["Science", generateScienceQuestion],
                    "3": ["Reading", generateReadingQuestion],
                    "4": ["Language", generateLanguageQuestion],
                };

                const selected = categoryMap[categoryChoice];
                if (!selected) {
                    console.log("❌ Invalid category choice");
                    break;
                }

                const [categoryName, questionGenerator] = selected;

                console.log("\nChoose difficulty:");
                console.log("1. Easy");
                console.log("2. Medium");
                console.log("3. Hard");

                const difficultyMap = {
                    "1": "easy",
                    "2": "medium",
                    "3": "hard"
                };

                const difficulty = difficultyMap[getInput("Enter choice: ")];
                if (!difficulty) break;

                console.log(
                    `Choose number of questions: ${numQuestionsOptions.join(", ")}`
                );

                const numQuestions = Number(getInput("Enter number: "));
                if (!numQuestionsOptions.includes(numQuestions)) break;

                const playerName = prompt("Enter your name: ").trim() || "Player";

                await playRound(numQuestions, questionGenerator, difficulty, categoryName, playerName);
                break;
            }

            case "2": {
                console.log("\nView High Scores by Category:");
                console.log("1. Math");
                console.log("2. Science");
                console.log("3. Reading");
                console.log("4. Language");

                const categoryMap = {
                    "1": "Math",
                    "2": "Science",
                    "3": "Reading",
                    "4": "Language"
                };

                const selectedCategory = categoryMap[getInput("Enter choice: ")];
                if (!selectedCategory) {
                    console.log("❌ Invalid category");
                    break;
                }

                viewHighScores(selectedCategory);
                break;
            }

            case "3":
                console.clear();
                console.log("📘 HOW TO PLAY\n");
                console.log("🧠 Choose a category to test your knowledge");
                console.log("⏱️ Answer questions before time runs out");
                console.log("🔥 Harder difficulties give less time");
                console.log("🏆 Scores are saved by category");
                console.log("\nPress Enter to return to menu...");
                getInput("");
                break;

            case "4":
                console.log("👋 Goodbye!");
                isRunning = false;
                break;

            default:
                console.log("❌ Invalid option");
        }
    }
};

module.exports = { showMenu };