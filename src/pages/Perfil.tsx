import {
    IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonText
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import {searchCustomerById} from "./customer/config/CustomerApi";

const Perfil: React.FC = () => {
    const [customer, setCustomer] = useState<any>(null);

    useEffect(() => {
        // Simula una llamada a la API para obtener la información del customer
        const fetchcustomer = async () => {
            const customer = getCustomer(parseInt(sessionStorage.getItem('USERID') as string));
            setCustomer(customer);
        };

        fetchcustomer().then(r => console.log('search'));
    }, []);

    const getCustomer = async (id: number) => {
        let customer = await searchCustomerById(id);
        setCustomer(customer);
    }

    if (!customer) {
        return <IonText>Loading...</IonText>;
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Perfil del customer</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonCard>
                    <IonCardHeader>
                        <IonCardTitle>{customer.name}</IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                        <p><strong>Email:</strong> {customer.email}</p>
                        <p><strong>Teléfono:</strong> {customer.phone}</p>
                    </IonCardContent>
                </IonCard>
            </IonContent>
        </IonPage>
    );
};

export default Perfil;