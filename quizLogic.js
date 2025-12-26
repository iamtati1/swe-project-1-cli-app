const prompt = require("prompt-sync")();
const { updateHighScores } = require("./quizData");
const { generateMathQuestion } = require("./quizData");
const { getInput } = require("./utils");

// exit at anytime
const playRound = () => {
    const name = getInput("Enter your name: ");
    let score = 0;
    const askedQuestions = new Set();

    // Step 1: choose number of questions
    const numQuestionsOptions = [5, 10, 12, 15, 20, 25, 30];

    console.log("\nHow many questions would you like to answer?");
    numQuestionsOptions.forEach((opt) => console.log(opt));

    let numQuestions;
    while (true) {
        const input = getInput("Choose a number of questions: ");
        if (numQuestionsOptions.includes(Number(input))) {
            numQuestions = Number(input);
            break;
        }
        console.log("❌ Invalid choice. Please select a valid number or 'q' to quit.");
    }

    // Step 2: play exact number of questions
    for (let i = 0; i < numQuestions; i++) {
        let question;
        do {
            question = generateMathQuestion();
        } while (askedQuestions.has(question.question));

        askedQuestions.add(question.question);

        console.log(`\nQuestion ${i + 1}: ${question.question}`);
        question.choices.forEach((choice, index) => {
            console.log(`${index + 1}. ${choice}`);
        });

        let answer;
        while (true) {
            const input = getInput("Your answer (number): ");
            answer = Number(input);

            if (!isNaN(answer) && answer >= 1 && answer <= question.choices.length) {
                break;
            }

            console.log(`❌ Invalid input. Enter a number between 1 and ${question.choices.length}, or 'q' to quit.`);
        }

        if (answer === question.answerIndex + 1) {
            console.log("✅ Correct!");
            score++;
        } else {
            console.log(
                `❌ Incorrect. Correct answer: ${question.choices[question.answerIndex]}`
            );
        }
    }

    console.log(`\n🎯 ${name}, your final score: ${score} out of ${numQuestions}`);
    updateHighScores(name, score);
};

module.exports = { playRound, getInput };