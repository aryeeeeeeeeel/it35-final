import { 
    IonButton,
    IonButtons,
      IonContent, 
      IonHeader, 
      IonMenuButton, 
      IonPage, 
      IonTitle, 
      IonToolbar, 
      useIonRouter
  } from '@ionic/react';
  
  const Login: React.FC = () => {
    const navigation = useIonRouter();

    const doLogin = () => {

        navigation.push('/it35-final/app','forward','replace');
      }
    const doRegister = ()=> {
          navigation.push('/it35-lab/register', 'forward','replace');
      }

    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Login</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className='ion-padding'>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <IonButton onClick={() => doLogin()} expand="full">
                Login
            </IonButton>
            <IonButton onClick={()=>doRegister()} fill="outline">
            SignUp
          </IonButton>
          </div>
        </IonContent>
      </IonPage>
    );
  };
  
  export default Login;