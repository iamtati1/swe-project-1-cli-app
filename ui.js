const chalk = require("chalk").default;

const showTitle = () => { //prints ASCII + welcome message
    console.log(
        chalk.cyan(`
██████╗ ██████╗  █████╗ ██╗███╗   ██╗
██╔══██╗██╔══██╗██╔══██╗██║████╗  ██║
██████╔╝██████╔╝███████║██║██╔██╗ ██║
██╔══██╗██╔══██╗██╔══██║██║██║╚██╗██║
██████╔╝██║  ██║██║  ██║██║██║ ╚████║
╚═════╝ ╚═╝  ╚╝╚═╝  ╚═╝╚═╝╚═╝  ╚═══╝

 ██████╗  █████╗ ███╗   ███╗███████╗   ██╗
██╔════╝ ██╔══██╗████╗ ████║██╔════╝   ██║
██║  ███╗███████║██╔████╔██║█████╗     ██║
██║   ██║██╔══██║██║╚██╔╝██║██╔══╝     ╚═╝
╚██████╔╝██║  ██║██║ ╚═╝ ██║███████╗   ██╗
 ╚═════╝ ╚═╝  ╚═╝╚═╝     ╚═╝╚══════╝   ╚═╝
`)
    );

    console.log(theme.correct("🧠 ") + theme.score("Welcome to Brain Game!") + theme.correct(" 🧠"));
};

// Menu

const showMainMenu = () => { //prints menu options
    console.log(chalk.cyanBright.bold("\n📋 MAIN MENU"));
    console.log(chalk.gray("━━━━━━━━━━━━━━━━━━━━━━━━━━"));

    console.log(chalk.green("  1️⃣  Play Round"));
    console.log(chalk.yellow("  2️⃣  View High Scores"));
    console.log(chalk.red("  3️⃣  How to Play"));
    console.log(chalk.white("  4️⃣  Exit"));

    console.log(chalk.gray("━━━━━━━━━━━━━━━━━━━━━━━━━━"));
    process.stdout.write(chalk.magentaBright("👉 Choose an option: "));
};

const theme = {
    question: chalk.whiteBright,
    correct: chalk.greenBright.bold,
    wrong: chalk.redBright.bold,
    score: chalk.yellowBright,
    info: chalk.magentaBright,
    divider: chalk.gray,
};

const icons = {
    correct: "✔",
    wrong: "❌",
    trophy: "🏆",
    fire: "🔥",
    clock: "⏱️",
};

const divider = () => {
    console.log(theme.divider("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"));
};

const clearScreen = () => console.clear();

const space = () => console.log("\n"); // helpers (divider, clearScreen, space)

const showCorrect = () => {
    console.log(theme.correct(`${icons.correct} Correct!`));
};

const showWrong = () => {
    console.log(theme.wrong(`${icons.wrong} Incorrect.`));
};

const showScore = (score, total) => {
    console.log(theme.score(`⭐ Score: ${score}/${total}`));
};

const showProgress = (current, total) => {      // feedback( showCorrect, showWrong, showScore, showProgress)
    const filled = "█".repeat(current);
    const empty = "░".repeat(total - current);
    console.log(`[${filled}${empty}] ${current}/${total}`);
};

const loading = async (text = "Loading") => { // loading(), countdown() > async animations
    process.stdout.write(theme.info(text));
    for (let i = 0; i < 3; i++) {
        await new Promise(r => setTimeout(r, 400));
        process.stdout.write(".");
    }
    console.log();
};

const countdown = async () => {
    for (let i = 3; i > 0; i--) {
        console.log(theme.info(i + "..."));
        await new Promise(r => setTimeout(r, 700));
    }
    console.log(theme.info("GO!\n"));
};

const showRoundSummary = ({ correct, total, percentage }) => {
    divider();                                                  //showRoundSummary
    console.log(theme.info("🏁 ROUND COMPLETE"));
    divider();

    console.log(`${icons.correct} Correct: ${correct}`);
    console.log(`${icons.wrong} Wrong: ${total - correct}`);
    console.log(`🎯 Accuracy: ${percentage}%`);
};

module.exports = {
    theme,
    icons,
    divider,
    clearScreen,
    space,
    showCorrect,
    showWrong,
    showScore,
    showMainMenu,
    showProgress,
    loading,
    countdown,
    showRoundSummary,
    showTitle,
};
