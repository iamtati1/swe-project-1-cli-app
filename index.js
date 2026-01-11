//Main Application Entry Point
const prompt = require("prompt-sync")();
const { showMenu } = require("./menu");
const { clearScreen, showTitle } = require("./ui");

const startApp = () => {
    clearScreen();
    showTitle();

    const ready = prompt("Are you ready to start? (y/n): ").toLowerCase();
    prompt("\nPress Enter to continue...");

    if (ready !== "y") {
        console.log("\n👋 Come back when you're ready!");
        return;
    }

    console.log("\n🚀 Starting quiz...\n");

    showMenu();
};

startApp();
