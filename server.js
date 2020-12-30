const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table");


const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "vegetable",
    database: "employee_tracker_db",
});

connection.connect((err) => {
if (err) throw err;
startPrompts()
});


async function startPrompts() {
    let firstPrompt = await inquirer.prompt({
        name: "start",
        type: "list",
        message: "What would you like to do?",
        choices: ["Add", "View", "Update", "Remove", "End"],
    });
    if (firstPrompt.start === "Add") {
        addPrompts();  
    } else if (firstPrompt.start === "View") {
        viewPrompts();
    } else if (firstPrompt.start === "Update") {
        updatePrompts();
    } else if (firstPrompt.start === "Remove") {
        removePrompts();
    } else {
        connection.end();
    }

}


