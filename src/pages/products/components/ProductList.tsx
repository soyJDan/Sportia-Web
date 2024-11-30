import {
    IonButton, IonButtons,
    IonCard, IonCol,
    IonContent, IonGrid, IonHeader, IonIcon, IonInput, IonModal,
    IonPage, IonRow, IonText,
    IonTitle, IonToolbar
} from "@ionic/react";
import React, {useEffect, useState} from "react";
import {useHistory} from "react-router";

import {pencil, close} from "ionicons/icons";
import {getAllProducts, removeProduct, saveProduct} from "../config/ProductApi";

import './ProductList.css';

const ProductList: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [showModalProduct, setShowModalProduct] = useState(false);

    const history = useHistory();

    useEffect(() => {
        if (!document.cookie.includes('JSESSIONID')) {
            history.push('/login');
        } else {
            if (products.length === 0) {
                getProducts().then(r => console.log('search'));
            } else {
                const interval = setInterval(() => {
                    getProducts().then(r => console.log('search'));
                }, 30000);

                return () => clearInterval(interval);
            }
        }
    }, []);

    const modalProduct = () => {
        setShowModalProduct(true);
    }

    const getProducts = async () => {
        let result = await getAllProducts();
        setProducts(result);
    }

    const remove = async (id: string) => {
        await removeProduct(id);
        getProducts();
    }

    const createProduct = async () => {
        let sku = (document.getElementById('sku') as HTMLInputElement).value;
        let name = (document.getElementById('name') as HTMLInputElement).value;
        let description = (document.getElementById('description') as HTMLInputElement).value;
        let price = (document.getElementById('price') as HTMLInputElement).value;
        let thumbnail = (document.getElementById('thumbnail') as HTMLInputElement).value;
        let images = (document.getElementById('images') as HTMLInputElement).value;
        let weight = (document.getElementById('weight') as HTMLInputElement).value;

        const product: Product = {
            sku: sku,
            name: name,
            description: description,
            price: parseFloat(price),
            thumbnail: thumbnail,
            images: images.split(','),
            weight: parseFloat(weight)
        }

        await saveProduct(product);

        sku = name = description = price = thumbnail = images = weight = '';
    }

    return (
        <IonPage>
            <IonContent className="container">
                <IonCard className="card">
                    <IonTitle className="title-card">Gestión de Productos</IonTitle>
                    <IonGrid className="table">
                        <IonButton className="btn-add"
                                   color="success"
                                   fill="solid"
                                   onClick={ () => modalProduct() }>Add product</IonButton>
                        <IonRow>
                            <IonCol>ID</IonCol>
                            <IonCol>SKU</IonCol>
                            <IonCol>Nombre</IonCol>
                            <IonCol>Descripción</IonCol>
                            <IonCol>Precio</IonCol>
                            <IonCol>Thumbnail</IonCol>
                            <IonCol>Imágenes</IonCol>
                            <IonCol>Peso</IonCol>
                            <IonCol>Fecha de Creación</IonCol>
                            <IonCol>Acciones</IonCol>
                        </IonRow>

                        {products.map((product: Product) =>
                            <IonRow>
                                <IonCol>{ String(product.id) }</IonCol>
                                <IonCol>{ product.sku }</IonCol>
                                <IonCol>{ product.name }</IonCol>
                                <IonCol>{ product.description }</IonCol>
                                <IonCol>{ product.price }</IonCol>
                                <IonCol>{ product.thumbnail }</IonCol>
                                <IonCol>{ product.images }</IonCol>
                                <IonCol>{ product.weight }</IonCol>
                                <IonCol>{ String(product.createdAt) }</IonCol>
                                <IonCol>
                                    <IonButton color="primary" fill="clear">
                                        <IonIcon icon={pencil} slot="icon-only" />
                                    </IonButton>

                                    <IonButton color="danger" fill="clear"
                                               onClick={ () => remove(String(product.id)) }>
                                        <IonIcon icon={close} slot="icon-only" />
                                    </IonButton>
                                </IonCol>
                            </IonRow>
                        )}

                    </IonGrid>
                </IonCard>
            </IonContent>

            <IonModal isOpen={showModalProduct} className="modal">
                <IonHeader>
                    <IonToolbar>
                        <IonTitle>New Product</IonTitle>
                        <IonButtons slot="end">
                            <IonButton onClick={() => setShowModalProduct(false)}>
                                <IonIcon icon={close}></IonIcon>
                            </IonButton>
                        </IonButtons>
                    </IonToolbar>
                </IonHeader>
                <IonContent>
                    <IonCard>
                        <IonGrid className="table">
                            <IonRow>
                                <IonCol>
                                    <IonText>SKU</IonText>
                                    <IonInput
                                        id="sku"
                                        type="text"
                                        fill="solid"
                                        placeholder="CAM-NG-M"
                                        maxlength={200}
                                        required={true}
                                    ></IonInput>
                                </IonCol>
                                <IonCol>
                                    <IonText>Nombre</IonText>
                                    <IonInput
                                        id="name"
                                        type="text"
                                        fill="solid"
                                        placeholder="Camiseta negra de talla M"
                                        maxlength={200}
                                        required={true}
                                    ></IonInput>
                                </IonCol>
                            </IonRow>
                            <IonRow>
                                <IonCol>
                                    <IonText>Descripción</IonText>
                                    <IonInput
                                        id="description"
                                        type="text"
                                        fill="solid"
                                        placeholder="Descripción del producto"
                                        maxlength={200}
                                        required={true}
                                    ></IonInput>
                                </IonCol>
                            </IonRow>
                            <IonRow>
                                <IonCol>
                                    <IonText>Precio</IonText>
                                    <IonInput
                                        id="price"
                                        type="number"
                                        fill="solid"
                                        placeholder="$ 0.00"
                                        maxlength={200}
                                        required={true}
                                    ></IonInput>
                                </IonCol>
                            </IonRow>
                            <IonRow>
                                <IonCol>
                                    <IonText>Thumbnail</IonText>
                                    <IonInput
                                        id="thumbnail"
                                        type="text"
                                        fill="solid"
                                        placeholder="URL"
                                        maxlength={200}
                                        required={true}
                                    ></IonInput>
                                </IonCol>
                                <IonCol>
                                    <IonText>Imágenes</IonText>
                                    <IonInput
                                        id="images"
                                        type="text"
                                        fill="solid"
                                        placeholder="URL"
                                        maxlength={200}
                                        required={true}
                                    ></IonInput>
                                </IonCol>
                            </IonRow>
                            <IonRow>
                                <IonCol>
                                    <IonText>Peso</IonText>
                                    <IonInput
                                        id="weight"
                                        type="number"
                                        fill="solid"
                                        placeholder="0.00 g"
                                        maxlength={200}
                                        required={true}
                                    ></IonInput>
                                </IonCol>
                            </IonRow>
                            <IonRow>
                                <IonCol>
                                    <IonButton fill="solid" onClick={ () => createProduct() }>Save</IonButton>
                                </IonCol>
                            </IonRow>
                        </IonGrid>
                    </IonCard>
                </IonContent>
            </IonModal>
        </IonPage>
    );
};

export default ProductList;