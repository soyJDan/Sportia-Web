import Customer from "./Customer";

export async function searchCustomers() {
    let url = process.env.REACT_APP_API + '/customer/all'
    let response = await fetch(url, {
        "method": 'GET',
        "headers": {
            "Content-Type": 'application/json'
        }
    })

    return await response.json();
}

export async function removeCustomer(id: string) {
    let url = process.env.REACT_APP_API + 'customer/delete' + id
    await fetch(url, {
        "method": 'DELETE',
        "headers": {
            "Content-Type": 'application/json'
        }
    })
}

export async function saveCustomer(customer: Customer) {
    let url = process.env.REACT_APP_API + 'customers'
    await fetch(url, {
        "method": 'POST',
        "body": JSON.stringify(customer),
        "headers": {
            "Content-Type": 'application/json'
        }
    });
}

export async function searchCustomerById(id: string) {
    let url = process.env.REACT_APP_API + 'customers/' + id
    let response = await fetch(url, {
        "method": 'GET',
        "headers": {
            "Content-Type": 'application/json'
        }
    })

    return await response.json();
}