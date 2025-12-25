const prompt = require("prompt-sync")();
const { updateHighScores } = require("./quizData");
const { generateMathQuestion } = require("./quizData");

const playRound = () => {
    const name = prompt("Enter your name: ");
    let score = 0;
    const askedQuestions = new Set();

    // Step 1: choose number of questions
    const numQuestionsOptions = [5, 10, 12, 15, 20, 25, 30];

    console.log("\nHow many questions would you like to answer?");
    numQuestionsOptions.forEach((opt) => console.log(opt));

    let numQuestions;
    do {
        numQuestions = Number(prompt("Choose a number of questions: "));
    } while (!numQuestionsOptions.includes(numQuestions));

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

        const answer = Number(prompt("Your answer (number): "));

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
module.exports = { playRound };
