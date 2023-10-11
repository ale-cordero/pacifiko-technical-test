--create DATABASE
CREATE DATABASE pacifiko;

--table customers 
CREATE TABLE Customers (

customer_id INT IDENTITY(1,1) PRIMARY KEY,
first_name VARCHAR(100) NOT NULL,
last_name VARCHAR(100) NOT NULL,
email VARCHAR(100) NOT NULL,
phone VARCHAR(20)
);

--table products 
CREATE TABLE Products (

product_id INT IDENTITY(1,1) PRIMARY KEY,
product_name VARCHAR(100) NOT NULL,
price DOUBLE(12,3) NOT NULL,
stock_quantity INT NOT NULL
);

--table orders
CREATE TABLE Orders (

order_id INT IDENTITY(1,1) PRIMARY KEY,
customer_id INT NOT NULL,
order_date DATE NOT NULL,
FOREIGN KEY (customer_id) REFERENCES Customers(customer_id)
);

--table order items 
CREATE TABLE OrderItems (

order_item_id INT IDENTITY(1,1) PRIMARY KEY,
order_id INT NOT NULL,
product_id INT NOT NULL,
quantity INT NOT NULL,
subtotal DOUBLE(12,3) NOT NULL,
FOREIGN KEY (order_id) REFERENCES Orders(order_id),
FOREIGN KEY (product_id) REFERENCES Products(product_id)
);