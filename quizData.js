const questions = [
    {
        question: "What is 2 + 2?",
        choices: ["3", "4", "5", "6"],
        answerIndex: 1
    },
    // Add more questions later!
    {
        question: "What is 5*6",
        choices: ["3", "56", "30", "11"],
        answerIndex: 2
    },
    {
        question: "What is 15 / 3?",
        choices: ["4", "5", "3", "6"],
        answerIndex: 1
    }
];

const highScores = [
    { name: 'tati', score: 100, date: "12/4/25" },
    { name: 'zohran', score: 90, date: "12/7/25" },
    { name: 'amias', score: 75, date: "12/10/25" },
];

const viewHighScores = () => {
    console.group("\n🏆 High Scores:");

    highScores.forEach((entry, index) => {
        console.log(
            `${index + 1}. ${entry.name} - ${entry.score} points (${entry.date})`
        );
    });
    console.log("");
};
module.exports = { questions, highScores, viewHighScores };