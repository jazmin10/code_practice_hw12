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

		// Will store the array of the choices that will be used in the prompt questions
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

	// Find the information of the product chosen by finding its object in the itemsArr
	function findProduct(str) {

		// Set the start index and end index of where we will be slicing our string
		var start = str.indexOf(":") + 2;
		var end = str.indexOf("|") - 1;

		// Storing the name of the product chosen by slicing the string
		// In other words, we want "apples" NOT "product: apples | price: 1.49"
		var productName = str.slice(start, end);

		// Will store the object of the product chosen
		var product = {};

		// Loop through our items array and ...
		itemsArr.forEach(function(item) {

			// If the product name of the object matches the productName, then set
			// product to the current object
			if (item.product_name === productName) {
				product = item;
			}
		});

		// Return the product's object
		return product;

	}

	// Submit the purchase by...
	function makePurchase(answers) {
		
		// Finding the information of the product chosen by the user
		var productChosen = findProduct(answers.item);

		connection.end();
	}

// ================== MAIN PROCESSES ==================

	// Connect to the database
	connection.connect(function(err) {
		if (err) throw err;

		// Grab items stored in the database and ...
		connection.query("SELECT * FROM products", function(err, readResults) {
			if (err) throw err;

			// Set itemsArr equal to readResults
			itemsArr = readResults;


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

			// Ask the user the product they want to purchase and quantity, then make purchase
			inquirer.prompt(mainPrompt).then(makePurchase);

		});
		
	});

	