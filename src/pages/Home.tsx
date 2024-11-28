import {IonButton, IonContent, IonHeader, IonPage, IonRouterLink, IonTitle, IonToolbar} from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Home.css';

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Blank</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Blank</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer />
      </IonContent>
        <IonContent>
            <IonRouterLink href="/pages/customer/CustomerList">
                <IonButton>Go to Customer</IonButton>
            </IonRouterLink>
        </IonContent>
    </IonPage>
  );
};

export default Home;
