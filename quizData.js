const fs = require("fs");
const path = require("path");

/* =========================
   PERSISTENT HIGH SCORES
========================= */
const scoresFile = path.join(__dirname, "scores.json");

const loadScores = () => {
    if (!fs.existsSync(scoresFile)) {
        return [
            { name: "tati", score: 3, date: "12/4/25" },
            { name: "zohran", score: 2, date: "12/7/25" },
            { name: "amias", score: 1, date: "12/10/25" }
        ];
    }
    return JSON.parse(fs.readFileSync(scoresFile, "utf-8")).map(entry => ({
        name: entry.name,
        score: entry.score,
        category: entry.category ?? "Math", // fallback
        accuracy: typeof entry.accuracy === "number" ? entry.accuracy : 0,
        timeSeconds: typeof entry.timeSeconds === "number" ? entry.timeSeconds : Infinity,
        date: entry.date
    }));
};

let highScores = loadScores();

const saveScores = () => {
    fs.writeFileSync(scoresFile, JSON.stringify(highScores, null, 2));
};

const viewHighScores = (category) => {
    console.log(`\n🏆 Top Scores — ${category}`);

    const filteredScores = highScores
        .filter(entry => entry.category === category)
        .sort((a, b) => b.score - a.score)
        .slice(0, 5);

    if (filteredScores.length === 0) {
        console.log("No scores yet for this category.");
        return;
    }

    filteredScores.forEach((entry, index) => {

        const accuracy =
            typeof entry.accuracy === "number"
                ? `${entry.accuracy}%`
                : "—";

        const time =
            typeof entry.timeSeconds === "number" && entry.timeSeconds !== Infinity
                ? `${entry.timeSeconds}s`
                : "—";

        console.log(
            `${index + 1}. ${entry.name} | ${entry.score} pts | ${time} | 🎯 ${accuracy}`
        );
    });
};

const updateHighScores = ({ name, score, category, timeSeconds, accuracy }) => {
    highScores.push({
        name,
        score,
        category,
        timeSeconds,
        accuracy,
        date: new Date().toLocaleDateString()
    });

    // 🧠 Sort: score DESC, time ASC
    highScores.sort((a, b) => {
        if (b.score !== a.score) return b.score - a.score;
        if (b.accuracy !== a.accuracy) return b.accuracy - a.accuracy;
        return a.timeSeconds - b.timeSeconds;
    });

    saveScores();
};

/* =========================
   UTILITY
========================= */
function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

/* =========================
   MATH QUESTIONS
========================= */
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

/* =========================
   SCIENCE QUESTIONS
========================= */
const scienceQuestions = [
    { question: "What gas do plants absorb from the atmosphere?", choices: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"], answerIndex: 2 },
    { question: "The Earth is the third planet from the Sun. True or False?", choices: ["True", "False"], answerIndex: 0 },
    { question: "Water freezes at 0 degrees Celsius. True or False?", choices: ["True", "False"], answerIndex: 0 },
    { question: "Which organ pumps blood through the body?", choices: ["Lungs", "Heart", "Kidneys", "Liver"], answerIndex: 1 },
    { question: "What force keeps us on the ground?", choices: ["Magnetism", "Friction", "Gravity", "Inertia"], answerIndex: 2 },
    { question: "The chemical symbol for gold is Au. True or False?", choices: ["True", "False"], answerIndex: 0 },
    { question: "What planet is known as the Red Planet?", choices: ["Mars", "Venus", "Jupiter", "Saturn"], answerIndex: 0 },
    { question: "What is the center of an atom called?", choices: ["Electron", "Proton", "Nucleus", "Neutron"], answerIndex: 2 },
    { question: "Which part of the plant conducts photosynthesis?", choices: ["Roots", "Stem", "Leaves", "Flowers"], answerIndex: 2 },
    { question: "Sound travels faster in water than in air. True or False?", choices: ["True", "False"], answerIndex: 0 },
    { question: "What gas do humans exhale?", choices: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Helium"], answerIndex: 1 },
    { question: "Lightning is caused by the buildup of electrical charges in clouds. True or False?", choices: ["True", "False"], answerIndex: 0 },
    { question: "Which planet has the most moons?", choices: ["Earth", "Mars", "Jupiter", "Saturn"], answerIndex: 2 },
    { question: "The process of water changing to vapor is called?", choices: ["Condensation", "Evaporation", "Precipitation", "Sublimation"], answerIndex: 1 },
    { question: "What is H2O commonly known as?", choices: ["Salt", "Water", "Oxygen", "Hydrogen"], answerIndex: 1 }
];

function generateScienceQuestion() {
    const index = Math.floor(Math.random() * scienceQuestions.length);
    const q = { ...scienceQuestions[index] };
    q.choices = shuffleArray([...q.choices]);
    q.answerIndex = q.choices.indexOf(scienceQuestions[index].choices[scienceQuestions[index].answerIndex]);
    return q;
}

/* =========================
   READING QUESTIONS
========================= */
const readingQuestions = [
    { passage: "Liam loves playing soccer after school. He practices every day to get better.", question: "Why does Liam practice soccer every day?", choices: ["To get better", "To make friends", "To watch TV", "To eat lunch"], answerIndex: 0 },
    { passage: "The library was quiet and full of books. Emma sat by the window and read her favorite story.", question: "Where did Emma sit while reading?", choices: ["By the window", "On the floor", "Under a tree", "At the cafeteria"], answerIndex: 0 },
    { passage: "During the storm, the wind blew strongly and the rain poured down. People stayed inside to stay safe.", question: "Why did people stay inside?", choices: ["To read books", "To stay safe", "To play games", "To go shopping"], answerIndex: 1 },
    { passage: "Sarah baked cookies for her friends. She decorated them with chocolate and sprinkles.", question: "What did Sarah add to decorate the cookies?", choices: ["Fruits", "Chocolate and sprinkles", "Icing only", "Nuts"], answerIndex: 1 },
    { passage: "The dog ran quickly across the yard. It chased after the bouncing ball happily.", question: "What was the dog chasing?", choices: ["A stick", "A ball", "A cat", "A bird"], answerIndex: 1 },
    { passage: "The students planted flowers in the school garden. They watered them carefully every day.", question: "What did the students do in the garden?", choices: ["Planted flowers", "Played soccer", "Painted walls", "Cleaned the classroom"], answerIndex: 0 },
    { passage: "Tom read a book about space. He learned about planets and stars far away from Earth.", question: "What did Tom learn about?", choices: ["Animals", "Planets and stars", "Cooking recipes", "History"], answerIndex: 1 },
    { passage: "The children waited in line patiently for the ice cream truck. Everyone was excited to choose their favorite flavor.", question: "Why were the children excited?", choices: ["To play outside", "To get ice cream", "To go home", "To watch TV"], answerIndex: 1 },
    { passage: "Maya practiced the piano for the school recital. She wanted to play her piece perfectly.", question: "Why did Maya practice the piano?", choices: ["To play perfectly at the recital", "To learn guitar", "To sing a song", "To watch a movie"], answerIndex: 0 },
    { passage: "The park was filled with colorful flowers and tall trees. People walked their dogs and enjoyed the fresh air.", question: "What could people do in the park?", choices: ["Walk dogs and enjoy nature", "Drive cars", "Swim in a pool", "Paint buildings"], answerIndex: 0 },
    { passage: "During recess, the children played tag on the playground. They ran and laughed together.", question: "What were the children doing during recess?", choices: ["Playing tag", "Eating lunch", "Reading books", "Drawing pictures"], answerIndex: 0 },
    { passage: "Anna wrote a letter to her grandmother. She told her about her new school and teachers.", question: "Who did Anna write to?", choices: ["Her friend", "Her grandmother", "Her teacher", "Her brother"], answerIndex: 1 },
    { passage: "Jacob watered the plants every morning. He wanted them to grow healthy and strong.", question: "Why did Jacob water the plants?", choices: ["To clean the garden", "To help them grow", "To play outside", "To feed animals"], answerIndex: 1 },
    { passage: "The streets were decorated with lights and banners for the festival. People walked around enjoying the celebration.", question: "What was happening on the streets?", choices: ["A festival celebration", "A sports game", "A school event", "A market sale"], answerIndex: 0 },
    { passage: "Ella put on her coat and boots. It was snowing outside and she wanted to stay warm.", question: "Why did Ella put on a coat and boots?", choices: ["To go swimming", "To stay warm in the snow", "To sleep", "To watch TV"], answerIndex: 1 }
];

function generateReadingQuestion() {
    const index = Math.floor(Math.random() * readingQuestions.length);
    const q = { ...readingQuestions[index] };
    q.choices = shuffleArray([...q.choices]);
    q.answerIndex = q.choices.indexOf(readingQuestions[index].choices[readingQuestions[index].answerIndex]);
    q.question = `${q.passage}\n\n${q.question}`;
    return q;
}

/* =========================
   LANGUAGE QUESTIONS
========================= */
const languageQuestions = [
    { question: "Choose the correct sentence:", choices: ["She don't like apples.", "She doesn't like apples.", "She didn't likes apples.", "She don't likes apples."], answerIndex: 1 },
    { question: "Which word is a synonym for 'quick'?", choices: ["Fast", "Slow", "Lazy", "Late"], answerIndex: 0 },
    { question: "Which is a plural noun?", choices: ["Cat", "Cats", "Dog", "Mouse"], answerIndex: 1 },
    { question: "Identify the verb in the sentence: 'She runs every morning.'", choices: ["She", "Runs", "Every", "Morning"], answerIndex: 1 },
    { question: "Choose the correct form: 'I ____ to the store yesterday.'", choices: ["Go", "Went", "Gone", "Going"], answerIndex: 1 },
    { question: "Which word is an adjective?", choices: ["Quickly", "Run", "Blue", "Happily"], answerIndex: 2 },
    { question: "Which is a proper noun?", choices: ["city", "apple", "London", "tree"], answerIndex: 2 },
    { question: "Choose the correct contraction for 'do not':", choices: ["Don't", "Doesn't", "Didnt", "Do'nt"], answerIndex: 0 },
    { question: "Select the correct past tense verb:", choices: ["Walk", "Walked", "Walking", "Walks"], answerIndex: 1 },
    { question: "Which is a pronoun?", choices: ["He", "Run", "Blue", "Apple"], answerIndex: 0 },
    { question: "Choose the correct article: 'I saw ____ elephant.'", choices: ["a", "an", "the", "no article"], answerIndex: 1 },
    { question: "Which word is a preposition?", choices: ["Under", "Run", "Happy", "Apple"], answerIndex: 0 },
    { question: "Select the correct plural form of 'child':", choices: ["Childs", "Childes", "Children", "Child"], answerIndex: 2 },
    { question: "Choose the correct sentence:", choices: ["They is going to the park.", "They are going to the park.", "They be going to the park.", "They am going to the park."], answerIndex: 1 },
    { question: "Which word is an adverb?", choices: ["Quick", "Quickly", "Blue", "Dog"], answerIndex: 1 }
];

function generateLanguageQuestion() {
    const index = Math.floor(Math.random() * languageQuestions.length);
    const q = { ...languageQuestions[index] };
    q.choices = shuffleArray([...q.choices]);
    q.answerIndex = q.choices.indexOf(languageQuestions[index].choices[languageQuestions[index].answerIndex]);
    return q;
}

/* =========================
   EXPORT
========================= */
module.exports = {
    highScores,
    viewHighScores,
    updateHighScores,
    generateMathQuestion,
    generateScienceQuestion,
    generateReadingQuestion,
    generateLanguageQuestion
};