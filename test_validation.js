// using global fetch in Node 18+

async function testValidation() {
    const baseUrl = 'http://localhost:8080';

    console.log('--- Testing Validation Failure ---');

    // Create a Product with MISSING fields
    const invalidProduct = {
        price: 'not a number'
        // missing name, category, etc.
    };

    console.log('Sending invalid product...');
    try {
        const res = await fetch(`${baseUrl}/products`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(invalidProduct)
        });

        console.log(`Status Code: ${res.status}`);
        if (res.status === 400) {
            console.log('PASS: Received 400 Bad Request');
            const data = await res.json();
            console.log('Errors:', JSON.stringify(data.errors, null, 2));
        } else {
            console.error(`FAIL: Expected 400 but got ${res.status}`);
            console.log('Response:', await res.text());
        }
    } catch (error) {
        console.error('Error:', error.message);
    }
}

setTimeout(testValidation, 2000);
