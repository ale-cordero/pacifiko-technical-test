USE pacifiko

--Display a list of products and their stock quantities.
CREATE PROCEDURE [dbo].[GetProductsStock]
AS
BEGIN

	SELECT P.product_name, 
	P.product_id,
	(P.quantity - ISNULL(SUM(PS.SALES),0)) AS STOCK
	FROM Products P WITH(NOLOCK)
	LEFT JOIN ( SELECT I.product_id, SUM(I.quantity) AS SALES
	FROM OrderItems I  WITH(NOLOCK) 
	GROUP BY I.product_id) AS PS ON P.product_id = PS.product_id
	GROUP BY P.product_name, P.product_id, STOCK;
	
END;

--Allow the user to search for products by their name.

CREATE PROCEDURE [dbo].[GetProductByName] @ProductName AS VARCHAR(100)
AS
BEGIN
	
	SELECT P.product_name, 
	P.product_id,
	(P.quantity - ISNULL(SUM(PS.SALES),0)) AS STOCK
	FROM Products P WITH(NOLOCK)
	LEFT JOIN ( SELECT I.product_id, SUM(I.quantity) AS SALES
	FROM OrderItems I  WITH(NOLOCK) 
	GROUP BY I.product_id) AS PS ON P.product_id = PS.product_id
	WHERE P.product_name LIKE '%' + @ProductName + '%'
	GROUP BY P.product_name, P.product_id, STOCK;
		
END;

--Allow the user to place an order by selecting a customer and adding order items
--para este caso se crean 2 procedimientos almacenados el primero inserta la orden y devuelve el PK 
--del registro ingresado para luego usarlo en el segundo SP par insertar el detalle de la orden.
CREATE PROCEDURE [dbo].[NewOrder] @CustomerId INT
AS
BEGIN
	
	DECLARE pkOrder INT;
	
	INSERT INTO Orders (customer_id, order_date)
	VALUES(@CustomerId, GETDATE());
	
	SET @pkOrder = SCOPE_IDENTITY();
	
	SELECT @pkOrder AS OrderId;

END;

--por cada item de la orden se llama al SP para insertar el detalle
CREATE PROCEDURE [dbo].[InsertOrderDetail] @OrderId INT,
@ProductId INT, 
@Quantity INT,
@SubTotal DOUBLE(12,3)
AS
BEGIN

	INSERT INTO OrderItems (order_id, product_id, quantity, subtotal)
	VALUES (@OrderId, @ProductId, @Quantity, @SubTotal);

END;