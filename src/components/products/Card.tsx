import React from "react";
import {
    IonButton,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle
} from "@ionic/react";
import './product.css';

interface CardProductProps {
    title: string;
    subtitle: string;
    description: string;
    price: number;
    addToCart: (product: Product) => void;
}

const CardProduct: React.FC<CardProductProps> = ({ title, subtitle, description, price, addToCart }) => {
    const product = { name: title, sku: subtitle, description, price };


    return (
        <IonCard>
            <img alt="Silhouette of mountains" src="https://ionicframework.com/docs/img/demos/card-media.png" />
            <IonCardHeader>
                <IonCardTitle>{ title }</IonCardTitle>
                <IonCardSubtitle>{ subtitle }</IonCardSubtitle>
            </IonCardHeader>
            <IonCardContent>{ description }</IonCardContent>
            <IonCardContent>${ price }</IonCardContent>

            <IonCardContent>
                <IonButton fill="solid" routerLink={ `/product/${subtitle}` }>Ver</IonButton>
                <IonButton onClick={() => addToCart(product)}>Añadir al carrito</IonButton>
            </IonCardContent>
        </IonCard>
    );
}

export default CardProduct;
