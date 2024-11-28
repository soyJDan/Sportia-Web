import React, { useState } from 'react';
import {IonHeader, IonInput, IonInputPasswordToggle, IonItem, IonList, IonPage} from '@ionic/react';
import { useMaskito } from '@maskito/react';
import {MaskitoOptions, maskitoTransform} from "@maskito/core";

function Example() {
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

    // Telephone
    const cardMask = useMaskito({
        options: {
            mask: [
                ...Array(4).fill(/\d/),
                ' ',
                ...Array(4).fill(/\d/),
                ' ',
                ...Array(4).fill(/\d/),
                ' ',
                ...Array(4).fill(/\d/),
                ' ',
                ...Array(3).fill(/\d/),
            ],
        },
    });

    const phoneMaskOptions: MaskitoOptions = {
        mask: ['+', '1', ' ', '(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
    };
    const phoneMask = useMaskito({ options: phoneMaskOptions });

    //If you need to set an initial value, you can use maskitoTransform to ensure the value is valid
    const [myPhoneNumber, setMyPhoneNumber] = useState(maskitoTransform('5555551212', phoneMaskOptions));


    return (
        <IonPage>
            <IonHeader>

            </IonHeader>
            <IonInput
                id="custom-input"
                type="text"
                fill="solid"
                label="Nombre completo"
                labelPlacement="floating"
                counter={false}
                maxlength={200}
            ></IonInput>

            <IonInput
                className={`${isValid && 'ion-valid'} ${isValid === false && 'ion-invalid'} ${isTouched && 'ion-touched'}`}
                type="email"
                fill="solid"
                label="Email"
                labelPlacement="floating"
                helperText="Enter a valid email"
                errorText="Invalid email"
                onIonInput={(event) => validate(event)}
                onIonBlur={() => markTouched()}
            ></IonInput>

            <IonInput
                id="custom-input"
                label="Custom Counter Format"
                labelPlacement="floating"
                counter={true}
                maxlength={20}
                counterFormatter={(inputLength, maxLength) => `${maxLength - inputLength} characters remaining`}
            ></IonInput>

            <IonList>
                <IonItem>
                    <IonInput
                        ref={async (cardRef) => {
                            if (cardRef) {
                                const input = await cardRef.getInputElement();
                                cardMask(input);
                            }
                        }}
                        label="Card number"
                        placeholder="0000 0000 0000 0000"
                    ></IonInput>
                </IonItem>
                <IonItem>
                    <IonInput
                        ref={async (phoneInput) => {
                            if (phoneInput) {
                                const input = await phoneInput.getInputElement();
                                phoneMask(input);
                            }
                        }}
                        value={myPhoneNumber}
                        onIonInput={(e) => setMyPhoneNumber(e.detail.value || '')}
                        label="US phone number"
                        placeholder="+1 (xxx) xxx-xxxx"
                    ></IonInput>
                </IonItem>
                <IonItem>
                    <IonInput
                        id="input-password"
                        type="password"
                        label="Password"
                        labelPlacement="floating"
                        value="NeverGonnaGiveYouUp">
                        <IonInputPasswordToggle slot="end"></IonInputPasswordToggle>
                    </IonInput>
                </IonItem>
            </IonList>
        </IonPage>
    );
}
export default Example;


