import {
    IonBackButton,
    IonButton,
    IonButtons,
    IonCol,
    IonContent,
    IonFab,
    IonFabButton,
    IonFabList,
    IonGrid,
    IonHeader,
    IonIcon,
    IonPage,
    IonRow,
    IonTitle,
    IonToolbar
} from '@ionic/react';
import './Home.css';
import CardProduct from "../components/products/Card";
import {cartOutline, chevronUpCircle, colorPalette, add, globe} from "ionicons/icons";
import {useHistory} from "react-router";
import {useEffect, useState} from "react";
import {getAllProducts} from "./products/config/ProductApi";
import Navbar from "../components/Navbar";

export function deleteCookie(name: string) {
    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
}

const Home: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);

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

    const addToCart = (product: Product) => {
        let cart = JSON.parse(document.cookie.replace(/(?:(?:^|.*;\s*)cart\s*\=\s*([^;]*).*$)|^.*$/, "$1") || "[]");
        cart.push(product);
        document.cookie = `cart=${JSON.stringify(cart)}; path=/;`;
    };

    const getProducts = async () => {
        let result = await getAllProducts();
        setProducts(result);
    }

    return (
    <IonPage>
      <IonHeader>
          <Navbar />
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
            <IonToolbar>
                <IonButtons slot="start">
                    <IonBackButton defaultHref="#"></IonBackButton>
                </IonButtons>
                <IonTitle>Back Button</IonTitle>
            </IonToolbar>
        </IonHeader>

          <IonContent className="products">
              <IonGrid>
                  {products.map((product: Product, index: number) => {
                      if (index % 4 === 0) {
                          return (
                              <IonRow key={index}>
                                  {products.slice(index, index + 4).map((p, i) => (
                                      <IonCol key={i}>
                                          <CardProduct
                                              title={p.name}
                                              subtitle={p.sku}
                                              description={p.description}
                                              price={p.price}
                                              addToCart={addToCart}
                                          />
                                      </IonCol>
                                  ))}
                              </IonRow>
                          );
                      }
                      return null;
                  })}
              </IonGrid>
          </IonContent>
          <IonFab slot="fixed" vertical="bottom" horizontal="end">
              <IonFabButton>
                  <IonIcon icon={chevronUpCircle}></IonIcon>
              </IonFabButton>
              <IonFabList side="top">
                  <IonFabButton>
                      <IonIcon icon={add}></IonIcon>
                  </IonFabButton>
                  <IonFabButton>
                      <IonIcon icon={colorPalette}></IonIcon>
                  </IonFabButton>
                  <IonFabButton>
                      <IonIcon icon={globe}></IonIcon>
                  </IonFabButton>
              </IonFabList>
          </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default Home;
