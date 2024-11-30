import {IonButton, IonCol, IonContent, IonGrid, IonHeader, IonPage, IonRow, IonTitle, IonToolbar} from "@ionic/react";
import ProductList from "../products/components/ProductList";
import Navbar from "../../components/Navbar";
import {useEffect, useState} from "react";
import {searchCustomerById} from "../customer/config/CustomerApi";
import Customer from "../customer/config/Customer";
import {useHistory} from "react-router";
import CustomerList from "../customer/components/CustomerList";

const Dashboard: React.FC = () => {
    const history = useHistory();

    useEffect(() => {
        if (!document.cookie.includes('JSESSIONID')) {
            history.push('/login');
        }

        const customer: Customer = searchCustomerById(6) as Customer;

        if (customer.rank === 2) {
            history.push('/home');
        }
    }, []);


    return (
        <IonPage>
            <IonHeader>
                <Navbar />
            </IonHeader>
            <IonContent>
                <IonGrid>
                    <IonRow>
                        <CustomerList />
                    </IonRow>
                </IonGrid>
            </IonContent>
            <IonContent>
                <IonGrid>
                    <IonRow>
                        <ProductList />
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    );
}

export default Dashboard;