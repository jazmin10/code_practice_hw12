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

		// loops through the list and adds nicely formatted choices to the choicesArr
		list.forEach(function(item) {

			var displayString = "product: " + item.product_name + " | price: " + item.price;

			choicesArr.push(displayString);
		});

		return choicesArr;
	}

	// Find the information of the product chosen by finding its object in the itemsArr
	function findProduct(str) {

		// We first find the name of the product
		// In other words, we want "apples" NOT "product: apples | price: 1.49"
		var start = str.indexOf(":") + 2;
		var end = str.indexOf("|") - 1;
		var productName = str.slice(start, end);

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

	// Complete the purchase if there is enough product in stock
	function makePurchase(answers) {
		
		// First, we find the information of the product chosen by the user
		var productChosen = findProduct(answers.item);

		var qtyRequested = parseInt(answers.amount);

		// If there isn't enough product to fulfill the purchase, then notify the user
		if (productChosen.stock_quantity < qtyRequested) {
			console.log("Insufficient quantity!");
			connection.end();
		}
		// If there is enough product in stock, then complete the purchase
		else {

			var total = qtyRequested * productChosen.price;
			console.log("The total will be: $" + total);

			// updateDatabase(productChosen, qtyPurchased);
		}

	}

	// function updateDatabase(product, qtyPurchased) {
		
	// }

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

			// Ask the user the product they want to purchase and quantity, then complete the purchase
			inquirer.prompt(mainPrompt).then(makePurchase);

		});
		
	});

	