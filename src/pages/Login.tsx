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
      IonToast, 
      IonToolbar, 
      useIonRouter
  } from '@ionic/react';
  import { eye, eyeOff } from 'ionicons/icons';
import { useState } from 'react';
  
  const Login: React.FC = () => {
    const navigation = useIonRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [showToast, setShowToast] = useState(false);

    const doLogin = () => {

      if (email === "admin@gmail.com" && password === "password123") {
        setShowToast(true);
        setTimeout(() => {
          navigation.push('/it35-lab/app', 'forward', 'replace');
        }, 1500);
          } else {
        
        setAlertMessage("Invalid email or password.");
        setShowAlert(true);
        }
      };
    
    const doRegister = ()=> {
          navigation.push('/it35-final/signup', 'forward','replace');
      }

    return (
      <IonPage>
      <IonContent className='ion-padding'>
        <div style={{
          display: 'flex',
          flexDirection:'column',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop:'25%'
        }}>
          <h1 style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>USER LOGIN</h1>
          <IonInput
            label="Email" 
            labelPlacement="floating" 
            fill="outline"
            type="email"
            placeholder="Enter Email"
            value={email}
            onIonChange={e => setEmail(e.detail.value!)}
          />
          <IonInput style={{ marginTop:'10px' }}      
            fill="outline"
            type="password"
            placeholder="Password"
            value={password}
            onIonChange={e => setPassword(e.detail.value!)}
          >
            <IonInputPasswordToggle slot="end"></IonInputPasswordToggle>
          </IonInput>
        </div>
        <IonButton onClick={doLogin} expand="full" shape='round' color='success' >
          Login
        </IonButton>
          <IonButton routerLink="/it35-final/signup" expand="full" fill="outline" shape='round'>
          Don't have an account? Sign Up here
        </IonButton>


        {/* IonToast for success message */}
        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message="Login successful! Redirecting..."
          duration={1500}
          position="top"
          color="primary"
        />
      </IonContent>
    </IonPage>
  );
};
  
  export default Login;

  function setAlertMessage(message: any) {
      throw new Error('Function not implemented.');
    }