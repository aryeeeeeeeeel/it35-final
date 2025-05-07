
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
import { bookOutline} from 'ionicons/icons';
import { Route, Redirect } from 'react-router';

import Feed from './home-tabs/Feed';

const Home: React.FC = () => {

  const tabs = [
    {name:'Feed', tab:'feed',url: '/it35-final/app/home/feed', icon: bookOutline},
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
          <Route exact path="/it35-final/app/home/feed" render={Feed} />
          <Route exact path="/it35-final/app/home">
            <Redirect to="/it35-final/app/home/feed" />
          </Route>
        </IonRouterOutlet>
        </IonTabs>
      </IonReactRouter>
  );
};

export default Home;