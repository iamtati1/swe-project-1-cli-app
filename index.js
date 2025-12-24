const { showMenu } = require('./menu');
// This is the main entry point for the application.
const startApp = () => {
    console.clear();
    console.log("Welcome to Brain Game!");
    showMenu();
    console.log("\nGoodbye!");
}
//we added the 1st round now we have to add more rounds and I would like to find a way to update the stats with who is scoring the highest in real time.
const prompt = require("prompt-sync")();
const quizData = require("./quizData");

console.log("🎉 Welcome to the Quiz!");
console.log("Test your knowledge and see how high you can score.\n");

const ready = prompt("Are you ready to start? (y/n): ");

if (ready.toLowerCase() === "y") {
    console.log("\n🚀 Starting quiz...\n");
    // startQuiz(quizData);
} else {
    console.log("\n👋 Come back when you're ready!");
}



startApp();