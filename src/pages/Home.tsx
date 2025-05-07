
import { 
  IonButton,
  IonButtons,
  IonContent, 
  IonHeader, 
  IonIcon, 
  IonLabel, 
  IonMenuButton, 
  IonPage, 
  IonRouterOutlet, 
  IonTabBar, 
  IonTabButton, 
  IonTabs, 
  IonTitle, 
  IonToolbar 
} from '@ionic/react';

import { IonReactRouter } from '@ionic/react-router';
import { bookOutline, starSharp} from 'ionicons/icons';
import { Route, Redirect } from 'react-router';

import Feed from './home-tabs/Emergency_Status';

const Home: React.FC = () => {

  const tabs = [
    {name:'Emergency_Status', tab:'emergency_status',url: '/it35-final/app/home/emergency_status', icon: starSharp},
  ]
  
return (
  <IonReactRouter>
        <IonTabs>
          <IonTabBar slot="bottom">
            {tabs.map((item, index) => (
              <IonTabButton key={index} tab={item.tab} href={item.url}>
                <IonIcon icon={item.icon} />
                <IonLabel>{item.name}</IonLabel>
              </IonTabButton>
            ))}
            
          </IonTabBar>
        <IonRouterOutlet>
          <Route exact path="/it35-final/app/home/emergency_status" component={Feed} />
          <Route exact path="/it35-final/app/home">
            <Redirect to="/it35-final/app/home/emergency_status" />
          </Route>
        </IonRouterOutlet>
        </IonTabs>
      </IonReactRouter>
  );
};

export default Home;