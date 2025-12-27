const prompt = require("prompt-sync")();
const { updateHighScores } = require("./quizData");
const { generateMathQuestion } = require("./quizData");
const { getInput } = require("./utils");

// exit at anytime
const playRound = (numQuestions, questionGenerator) => {
    const name = getInput("Enter your name: ");
    let score = 0;
    const askedQuestions = new Set();

    // Step 2: play exact number of questions
    for (let i = 0; i < numQuestions; i++) {
        let question;
        do {
            question = questionGenerator();
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

            console.log(
                `❌ Invalid input. Enter a number between 1 and ${question.choices.length}, or 'q' to quit.`
            );
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

    console.log(` ${name}, your final score: ${score} out of ${numQuestions}`);
    updateHighScores(name, score);
};

module.exports = { playRound, getInput };