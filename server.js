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


async function addPrompts() {
    let addPrompt = await inquirer.prompt({
        name: "adds",
        type: "list",
        message: "What do you wish to add?",
        choices: ["Employee", "Department", "Role", "Back"]
    });
    if (addPrompt.adds === "Employee") {
        addEmployee();
    } else if (addPrompt.adds === "Department") {
        addDepartment();
    } else if (addPrompt.adds === "Role") {
        addRole();
    } else {
        startPrompts();
    }
}


async function viewPrompts() {
    let viewPrompt = await inquirer.prompt({
        name: "views",
        type: "list",
        message: "What do you wish to view?",
        choices: ["Employee", "Department", "Role", "Back"],
    });
    if (viewPrompt.views === "Employee") {
        viewEmployee();
    } else if (viewPrompt.views === "Department") {
        viewDepartment();
    } else if (viewPrompt.views === "Role") {
        viewRole();
    } else {
        startPrompts();
    }
}


async function updatePrompts() {
    let updatePrompt = await inquirer.prompt({
        name: "updates",
        type: "list",
        message: "What do you wish to update?",
        choices: ["Employee", "Department", "Role", "Back"],
    });
    if (updatePrompt.updates === "Employee") {
        updateEmployee();
    } else if (updatePrompt.updates === "Department") {
        updateDepartment();
    } else if (updatePrompt.updates === "Role") {
        updateRole();
    } else {
        startPrompts();
    }
}