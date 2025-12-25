const highScores = [
    { name: "tati", score: 100, date: "12/4/25" }
];

const viewHighScores = () => {
    console.log("\n🏆 High Scores:");
    highScores.forEach((entry, index) => {
        console.log(
            `${index + 1}. ${entry.name} - ${entry.score} points (${entry.date})`
        );
    });
};

const updateHighScores = (name, score) => {
    highScores.push({
        name,
        score,
        date: new Date().toLocaleDateString()
    });

    highScores.sort((a, b) => b.score - a.score);
};

module.exports = {
    highScores,
    viewHighScores,
    updateHighScores
};
module.exports = {
    highScores,
    viewHighScores,
    updateHighScores
};
