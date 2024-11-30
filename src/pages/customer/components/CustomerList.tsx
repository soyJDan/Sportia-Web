import {
    IonButton,
    IonButtons,
    IonCard, IonCol,
    IonContent, IonGrid,
    IonHeader, IonIcon,
    IonItem,
    IonMenuButton,
    IonPage, IonRow,
    IonTitle,
    IonToolbar
} from "@ionic/react";
import React, {useEffect, useState} from "react";
import {useHistory, useParams} from "react-router";
import Customer from "../config/Customer";
import {removeCustomer, searchCustomers} from "../config/CustomerApi";
import {pencil, close} from "ionicons/icons";

import './CustomerList.css';

const CustomerList: React.FC = () => {
    const [clientes, setClientes] = useState<Customer[]>([]);

    const history = useHistory();

    useEffect(() => {
        if (!document.cookie.includes('JSESSIONID')) {
            history.push('/login');
        } else {
            if (clientes.length === 0) {
                search().then(r => console.log('search'));
            } else {
                const interval = setInterval(() => {
                    search().then(r => console.log('search'));
                }, 30000);

                return () => clearInterval(interval);
            }
        }
    }, []);

    const search = async () => {
        let result = await searchCustomers();
        setClientes(result);
    }

    const remove = async (id: string) => {
        await removeCustomer(id);
        search();
    }

    const addCustomer = () => {
        history.push('/pages/customer/New');
    }

    const editCustomer = (id: string) => {
        history.push('/page/customer/' + id);
    }

    return (
        <IonPage>
            <IonContent className="container">
                <IonCard className="card">
                    <IonTitle className="title-card">Gestión de Clientes </IonTitle>

                    <IonGrid className="table">
                        <IonRow>
                            <IonCol>ID</IonCol>
                            <IonCol>Nombre</IonCol>
                            <IonCol>Email</IonCol>
                            <IonCol>Teléfono</IonCol>
                            <IonCol>Rango</IonCol>
                            <IonCol>Acciones</IonCol>
                        </IonRow>

                        {clientes.map((customer: Customer) =>
                            <IonRow>
                                <IonCol>{ String(customer.id) }</IonCol>
                                <IonCol>{ customer.name }</IonCol>
                                <IonCol>{ customer.email }</IonCol>
                                <IonCol>{ customer.phone }</IonCol>
                                <IonCol>{ customer.rank }</IonCol>
                                <IonCol>
                                    <IonButton color="primary" fill="clear"
                                            onClick={ () => editCustomer(String(customer.id)) }>
                                        <IonIcon icon={pencil} slot="icon-only" />
                                    </IonButton>
                                </IonCol>
                            </IonRow>
                        )}

                    </IonGrid>
                </IonCard>
            </IonContent>
        </IonPage>
    );
};

export default CustomerList;