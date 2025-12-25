const highScores = [
    { name: 'tati', score: 100, date: "12/4/25" },
    { name: 'zohran', score: 90, date: "12/7/25" },
    { name: 'amias', score: 75, date: "12/10/25" },
];

const viewHighScores = () => {
    console.log("\n🏆 High Scores:");

    highScores.forEach((entry, index) => {
        console.log(
            `${index + 1}. ${entry.name} - ${entry.score} points (${entry.date})`
        );
    });
    console.log("");
};

const updateHighScores = (name, score) => {
    highScores.push({
        name,
        score,
        date: new Date().toLocaleDateString()
    });

    highScores.sort((a, b) => b.score - a.score);
};

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

module.exports = {
    highScores,
    viewHighScores,
    updateHighScores,
    generateMathQuestion
};