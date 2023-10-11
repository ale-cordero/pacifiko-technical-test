//Task 1: Product Search
//creamos una lista de prodcutos que vamos a usar 
var products = [
  { product_id: 1, product_name: 'Producto 1', price: 10.99 },
  { product_id: 2, product_name: 'Producto 2', price: 19.99 },
  { product_id: 3, product_name: 'Producto 3', price: 5.99 },
];

function getProductByname(productList, productName)
{
	for (var p of productList)
	{
		var currentProductName = p.product_name.toLowerCase();
		
		if(currentProductName.includes(productName.toLowerCase()))
		{
			return p;
		}
	}
	
	return null;
	
}

//Task 2: Cart Total

// Lista de productos a usar 
var products = [
  { product_id: 1, product_name: 'Producto 1', price: 10.99 },
  { product_id: 2, product_name: 'Producto 2', price: 19.99 },
  { product_id: 3, product_name: 'Producto 3', price: 5.99 },
];
//shopping cart 
var cart = [
  { product_id: 1, quantity: 2 },
  { product_id: 2, quantity: 1 },
  { product_id: 3, quantity: 3 },
];


function calculateTotalPrice(cart, productList) {
  let totalPrice = 0;

  for (var cartItem of cart) {
    var product = productList.find(p => p.product_id === cartItem.product_id);

    if (product) {
      totalPrice += product.price * cartItem.quantity;
    }
  }

  return totalPrice;
}


//Task 3: Discount Calculation

// Lista de productos en el carrito
var cart = [
  { product_id: 1, price: 10.99, discount_percentage: 10 },
  { product_id: 2, price: 19.99, discount_percentage: 20 },
  { product_id: 3, price: 5.99, discount_percentage: 5 },
];


function calculateTotalPriceWithDiscounts(cart) {
  let totalPrice = 0;

  for (var cartItem of cart) {
    // Calcular el precio después del descuento
    var discountedPrice = cartItem.price - (cartItem.price * (cartItem.discount_percentage / 100));
    
    // Agregar el precio del producto con descuento al precio total
    totalPrice += discountedPrice;
  }

  return totalPrice;
}


//Task 4: Top Selling Products

// Lista de ordenes
var orders = [
  { product_id: 1, quantity: 5 },
  { product_id: 2, quantity: 3 },
  { product_id: 3, quantity: 8 },
  { product_id: 1, quantity: 4 },
  { product_id: 2, quantity: 6 },
];


function findTopSellingProducts(orders, N) {
  var productSales = new Map();

  // Procesar la lista de ordenes y calcular las cantidades vendidas por producto
  for (var order of orders) {
    var { product_id, quantity } = order;
    if (productSales.has(product_id)) {
      productSales.set(product_id, productSales.get(product_id) + quantity);
    } else {
      productSales.set(product_id, quantity);
    }
  }

  // Ordenar los productos por cantidad vendida en orden descendente
  var sortedProducts = [...productSales.entries()].sort((a, b) => b[1] - a[1]);

  // Tomar los primeros N productos de la lista ordenada
  var topProducts = sortedProducts.slice(0, N);

  // Crear una lista de los IDs de los productos más vendidos
  var topProductIds = topProducts.map(product => product[0]);

  return topProductIds;
}


