DROP DATABASE IF EXISTS employee_tracker_db;

CREATE DATABASE employee_tracker_db;

USE employee_tracker_db;

CREATE TABLE departments (
	id INT AUTO_INCREMENT PRIMARY KEY,
    department_name VARCHAR(30) NOT NULL
);    

CREATE TABLE roles (
	id int AUTO_INCREMENT PRIMARY KEY,
    title varchar(30) not null,
    salary decimal(10, 2) not null,
    department_id INT NOT NULL
);    
    
    
CREATE TABLE employees (
	id int AUTO_INCREMENT PRIMARY KEY,
    first_name varchar(30),
    role_id INT NOT NULL,
    manager_id INT NOT NULL
);