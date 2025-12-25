const prompt = require("prompt-sync")();
const { updateHighScores } = require("./quizData");

function playRound() {
    const name = prompt("Enter your name: ");
    console.log("\n🎮 Starting a round...\n");

    let score = 0;
    const question = generateMathQuestion();


    console.log(question.question);

    question.choices.forEach((choice, index) => {
        console.log(`${index + 1}. ${choice}`);
    });

    const answer = prompt("Your answer (number): ");

    if (Number(answer) === question.answerIndex + 1) {
        console.log("✅ Correct!");
        score++;
    } else {
        console.log("❌ Incorrect.");
    }

    console.log(`\nScore: ${score}\n`);

    updateHighScores(name, score);
}

const generateMathQuestion = () => {
    const operators = ["+", "-", "*", "/"];
    const operator = operators[Math.floor(Math.random() * operators.length)];

    let num1;
    let num2;
    let correctAnswer;

    if (operator === "+") {
        num1 = Math.floor(Math.random() * 10) + 1;
        num2 = Math.floor(Math.random() * 10) + 1;
        correctAnswer = num1 + num2;

    } else if (operator === "-") {
        num1 = Math.floor(Math.random() * 10) + 1;
        num2 = Math.floor(Math.random() * 10) + 1;

        if (num2 > num1) {
            [num1, num2] = [num2, num1];
        }

        correctAnswer = num1 - num2;

    } else if (operator === "*") {
        num1 = Math.floor(Math.random() * 10) + 1;
        num2 = Math.floor(Math.random() * 10) + 1;
        correctAnswer = num1 * num2;

    } else {
        correctAnswer = Math.floor(Math.random() * 10) + 1;
        num2 = Math.floor(Math.random() * 10) + 1;
        num1 = correctAnswer * num2;
    }

    const choices = new Set();
    choices.add(correctAnswer);

    while (choices.size < 4) {
        const fakeAnswer = correctAnswer + Math.floor(Math.random() * 10) - 5;
        if (fakeAnswer >= 0) {
            choices.add(fakeAnswer);
        }
    }

    const choicesArray = Array.from(choices);

    for (let i = choicesArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [choicesArray[i], choicesArray[j]] = [choicesArray[j], choicesArray[i]];
    }

    return {
        question: `What is ${num1} ${operator} ${num2}?`,
        choices: choicesArray,
        answerIndex: choicesArray.indexOf(correctAnswer)
    };
};

module.exports = { playRound };
