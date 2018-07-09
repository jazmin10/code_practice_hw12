// ================== GLOBAL VARIABLES ==================

	// Import packages
	var inquirer = require("inquirer");
	var mysql = require("mysql");

	// Database connection settings
	var connection = mysql.createConnection({
		host: "localhost",
		port: 3306,
		user: "root",
		password: "root",
		database: "bamazon2_db"
	});


// ================== FUNCTIONS ==================


// ================== MAIN PROCESSES ==================

	connection.connect(function(err) {
		if (err) throw err;
		connection.end();
	});
