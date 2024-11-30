import React, { useState } from 'react';

import {
    IonButton,
    IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonContent, IonGrid,
    IonHeader, IonInput,
    IonInputPasswordToggle,
    IonMenuButton, IonModal,
    IonPage, IonRow, IonText, IonTitle, IonToolbar
} from '@ionic/react';

import { useMaskito } from '@maskito/react';
import {MaskitoOptions, maskitoTransform} from "@maskito/core";
import {useHistory, useParams} from "react-router";
import './styles/style.css';
import {loginCustomer} from "./CustomerApi";

function SignIn() {
    const { name } = useParams<{ name: string; }>();

    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [showModal, setShowModal] = useState(false);

    const history = useHistory();

    const login = async () => {
        let email = document.getElementById('email') as HTMLInputElement;
        let password = document.getElementById('password') as HTMLInputElement;

        if (email.value == '' || password.value == '') {
            setErrorMessage("All fields are required.");
            setShowModal(true);
            return;
        }

        try {
            const { userId, cookie } = await loginCustomer(email.value, password.value);
            localStorage.setItem('userId', userId);
            history.push('/home');
        } catch (error) {
            setErrorMessage("Error in login.");
            setShowModal(true);
        }
    }

    // Start: Verify if the email is valid
    const [isTouched, setIsTouched] = useState(false);
    const [isValid, setIsValid] = useState<boolean>();

    const validateEmail = (email: string) => {
        return email.match(
            /^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
        );
    };

    const validate = (ev: Event) => {
        const value = (ev.target as HTMLInputElement).value;

        setIsValid(undefined);

        if (value === '') return;

        validateEmail(value) !== null ? setIsValid(true) : setIsValid(false);
    };

    const markTouched = () => {
        setIsTouched(true);
    };
    // End: Verify if the email is valid

    // Start: Format phone number
    const phoneMaskOptions: MaskitoOptions = {
        mask: ['+', '34', ' ', '(', /\d/, /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, ' ', /\d/, /\d/, ' ', /\d/, /\d/],
    };
    const phoneMask = useMaskito({ options: phoneMaskOptions });

    const [myPhoneNumber] = useState(maskitoTransform('612345678', phoneMaskOptions));
    // End: Format phone number


    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonMenuButton />
                    </IonButtons>
                    <IonTitle>{name} - Register</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Sign In</IonTitle>
                    </IonToolbar>
                </IonHeader>

                <IonContent>
                    <IonCard className="container-signup">
                        <IonCardHeader className="container-card">
                            <IonCardTitle>Sign In</IonCardTitle>
                            <IonCardSubtitle>Fill out the form carefully for sign in</IonCardSubtitle>
                        </IonCardHeader>

                        <IonCardContent>
                            <IonGrid className="table">
                                <IonRow>
                                    <IonText>Email <span>*</span></IonText>
                                    <IonInput
                                        className={`${isValid && 'ion-valid'} ${isValid === false && 'ion-invalid'} ${isTouched && 'ion-touched'}`}
                                        id="email"
                                        type="email"
                                        fill="solid"
                                        placeholder="example@example.com"
                                        maxlength={200}
                                        helperText="Enter a valid email"
                                        errorText="Invalid email"
                                        onIonInput={(evt) => validate(evt)}
                                        onIonBlur={() => markTouched()}
                                        required
                                    ></IonInput>
                                </IonRow>
                                <IonRow>
                                    <IonText>Password <span>*</span></IonText>
                                    <IonInput
                                        id="password"
                                        type="password"
                                        fill="solid"
                                        helperText="The password must contain at least 8 characters"
                                        placeholder="*******************************"
                                        minlength={8}
                                        required
                                    >
                                        <IonInputPasswordToggle slot="end"></IonInputPasswordToggle>
                                    </IonInput>
                                </IonRow>
                                <IonButton
                                    expand="block"
                                    fill="solid"
                                    color="primary"
                                    className="mt-4"
                                    onClick={() => login()}
                                >
                                    Sign In
                                </IonButton>
                            </IonGrid>
                        </IonCardContent>
                    </IonCard>
                </IonContent>
            </IonContent>

            <IonModal isOpen={showModal} className="modal">
                <IonHeader>
                    <IonToolbar>
                        <IonTitle>Error</IonTitle>
                        <IonButtons slot="end">
                            <IonButton onClick={() => setShowModal(false)}>Close</IonButton>
                        </IonButtons>
                    </IonToolbar>
                </IonHeader>
                <IonContent className="ion-content">
                    <p>
                        <IonText>{errorMessage}</IonText>
                    </p>
                </IonContent>
            </IonModal>
        </IonPage>
    );
}
export default SignIn;


