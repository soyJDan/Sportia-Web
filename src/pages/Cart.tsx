import React, { useEffect, useState } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonButton } from '@ionic/react';

interface Product {
    name: string;
    sku: string;
    description: string;
    price: number;
}

const Cart: React.FC = () => {
    const [cart, setCart] = useState<Product[]>([]);

    useEffect(() => {
        const cartCookie = document.cookie.replace(/(?:(?:^|.*;\s*)cart\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        if (cartCookie) {
            setCart(JSON.parse(cartCookie));
        }
    }, []);

    const clearCart = () => {
        document.cookie = 'cart=[]; path=/;';
        setCart([]);
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Carrito de Compras</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonList>
                    {cart.map((product, index) => (
                        <IonItem key={index}>
                            <IonLabel>
                                <h2>{product.name}</h2>
                                <p>{product.description}</p>
                                <p>${product.price}</p>
                            </IonLabel>
                        </IonItem>
                    ))}
                </IonList>
                {cart.length > 0 && (
                    <IonButton expand="full" onClick={clearCart}>Vaciar Carrito</IonButton>
                )}
            </IonContent>
        </IonPage>
    );
};

export default Cart;