import React, {useEffect} from "react";
import {IonButton, IonButtons, IonIcon, IonMenu, IonPopover, IonTitle, IonToolbar} from "@ionic/react";
import {
    addCircleOutline,
    arrowBackCircleOutline, calendarOutline, cart, cartOutline,
    closeCircleOutline, hammerOutline,
    person,
    personCircleOutline
} from "ionicons/icons";
import {logoutCustomer, searchCustomerById} from "../pages/customer/config/CustomerApi";
import {useHistory} from "react-router";
import Customer from "../pages/customer/config/Customer";

const Navbar: React.FC = () => {
    const history = useHistory();

    const [customer, setCustomer] = React.useState<Customer>();

    useEffect(() => {
        if (customer == null) {
            getCustomer(parseInt(sessionStorage.getItem('USERID') as string)).then(r => console.log('Customer'));
        }
    }, []);

    const logout = (id: string | null) => {
        if (id != null) {
            logoutCustomer(parseInt(id)).then(r => console.log('Logout'));
            history.push('/login');
        } else {
            console.log('Error in logout');
        }
    }

    const getCustomer = async (id: number) => {
        let customer = await searchCustomerById(id);
        setCustomer(customer);
    }


    return (
        <IonToolbar>
            <IonTitle className="ion-text-center">Sportia</IonTitle>
            { history.location.pathname === '/dashboard' ? (
                <IonButtons slot="start">
                    <IonButton routerLink="/pages/customer/New">
                        <IonIcon icon={ person } slot="start"></IonIcon>
                        Add customer
                    </IonButton>
                </IonButtons>
            ) : (customer?.rank == 2 ? (

                        <IonButtons slot="start">
                            <IonButton routerLink="/dashboard">
                                <IonIcon icon={ hammerOutline } slot="start"></IonIcon>
                                Dashboard
                            </IonButton>
                        </IonButtons>
                    ) : null
            ) }
            <IonButtons slot="end">
                { sessionStorage.getItem('USERID') != null ? (
                    <>
                        <IonButton routerLink="/perfil">
                            <IonIcon icon={personCircleOutline} slot="start"></IonIcon>
                            Perfil
                        </IonButton>
                        <IonButton onClick={() => logout(sessionStorage.getItem('USERID'))}>
                            <IonIcon icon={closeCircleOutline} slot="start"></IonIcon>
                            Logout
                        </IonButton>
                    </>
                ) : (
                    <IonButton routerLink="/login">
                        <IonIcon icon={ personCircleOutline } slot="start"></IonIcon>
                        Login
                    </IonButton>
                )}

                <IonButton routerLink="/home">
                    <IonIcon icon={ arrowBackCircleOutline } slot="start"></IonIcon>
                    Home
                </IonButton>
                <IonButton routerLink="/cart">
                    <IonIcon icon={ cartOutline } slot="start"></IonIcon>
                    Cart
                </IonButton>
            </IonButtons>
        </IonToolbar>
    );
}

export default Navbar;