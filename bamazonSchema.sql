
DROP DATABASE IF EXISTS bamazon2_db;

CREATE DATABASE bamazon2_db;

USE bamazon2_db;

CREATE TABLE products (
	item_id INTEGER(11) AUTO_INCREMENT NOT NULL PRIMARY KEY,
	product_name VARCHAR(100) NOT NULL,
	department_name VARCHAR(100) NOT NULL,
	price DECIMAL(10,2) NOT NULL,
	stock_quantity INTEGER(11) NOT NULL
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("apples", "produce", 1.49, 75);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("carrots", "produce", 1.75, 25);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("TV", "electronics", 75.99, 4);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("headphones", "electronics", 15.45, 15);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("cakes", "bakery", 22.75, 4);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("cookies", "bakery", 0.66, 150);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("cargo pants", "clothing", 23.50, 25);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("sandals", "clothing", 8.97, 13);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("toothpaste", "personal care", 2.49, 30);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("deodarant", "personal care", 3.50, 30);

