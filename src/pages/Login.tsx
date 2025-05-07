import { 
    IonButton,
    IonButtons,
      IonContent, 
      IonHeader, 
      IonInput, 
      IonInputPasswordToggle, 
      IonItem, 
      IonList, 
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
          navigation.push('/it35-final/signup', 'forward','replace');
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
        <IonList>
           <IonItem>
             <IonInput type="email" label="Email" value="">
             </IonInput>
             </IonItem>
             <IonItem>
             <IonInput type="password" label="Password" value="Chemistry123">
            <IonInputPasswordToggle slot="end"></IonInputPasswordToggle>
            </IonInput>
           </IonItem>
       </IonList>
       </div>
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