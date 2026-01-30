async function testAuthProtection() {
    const baseUrl = 'http://localhost:8080';

    console.log('--- Testing Auth Protection ---');

    // Try to create product without login
    const product = {
        name: "Hacker Product",
        price: 0
    };

    console.log('Attempting POST /products without login...');
    try {
        const res = await fetch(`${baseUrl}/products`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(product)
        });

        console.log(`Status Code: ${res.status}`);
        if (res.status === 401) {
            console.log('PASS: Received 401 Unauthorized');
        } else {
            console.error(`FAIL: Expected 401 but got ${res.status}`);
        }
    } catch (error) {
        console.error('Error:', error.message);
    }
}

setTimeout(testAuthProtection, 2000);
