import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonButton } from "@ionic/react";
import { getProductBySku } from "./config/ProductApi";


const ProductDetail: React.FC = () => {
    const { sku } = useParams<{ sku: string }>();
    const [product, setProduct] = useState<Product | null>(null);

    useEffect(() => {
        if (sku) {
            getProductBySku(sku).then(setProduct);
        }
    }, [sku]);

    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>{product.name}</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonCard>
                    <img alt={product.name} src={product.thumbnail} />
                    <IonCardHeader>
                        <IonCardTitle>{product.name}</IonCardTitle>
                        <IonCardSubtitle>{product.sku}</IonCardSubtitle>
                    </IonCardHeader>
                    <IonCardContent>
                        <p>{product.description}</p>
                        <p>${product.price}</p>
                        <IonButton fill="solid">Add to Cart</IonButton>
                    </IonCardContent>
                </IonCard>
            </IonContent>
        </IonPage>
    );
};

export default ProductDetail;