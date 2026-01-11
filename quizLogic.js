const { updateHighScores } = require("./quizData");
const { getInput } = require("./utils");
const { showCorrect, showWrong, showProgress, loading, countdown, showRoundSummary } = require("./ui");

// Difficulty Time Limits (ms)

const difficultySettings = {
    easy: 15000,
    medium: 10000,
    hard: 5000
};


// Play One Quiz Round

const playRound = async (numQuestions, questionGenerator, difficulty, category, playerName) => {
    const name = playerName;
    let score = 0;
    const askedQuestions = new Set();

    const timeLimit = difficultySettings[difficulty];
    const roundStartTime = Date.now();

    // 🔹 Loading & countdown before round starts
    await loading("Preparing your round");
    await countdown();

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

        // ⏱ Start timing
        const questionStart = Date.now();
        const input = getInput(`Your answer (1-${question.choices.length}, or 'q'): `);
        const elapsedMs = Date.now() - questionStart;
        const elapsedSeconds = (elapsedMs / 1000).toFixed(2);

        // ⏱ Auto-fail if time exceeded
        if (elapsedMs > timeLimit) {
            console.log(`⏱️ Time’s up! You took ${elapsedSeconds}s`);
            showWrong();
            continue;
        }

        // Exit early
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

        // 🔹 Feedback with icons and colors
        if (answer === question.answerIndex + 1) {
            showCorrect(); // ✅ Shows green checkmark
            score++;
        } else {
            showWrong();   // ❌ Shows red X
            console.log(`💡 Correct answer: ${question.choices[question.answerIndex]}`);
        }

        // 🔹 Show progress after each question
        showProgress(i + 1, numQuestions);

        console.log(`⏱️ Time taken: ${elapsedSeconds}s`);
    }

    // Round complete summary

    const totalSeconds = ((Date.now() - roundStartTime) / 1000).toFixed(2);
    const accuracy = ((score / numQuestions) * 100).toFixed(1);

    showRoundSummary({
        correct: score,
        total: numQuestions,
        percentage: accuracy
    });

    updateHighScores({
        name,
        score,
        category,
        timeSeconds: Number(totalSeconds),
        accuracy: Number(accuracy)
    });
};

module.exports = { playRound };