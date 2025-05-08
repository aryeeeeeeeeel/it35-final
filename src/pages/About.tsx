import { 
    IonButtons,
      IonCard,
      IonCardContent,
      IonCardHeader,
      IonCardTitle,
      IonContent, 
      IonHeader, 
      IonMenuButton, 
      IonPage, 
      IonTitle, 
      IonToolbar 
  } from '@ionic/react';
  
  const About: React.FC = () => {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot='start'>
              <IonMenuButton></IonMenuButton>
            </IonButtons>
            <IonTitle>About</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen>
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Emergency Status Logger</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            The Emergency Status Logger is a lightweight and user-friendly mobile web application designed to quickly report an individual’s safety status during an emergency. Users can mark themselves as "Safe" or indicate they "Need Help" with just a single tap, making it ideal for fast responses in critical situations. The system then updates real-time statistics to inform responders and administrators of current conditions and needs.

            This app is built using Ionic React and integrated with Supabase for secure backend storage and real-time data synchronization. Its simple interface ensures accessibility for all users, while the responsive design makes it suitable for both mobile and desktop environments. Whether for disaster response or community safety coordination, this app aims to provide a reliable platform for emergency communication.
          </IonCardContent>
          </IonCard>
        </IonContent>
      </IonPage>
    );
  };
  
  export default About;