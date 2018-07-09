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

	// Holds the list of items in the database
	var itemsArr = [];

// ================== FUNCTIONS ==================

	// Returns an array of the list of items that are being sold
	function setChoices(list) {

		var choicesArr = [];

		// loops through the list and ...
		list.forEach(function(item) {

			// creates a nice string of the item being sold
			var displayString = "product: " + item.product_name + " | price: " + item.price;

			// adds the string to the choicesArr
			choicesArr.push(displayString);
		});

		// Returns the choicesArr
		return choicesArr;
	}


// ================== MAIN PROCESSES ==================

	// Connect to the database
	connection.connect(function(err) {
		if (err) throw err;

		// Grab items stored in the database and ...
		connection.query("SELECT * FROM products", function(err, readResults) {
			if (err) throw err;

			// Set the questions that will be asked to the user
			var mainPrompt = [{
				name: "item",
				type: "list",
				message: "Select item you want to purchase: ",
				// create an array of choices with the list of items returned from the database
				choices: setChoices(readResults)
			}, {
				name: "amount",
				type: "input",
				message: "How many?"
			}];

			// Ask the user the product they want to purchase and quantity
			inquirer.prompt(mainPrompt).then(function(answers) {
				console.log(answers);
				connection.end();
			});

		});
		
	});

	