const { showMenu } = require('./menu');
// This is the main entry point for the application.
const startApp = () => {
    console.clear();
    console.log("Welcome to Brain Game!");
    showMenu();
    console.log("\nGoodbye!");
}

startApp();