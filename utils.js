const prompt = require("prompt-sync")();

const getInput = (message) => {
    const input = prompt(message).trim().toLowerCase();

    if (input === "q" || input === "exit") {
        console.log("\n👋 Exiting the quiz. See you next time!");
        process.exit(0);
    }

    return input;
};

module.exports = { getInput };
