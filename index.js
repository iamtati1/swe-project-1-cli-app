const prompt = require("prompt-sync")();
const { showMenu } = require("./menu");
const quizData = require("./quizData");
const { getInput } = require("./index");


// This is the main entry point for the application.
const startApp = () => {
    console.clear();
    console.log("🧠 Welcome to Brain Game!\n");

    const ready = prompt("Are you ready to start? (y/n): ").toLowerCase();

    if (ready !== "y") {
        console.log("\n👋 Come back when you're ready!");
        return;
    }

    console.log("\n🚀 Starting quiz...\n");
    showMenu();

    console.log("\nGoodbye!");
};

startApp();

module.exports = { getInput };