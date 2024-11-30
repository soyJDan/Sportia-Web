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
import {useParams} from "react-router";
import './styles/style.css';
import Customer from "./Customer";
import {saveCustomer} from "./CustomerApi";
import {Simulate} from "react-dom/test-utils";

function SignUp() {
    const { name } = useParams<{ name: string; }>();

    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [showModal, setShowModal] = useState(false);

    // Start: API call registration
    const registerCustomer = async () => {
        let firstName = document.getElementById('first-name') as HTMLInputElement;
        let lastName = document.getElementById('last-name') as HTMLInputElement;
        let phone = document.getElementById('phone') as HTMLInputElement;
        let email = document.getElementById('email') as HTMLInputElement;

        let password = document.getElementById('password') as HTMLInputElement;
        const confirmPassword = document.getElementById('confirm-password') as HTMLInputElement;

        if (firstName.value == '' || lastName.value == '' || phone.value == '' || email.value == '' || password.value == '') {
            setErrorMessage("All fields are required.");
            setShowModal(true);
            return;
        }

        if (password.value !== confirmPassword.value) {
            setErrorMessage("The password and confirm password must be the same.");
            setShowModal(true);
            return;
        }

        try {
            let customer: Customer = {
                name: firstName.value + ' ' + lastName.value,
                email: email.value,
                phone: phone.value,
                password: password.value
            }

            await saveCustomer(customer);

            firstName.value = lastName.value = phone.value = email.value = password.value = confirmPassword.value = '';
        } catch (error) {
            setErrorMessage("An error occurred while saving the customer.");
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
                        <IonTitle size="large">Sign Up</IonTitle>
                    </IonToolbar>
                </IonHeader>

                <IonContent>
                    <IonCard className="container-signup">
                        <IonCardHeader className="container-card">
                            <IonCardTitle>Sign Up</IonCardTitle>
                            <IonCardSubtitle>Fill out the form carefully for registration</IonCardSubtitle>
                        </IonCardHeader>

                        <IonCardContent>
                            <IonGrid className="table">
                                <IonCard>
                                    <IonCardHeader>
                                        <IonCardTitle>Personal Information</IonCardTitle>
                                    </IonCardHeader>
                                    <IonCardContent>
                                        <IonRow>
                                            <IonCol>
                                                <IonText>First Name</IonText>
                                                <IonInput
                                                    id="first-name"
                                                    type="text"
                                                    fill="solid"
                                                    placeholder="John"
                                                    maxlength={200}
                                                    required={true}
                                                ></IonInput>
                                            </IonCol>
                                            <IonCol>
                                                <IonText>Last Name <span>*</span></IonText>
                                                <IonInput
                                                    id="last-name"
                                                    type="text"
                                                    fill="solid"
                                                    placeholder="Doe"
                                                    maxlength={200}
                                                    required
                                                ></IonInput>
                                            </IonCol>
                                        </IonRow>
                                        <IonRow>
                                            <IonText>Number Phone <span>*</span></IonText>
                                            <IonInput
                                                id="phone"
                                                type="tel"
                                                fill="solid"
                                                helperText="Enter a valid phone number"
                                                placeholder={myPhoneNumber}
                                                required
                                            ></IonInput>
                                        </IonRow>
                                    </IonCardContent>
                                </IonCard>
                                <IonCard>
                                    <IonCardHeader>
                                        <IonCardTitle>Account Information</IonCardTitle>
                                    </IonCardHeader>
                                    <IonCardContent>
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
                                            <IonCol>
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
                                            </IonCol>
                                            <IonCol>
                                                <IonText>Confirm Password <span>*</span></IonText>
                                                <IonInput
                                                    id="confirm-password"
                                                    type="password"
                                                    fill="solid"
                                                    placeholder="*******************************"
                                                    minlength={8}
                                                    required
                                                >
                                                    <IonInputPasswordToggle slot="end"></IonInputPasswordToggle>
                                                </IonInput>
                                            </IonCol>
                                        </IonRow>
                                        <IonButton
                                            expand="block"
                                            fill="solid"
                                            color="primary"
                                            className="mt-4"
                                            onClick={() => registerCustomer()}
                                        >
                                            Sign Up
                                        </IonButton>
                                    </IonCardContent>
                                </IonCard>
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
export default SignUp;


