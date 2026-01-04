const { playRound } = require("./quizLogic");
const { viewHighScores } = require("./quizData");
const { getInput } = require("./utils");

const {
    generateMathQuestion,
    generateScienceQuestion,
    generateReadingQuestion,
    generateLanguageQuestion,
} = require("./quizData");

const numQuestionsOptions = [5, 10, 15];

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
                console.log("\nChoose category:");
                console.log("1. Math");
                console.log("2. Science");
                console.log("3. Reading");
                console.log("4. Language");

                const categoryChoice = getInput("Enter choice: ");

                let categoryName; // ✅ Declare categoryName here
                let questionGenerator; // ✅ Also declare generator here

                switch (categoryChoice) {
                    case "1":
                        categoryName = "Math";
                        questionGenerator = generateMathQuestion;
                        break;
                    case "2":
                        categoryName = "Science";
                        questionGenerator = generateScienceQuestion;
                        break;
                    case "3":
                        categoryName = "Reading";
                        questionGenerator = generateReadingQuestion;
                        break;
                    case "4":
                        categoryName = "Language";
                        questionGenerator = generateLanguageQuestion;
                        break;
                    default:
                        console.log("❌ Invalid category choice");
                        continue; // back to main menu
                }

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
                if (!difficulty) continue;

                console.log(
                    `Choose number of questions: ${numQuestionsOptions.join(", ")}`
                );

                const numQuestions = Number(getInput("Enter number: "));
                if (!numQuestionsOptions.includes(numQuestions)) continue;

                playRound(numQuestions, questionGenerator, difficulty, categoryName);
                break;

            case "2":
                console.log("\nView High Scores by Category:");
                console.log("1. Math");
                console.log("2. Science");
                console.log("3. Reading");
                console.log("4. Language");

                const scoreChoice = getInput("Enter choice: ");

                const categoryMap = {
                    "1": "Math",
                    "2": "Science",
                    "3": "Reading",
                    "4": "Language"
                };

                const selectedCategory = categoryMap[scoreChoice];

                if (!selectedCategory) {
                    console.log("❌ Invalid category");
                    break;
                }

                viewHighScores(selectedCategory);
                break;
            case "3":
                console.log("Goodbye!");
                isRunning = false;
                break;
        }
    }
};

module.exports = { showMenu };