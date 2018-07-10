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

	// Grabs the list of products stored in the database
	function listProducts(cb) {

		connection.query("SELECT * FROM products", function(err, results) {

			if (err) throw err;

			// Once the products are grabbed from the database, execute the function passed
			cb(results);
		});
	}

	// Displays every available product
	function viewAll(list) {

		// Console logs each product along with id, price, and quantity
		list.forEach(function(product) {
			
			var str = "id: " + product.item_id;
			str += " | product: " + product.product_name;
			str += " | price: $" + product.price;
			str += " | quantity: " + product.stock_quantity;

			console.log(str);
		});

		connection.end();
	}

	// Displays a list of products with low inventory
	function viewLow() {

		var queryStr = "SELECT * FROM products WHERE stock_quantity < 5";

		// Grabs from the database the list of products with less than 5 items in stock
		connection.query(queryStr, function(err, lowInvRes) {

			if (err) throw err;

			// Console logs each product along with id and quantity
			lowInvRes.forEach(function(product) {
				var str = "id: " + product.item_id;
				str += " | product: " + product.product_name;
				str += " | quantity: " + product.stock_quantity;

				console.log(str);

			});
		});

		connection.end();

	}


	// Adds inventory to a specific product
	function addInventory(list) {

		var addPrompt = [{
			name: "product",
			type: "list",
			message: "Which product would you like to add inventory to?",
			choices: setChoices(list)
		}, {
			name: "amount",
			type: "input",
			message: "Enter the amount of inventory you would like to add to the product: "
		}];

		// Prompt user to pick a product and the quantity of units they want to add to stock
		inquirer.prompt(addPrompt).then(function(addRes) {
			var prodArr = addRes.product.split("|");

			var productID = findNum(prodArr[0].trim());
			var newQty = findNum(prodArr[2].trim()) + parseInt(addRes.amount);
			
			var addQuery = "UPDATE products SET ? WHERE ?";

			// Updates product's stock_quantity with new amount
			connection.query(addQuery, [{stock_quantity: newQty}, {item_id: productID}], function(err) {
				if (err) throw err;

				console.log("The product's stock quantity is now: " + newQty + " units");
			});

			connection.end();

		});

	}

	// Returns an array that can be used as choices for an inquirer question object
	function setChoices(arrProds) {

		var choicesArr = [];

		// loops through the array of products and adds a nicely formatted product to the choicesArr
		arrProds.forEach(function(item) {
			var choiceStr = "id: " + item.item_id;
			choiceStr += " | product: " + item.product_name;
			choiceStr += " | quantity: " + item.stock_quantity;

			choicesArr.push(choiceStr);
		});

		return choicesArr;
	}

	// Returns the number in the string
	// Example: given "id: 1", it will return 1
	function findNum(str) {
		var numValue = "";

		var start = str.indexOf(":") + 1;

		numValue = str.slice(start);

		return parseInt(numValue);
		
	}

// ================== MAIN PROCESSES ==================

	// Connect to the database
	connection.connect(function(err) {
		if (err) throw err;

		// Ask user the command they would like to execute
		inquirer.prompt(mainPrompt).then(function(answer) {
			
			// Execute the command chosen by the user
			switch (answer.command) {
				case "View Products for Sale":
					// viewAll();
					listProducts(viewAll);
					break;
				case "View Low Inventory":
					viewLow();
					break;
				case "Add to Inventory":
					listProducts(addInventory);
					break;
				case "Add New Product":
					console.log("add a product");
					break;
			}

		});
	});