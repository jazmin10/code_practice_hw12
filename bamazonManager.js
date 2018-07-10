// ================== GLOBAL VARIABLES ==================
	// Import packages
	var inquirer = require("inquirer");
	var mysql = require("mysql");

	// Setting up connection
	var connection = mysql.createConnection({
		host: "localhost",
		port: 3306,
		user: "root",
		password: "root",
		database: "bamazon2_db"
	});

	// Prompt questions
	var mainPrompt = [{
		name: "command",
		type: "list",
		message: "Pick an option: ",
		choices: [
			"View Products for Sale", 
			"View Low Inventory", 
			"Add to Inventory", 
			"Add New Product"
		]
	}];

// ================== FUNCTIONS ==================

// ================== MAIN PROCESSES ==================

	// Connect to the database
	connection.connect(function(err) {
		if (err) throw err;

		// Ask user the command they would like to execute
		inquirer.prompt(mainPrompt).then(function(answer) {
			
			// Execute the command chosen by the user
			switch (answer.command) {
				case "View Products for Sale":
					console.log("view all products");
					break;
				case "View Low Inventory":
					console.log("view products with less than 5 items");
					break;
				case "Add to Inventory":
					console.log("update inventory");
					break;
				case "Add New Product":
					console.log("add a product");
					break;
			}

			connection.end();

		});
	});