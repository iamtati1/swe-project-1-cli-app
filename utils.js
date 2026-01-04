const prompt = require("prompt-sync")({ sigint: true });

const getInput = (message, timeLimitMs = null) => {
    if (!timeLimitMs) {
        return prompt(message);
    }

    const start = Date.now();
    const input = prompt(message);
    const elapsed = Date.now() - start;

    if (elapsed > timeLimitMs) {
        return null; // timed out
    }

    return input;
};

module.exports = { getInput };
