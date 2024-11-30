import {Redirect, Route} from 'react-router-dom';
import {IonApp, IonRouterOutlet, setupIonicReact} from '@ionic/react';
import {IonReactRouter} from '@ionic/react-router';
import Home from './pages/Home';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */
/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';
import New from "./pages/customer/New";
import Login from "./pages/customer/Login";
import Dashboard from "./pages/dashboard/Dashboard";
import ProductDetail from "./pages/products/ProductDetail";
import Cart from "./pages/Cart";
import Perfil from "./pages/Perfil";

setupIonicReact();

const App: React.FC = () => {
  const sessionCookie = document.cookie.includes(sessionStorage.getItem('sessionCookie') as string);

  return (
      <IonApp>
        <IonReactRouter>
          <IonRouterOutlet>
            <Route exact path="/home">
              <Home/>
            </Route>
            <Route exact path="/">
              {sessionCookie ? <Redirect to="/home"/> : <Redirect to="/login"/>}
            </Route>
            <Route exact path="/pages/customer/New">
              <New/>
            </Route>
            <Route exact path="/login">
              <Login/>
            </Route>
            <Route exact path="/dashboard">
              <Dashboard/>
            </Route>
            <Route exact path="/product/:sku">
              <ProductDetail/>
            </Route>
            <Route exact path="/cart">
                <Cart />
            </Route>
            <Route exact path="/perfil">
              <Perfil />
            </Route>
          </IonRouterOutlet>
        </IonReactRouter>
      </IonApp>
  );

};

export default App;
