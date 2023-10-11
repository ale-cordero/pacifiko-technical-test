USE pacifiko

CREATE PROCEDURE [dbo].[GetCustomerTotalRevByCustumerId] @CustomerId AS INT 
AS
BEGIN

	SELECT SUM(I.subtotal) AS CustomerRevenue FROM Customers C WITH(NOLOCK) 
	INNER JOIN  Orders O WITH(NOLOCK) ON C.customer_id = O.customer_id
	INNER JOIN OrderItems I WITH(NOLOCK) ON I.order_id = O.order_id
	WHERE C.customer_id = @CustomerId;

END;