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


async function removePrompts() {
    let removePrompt  = await inquirer.prompt({
        name: "removes",
        type: "list",
        message: "What do you wish to remove?",
        choices: ["Employee", "Department", "Role", "Back"],
    });
    if (removePrompt.removes === "Employee") {
        removeEmployee();
    } else if (removePrompt.removes === "Department") {
        removeDepartment();
    } else if (removePrompt.removes === "Role") {
        removeRole();
    } else {
        startPrompts();
    }
}


function addRole() {
    inquirer
    .prompt([
        {
            name: "role",
            type: "input",
            message: "Name of new role",
        },
        {
            name: "deptId",
            type: "input",
            message: "Input department ID",
        },
        {
            name: "salary",
            type: "input",
            message: "Salary for Role",
        },
    ])
    .then((data) => {
        connection.query(
            "INSERT INTO roles_tbl SET ?",
            {
                title: data.role,
                salary: data.salary,
                department_id: data.deptId,
            }
            function (err) {
                if (err) throw err;
                console.log("New Role was Created!");
                startPrompts();
            }
        );
    });
}

function addDepartment() {
    inquirer
    .prompt([
        {
            name: "dept",
            type: "input",
            message: "Name of new department",
        }, 
    ])
    .then((data) => {
        connection.query(
            "INSERT INTO departments_tbl SET ?",
            {
                department_name: data.dept,
            },
            function (err) {
                if (err) throw err;
                console.log("New Department was Created!");
                startPrompts();
            }
        );
    });
}

function addEmployee() {
    inquirer
    .prompt([
        {
            name: "firstName",
            type: "input",
            message: "New employee's first name",
        },
        {
            name: "lastName",
            type: "input",
            message: "New employee's last name",
        },
        {
            name: "roleId",
            type: "input",
            message: "New employee's role ID",
        },
        {
            name: "managerId",
            type: "input",
            message: "New employee's manager ID",
        },
    ])
    .then((data) => {
        connection.query(
            "INSERT INTO employees_tbl SET ?",
            {
                first_name: data.firstName,
                last_name: data.lastName,
                role_id: data.roleId,
                manager_id: data.managerID,
            },
            function (err) {
                if (err) throw err;
                console.log("New Employee was Created!");
                startPrompts();
            }
        );
    });
}


function viewRole() {
    connection.query("SELECT * FROM roles_tbl", function (err, res) {
        if (err) throw err;
        console.log("");
        console.table(res);
        startPrompts();
    });
}

function viewDepartment() {
    connection.query("SELECT * FROM departments_tbl", function (err, res) {
        if (err) throw err;
        console.log("");
        console.table(res);
        startPrompts();
    });
}

function viewEmployee() {
    connection.query("SELECT * FROM employees_tbl", function (err, res) {
        if (err) throw err;
        console.log("");
        console.table(res);
        startPrompts();
    });
}


function updateRole() {
    connection.query("SELECT * FROM roles_tbl", (err, res) => {
        if (err) throw err;
        console.log("");
        console.table(res); 
        console.log("");
        inquirer
        .prompt([
            {
                name: "roleId",
                type: "input",
                message: "Enter Role ID to update",
            },
            {
                name: "role",
                type: "input",
                message: "Name of updated role",
            },
            {
                name: "deptId",
                type: "input",
                message: "Updated department ID",
            },
            {
                name: "salary",
                type: "input",
                message: "Updated salary for role",
            },
        ])
        .then((data) => {
            connection.query(
                "UPDATE roles_tbl SET ? WHERE ?",
                [
                    {
                        title: data.role,
                        department_id: data.deptId,
                        salary: data.salary,
                    },
                    { id: data.roleId },
                ],
                (err, res) => {
                    if (err) throw err;
                    console.log("Role successfully updated!");
                    startPrompts();
                }
            );
        });
    });
}

function updateDepartment() {
    connection.query("SELECT * FROM departments_tbl", (err, res) => {
        if (err) throw err;
        console.log("");
        console.table(res);
        console.log("");
        inquirer
        .prompt([
            {
                name: "deptId",
                type: "input",
                message: "Enter department ID to update",
            },
            {
                name: "dept",
                type: "input",
                message: "Name of Updated Department",
            },
        ])
        .then((data) => {
            connection.query(
                "UPDATE departments_tbl SET ? WHERE?",
                [
                    {
                        department_name: data.dept
                    },
                    { id: data.deptId },
                ],
                (err, res) => {
                    if (err) throw err;
                    console.log("Department successfully updated!");
                    startPrompts();
                }
            );
        });
    });
}

function updateEmployee() {
    connection.query("SELECT * FROM employees_tbl", (err, res) => {
      if (err) throw err;
      console.log("");
      console.table(res);
      console.log("");
      inquirer
        .prompt([
          {
            name: "empId",
            type: "input",
            message: "Enter Employee ID to update"
          },
          {
            name: "firstName",
            type: "input",
            message: "First name of updated employee"
          },
          {
            name: "lastName",
            type: "input",
            message: "Last name of updated employee"
          },
          {
            name: "roleId",
            type: "input",
            message: "Updated role ID for employee"
          },
          {
            name: "managerId",
            type: "input",
            message: "Updated manager ID for employee"
          }
        ])
        .then((data) => {
          connection.query(
            "UPDATE employees_tbl SET ? WHERE ?",
            [
              {
                first_name: data.firstName,
                last_name: data.lastName,
                role_id: data.roleId,
                manager_id: data.managerId
              },
              { id: data.empId },
            ],
            (err, res) => {
              if (err) throw err;
              console.log("Employee successfully updated");
              startPrompts();
            }
          );
        });
    });
  }


  