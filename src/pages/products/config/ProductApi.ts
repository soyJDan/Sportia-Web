export async function getAllProducts() {
    const url = 'http://localhost:3000/api/v1/product/all';

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    return await response.json();
}

export async function removeProduct(id: string) {
    const url = 'http://localhost:3000/api/v1/product/delete/' + id;
    await fetch(url, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    });
}

export async function saveProduct(product: Product) {
    const url = 'http://localhost:3000/api/v1/product/register';
    const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(product),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error('Error in save');
    }

    return await response.json();
}

export async function getProductBySku(sku: string) {
    const url = 'http://localhost:3000/api/v1/product/sku/' + sku;
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    return await response.json();
}