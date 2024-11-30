import Customer from "./Customer";
import {deleteCookie} from "../../Home";
import {constructOutline} from "ionicons/icons";

export async function searchCustomers() {
    let url = 'http://localhost:3000/api/v1/customer/all'
    let response = await fetch(url, {
        "method": 'GET',
        "headers": {
            "Content-Type": 'application/json'
        }
    })

    return await response.json();
}

export async function removeCustomer(id: string) {
    let url = 'http://localhost:3000/api/v1/customer/delete/' + id
    await fetch(url, {
        "method": 'DELETE',
        "headers": {
            "Content-Type": 'application/json'
        }
    })

}

export async function saveCustomer(customer: Customer) {
    let url = 'http://localhost:3000/api/v1/customer/register';
    let response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(customer),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (!response.ok) {
        throw new Error('Error in save');
    }

    const data = await response.json();

    return {
        userId: data,
    };
}

export async function loginCustomer(email: string, password: string) {
    const url = 'http://localhost:3000/api/v1/customer/login';
    const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error('Error in login');
    }

    const data = await response.text();
    const userId = response.headers.get('userid');

    if (userId) {
        sessionStorage.setItem('USERID', userId);
    }

    return {
        cookie: data,
    };
}


export async function searchCustomerById(id: number) {
    let url = 'http://localhost:3000/api/v1/customer/id/' + id
    let response = await fetch(url, {
        "method": 'GET',
        "headers": {
            "Content-Type": 'application/json'
        }
    })

    return await response.json();
}

export async function logoutCustomer(id: number) {
    let url = 'http://localhost:3000/api/v1/customer/logout/' + id
    await fetch(url, {
        "method": 'POST',
        "headers": {
            "Content-Type": 'application/json'
        }
    })

    deleteCookie('JSESSIONID');
    sessionStorage.removeItem('sessionCookie');
    sessionStorage.removeItem('USERID');
}