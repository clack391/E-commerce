// using global fetch in Node 18+

async function testApi() {
    const baseUrl = 'http://localhost:8080';

    console.log('--- Testing Products API ---');

    // 1. Create a Product
    const newProduct = {
        name: 'Test Product',
        price: 99,
        description: 'A test product description',
        category: 'Electronics',
        stock: 10,
        brand: 'TestBrand',
        rating: 4.5
    };

    console.log('Creating product...');
    try {
        const createRes = await fetch(`${baseUrl}/products`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newProduct)
        });

        if (createRes.status === 201) {
            console.log('Product created successfully: ', await createRes.json());
        } else {
            console.error('Failed to create product:', createRes.status, await createRes.text());
        }
    } catch (error) {
        console.error('Error creating product:', error.message);
    }

    // 2. Get All Products
    console.log('Fetching all products...');
    try {
        const getRes = await fetch(`${baseUrl}/products`);
        if (getRes.status === 200) {
            const products = await getRes.json();
            console.log(`Retrieved ${products.length} products`);
        } else {
            console.error('Failed to get products:', getRes.status);
        }
    } catch (error) {
        console.error('Error fetching products:', error.message);
    }

    console.log('\n--- Testing Orders API ---');

    // 3. Create an Order
    const newOrder = {
        userEmail: 'test@example.com',
        totalAmount: 150,
        items: ['item1', 'item2'],
        status: 'pending',
        orderDate: new Date().toISOString()
    };

    console.log('Creating order...');
    try {
        const createOrderRes = await fetch(`${baseUrl}/orders`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newOrder)
        });

        if (createOrderRes.status === 201) {
            console.log('Order created successfully: ', await createOrderRes.json());
        } else {
            console.error('Failed to create order:', createOrderRes.status, await createOrderRes.text());
        }
    } catch (error) {
        console.error('Error creating order:', error.message);
    }

    // 4. Get All Orders
    console.log('Fetching all orders...');
    try {
        const getOrdersRes = await fetch(`${baseUrl}/orders`);
        if (getOrdersRes.status === 200) {
            const orders = await getOrdersRes.json();
            console.log(`Retrieved ${orders.length} orders`);
        } else {
            console.error('Failed to get orders:', getOrdersRes.status);
        }
    } catch (error) {
        console.error('Error fetching orders:', error.message);
    }
}

// Wait a bit for server to start then run
setTimeout(testApi, 2000);
