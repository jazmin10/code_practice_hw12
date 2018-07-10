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

	// Displays a list of every available item
	function viewAll() {

		// Grabs products information from the database
		connection.query("SELECT * FROM products", function(err, readRes) {

				if (err) throw err;

				// Console logs each product along with id, price, and quantity
				readRes.forEach(function(product) {
					
					var str = "id: " + product.item_id;
					str += " | product: " + product.product_name;
					str += " | price: $" + product.price;
					str += " | quantity: " + product.stock_quantity;

					console.log(str);
				});
		});
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
					viewAll();
					break;
				case "View Low Inventory":
					viewLow();
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