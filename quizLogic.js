const prompt = require("prompt-sync")();
const { updateHighScores } = require("./quizData");
const { generateMathQuestion } = require("./quizData");
const { getInput } = require("./utils");

const difficultySettings = {
    easy: 15000,
    medium: 10000,
    hard: 5000
};

const playRound = async (numQuestions, questionGenerator, difficulty, category) => {
    const name = getInput("Enter your name: ");
    let score = 0;
    const askedQuestions = new Set();

    const timeLimit = difficultySettings[difficulty];
    const roundStartTime = Date.now();

    for (let i = 0; i < numQuestions; i++) {
        let question;
        let answer = null;

        // Prevent duplicate questions
        do {
            question = questionGenerator();
        } while (askedQuestions.has(question.question));

        askedQuestions.add(question.question);

        console.log(`\nQuestion ${i + 1}:`);
        console.log(question.question);

        question.choices.forEach((choice, index) => {
            console.log(`${index + 1}. ${choice}`);
        });

        // ⏱️ START TIMING
        const questionStart = Date.now();
        const input = getInput(`Your answer (1-${question.choices.length}, or 'q'): `);
        const elapsedMs = Date.now() - questionStart;
        const elapsedSeconds = (elapsedMs / 1000).toFixed(2);

        // ⏱️ AUTO-FAIL
        if (elapsedMs > timeLimit) {
            console.log(`⏱️ Time’s up! You took ${elapsedSeconds}s`);
            console.log("❌ Question automatically marked incorrect.");
            continue;
        }

        // 🚪 Exit early
        if (input && input.toLowerCase() === "q") {
            console.log("Exiting round early...");

            const totalSeconds = ((Date.now() - roundStartTime) / 1000).toFixed(2);
            const accuracy = ((score / numQuestions) * 100).toFixed(1);

            updateHighScores({
                name,
                score,
                category,
                timeSeconds: Number(totalSeconds),
                accuracy: Number(accuracy)
            });

            return;
        }

        const parsed = Number(input);

        if (!isNaN(parsed) && parsed >= 1 && parsed <= question.choices.length) {
            answer = parsed;
        } else {
            console.log("❌ Invalid input. Question marked incorrect.");
        }

        if (answer === question.answerIndex + 1) {
            console.log("✅ Correct!");
            score++;
        } else {
            console.log(
                `❌ Incorrect. Correct answer: ${question.choices[question.answerIndex]}`
            );
        }

        console.log(`⏱️ Time taken: ${elapsedSeconds}s`);
    }

    const totalSeconds = ((Date.now() - roundStartTime) / 1000).toFixed(2);

    console.log(`\n🎉 Quiz Complete!`);
    console.log(`${name}, your final score: ${score} / ${numQuestions}`);
    console.log(`⏱️ Total time: ${totalSeconds}s`);

    const accuracy = ((score / numQuestions) * 100).toFixed(1);

    console.log(`🎯 Accuracy: ${accuracy}%`);

    updateHighScores({
        name,
        score,
        category,
        timeSeconds: Number(totalSeconds),
        accuracy: Number(accuracy)
    });
}

module.exports = { playRound };