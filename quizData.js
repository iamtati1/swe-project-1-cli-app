const highScores = [
    { name: 'tati', score: 3, date: "12/4/25" },
    { name: 'zohran', score: 2, date: "12/7/25" },
    { name: 'amias', score: 1, date: "12/10/25" },
];

const viewHighScores = () => {
    console.log("\n🏆 High Scores:");
    highScores.forEach((entry, index) => {
        console.log(`${index + 1}. ${entry.name} - ${entry.score} points (${entry.date})`);
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

    return highScores.findIndex(
        entry => entry.name === name && entry.score === score
    ) + 1;
};

// --- Utility: shuffle array ---
function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

// --- Math Questions ---
const generateMathQuestion = () => {
    const operators = ["+", "-", "*", "/"];
    const operator = operators[Math.floor(Math.random() * operators.length)];

    let num1, num2, correctAnswer;

    if (operator === "+") {
        num1 = Math.floor(Math.random() * 10) + 1;
        num2 = Math.floor(Math.random() * 10) + 1;
        correctAnswer = num1 + num2;
    } else if (operator === "-") {
        num1 = Math.floor(Math.random() * 10) + 1;
        num2 = Math.floor(Math.random() * 10) + 1;
        if (num2 > num1) [num1, num2] = [num2, num1];
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

    const choices = new Set([correctAnswer]);
    while (choices.size < 4) {
        const fake = correctAnswer + Math.floor(Math.random() * 10) - 5;
        if (fake >= 0) choices.add(fake);
    }

    const choicesArray = shuffleArray([...choices]);

    return {
        question: `What is ${num1} ${operator} ${num2}?`,
        choices: choicesArray,
        answerIndex: choicesArray.indexOf(correctAnswer)
    };
};

// --- Science Questions ---
function generateScienceQuestion() {
    const types = ["fact", "trueFalse"];
    const type = types[Math.floor(Math.random() * types.length)];

    if (type === "fact") {
        const q = {
            question: "What gas do plants absorb from the atmosphere?",
            choices: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"],
            answerIndex: 2
        };
        q.choices = shuffleArray(q.choices);
        return q;
    } else {
        const q = {
            question: "The Earth is the third planet from the Sun. True or False?",
            choices: ["True", "False"],
            answerIndex: 0
        };
        return q;
    }
}

// --- Reading Questions ---
function generateReadingQuestion() {
    const types = ["comprehension", "vocabulary"];
    const type = types[Math.floor(Math.random() * types.length)];

    if (type === "comprehension") {
        const passages = [
            {
                passage: "The sun rises in the east and sets in the west every day.",
                question: "Where does the sun rise?",
                choices: ["North", "South", "East", "West"],
                answerIndex: 2
            },
            {
                passage: "Birds use their wings to fly and migrate long distances.",
                question: "What do birds use to fly?",
                choices: ["Legs", "Wings", "Beaks", "Tails"],
                answerIndex: 1
            }
        ];
        const item = passages[Math.floor(Math.random() * passages.length)];
        const choicesArray = shuffleArray(item.choices);
        return {
            question: `${item.passage}\n\n${item.question}`,
            choices: choicesArray,
            answerIndex: choicesArray.indexOf(item.choices[item.answerIndex])
        };
    } else {
        const vocab = [
            {
                question: "Select the synonym for 'happy'.",
                choices: ["Sad", "Angry", "Joyful", "Tired"],
                answerIndex: 2
            },
            {
                question: "Select the antonym for 'hot'.",
                choices: ["Cold", "Warm", "Boiling", "Mild"],
                answerIndex: 0
            }
        ];
        const item = vocab[Math.floor(Math.random() * vocab.length)];
        const choicesArray = shuffleArray(item.choices);
        return {
            question: item.question,
            choices: choicesArray,
            answerIndex: choicesArray.indexOf(item.choices[item.answerIndex])
        };
    }
}

// --- Language Questions ---
function generateLanguageQuestion() {
    const types = ["grammar", "synonym"];
    const type = types[Math.floor(Math.random() * types.length)];

    if (type === "grammar") {
        const questions = [
            {
                question: "Choose the correct sentence:",
                choices: [
                    "She don't like apples.",
                    "She doesn't like apples.",
                    "She didn't likes apples.",
                    "She don't likes apples."
                ],
                answerIndex: 1
            },
            {
                question: "Which sentence is correct?",
                choices: [
                    "I goes to school.",
                    "I go to school.",
                    "I going to school.",
                    "I goed to school."
                ],
                answerIndex: 1
            }
        ];
        const q = questions[Math.floor(Math.random() * questions.length)];
        const choicesArray = shuffleArray(q.choices);
        return {
            question: q.question,
            choices: choicesArray,
            answerIndex: choicesArray.indexOf(q.choices[q.answerIndex])
        };
    } else {
        const questions = [
            {
                question: "Which word is a synonym for 'quick'?",
                choices: ["Fast", "Slow", "Lazy", "Late"],
                answerIndex: 0
            },
            {
                question: "Which word is a synonym for 'strong'?",
                choices: ["Weak", "Powerful", "Tiny", "Short"],
                answerIndex: 1
            }
        ];
        const q = questions[Math.floor(Math.random() * questions.length)];
        const choicesArray = shuffleArray(q.choices);
        return {
            question: q.question,
            choices: choicesArray,
            answerIndex: choicesArray.indexOf(q.choices[q.answerIndex])
        };
    }
}

// --- EXPORT ---
module.exports = {
    highScores,
    viewHighScores,
    updateHighScores,
    generateMathQuestion,
    generateScienceQuestion,
    generateReadingQuestion,
    generateLanguageQuestion
};