import { 
    IonButton,
    IonButtons,
      IonCard,
      IonCardContent,
      IonCardHeader,
      IonCardSubtitle,
      IonCardTitle,
      IonContent, 
      IonHeader, 
      IonInput, 
      IonInputPasswordToggle, 
      IonMenuButton, 
      IonModal, 
      IonPage, 
      IonTitle, 
      IonToolbar 
  } from '@ionic/react';
import { useState } from 'react';
  
  const Signup: React.FC = () => {
    const [username, setUsername] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showVerificationModal, setShowVerificationModal] = useState(false);

  const handleOpenVerificationModal = () => {
    setShowVerificationModal(true);
  };

  const doRegister = () => {

  console.log("Registering:", { username, email, firstName, lastName });
    setShowVerificationModal(false);
  };
    return (
      <IonPage>
        <IonContent className='ion-padding'>
        <h1>Sign Up User!</h1>

        <IonInput label="Username" labelPlacement="stacked" fill="outline" type="text" placeholder="Enter Unique Name" value={username} onIonChange={e => setUsername(e.detail.value!)} style={{ marginTop: '15px' }} />
        <IonInput label="First Name" labelPlacement="stacked" fill="outline" type="text" placeholder="Enter your first name" value={firstName} onIonChange={e => setFirstName(e.detail.value!)} style={{ marginTop: '15px' }} />
        <IonInput label="Last Name" labelPlacement="stacked" fill="outline" type="text" placeholder="Enter your last name" value={lastName} onIonChange={e => setLastName(e.detail.value!)} style={{ marginTop: '15px' }} />
        <IonInput label="Email" labelPlacement="stacked" fill="outline" type="email" placeholder="Enter your email" value={email} onIonChange={e => setEmail(e.detail.value!)} style={{ marginTop: '15px' }} />
        
        <IonInput label="Password" labelPlacement="stacked" fill="outline" type="password" placeholder="Enter password" value={password} onIonChange={e => setPassword(e.detail.value!)} style={{ marginTop: '15px' }} >
          <IonInputPasswordToggle slot="end" />
        </IonInput>

        <IonInput label="Confirm Password" labelPlacement="stacked" fill="outline" type="password" placeholder="Confirm password" value={confirmPassword} onIonChange={e => setConfirmPassword(e.detail.value!)} style={{ marginTop: '15px' }} >
          <IonInputPasswordToggle slot="end" />
        </IonInput>
        <IonButton onClick={handleOpenVerificationModal} expand="full" shape='round' color= 'success' style={{ marginTop: '15px' }}>
          Sign Up
        </IonButton>
        <IonButton routerLink="/it35-final" expand="full" fill="outline" shape='round'>
          Already have an account? Sign in
        </IonButton>

        {/* Verification Modal */}
        <IonModal isOpen={showVerificationModal} onDidDismiss={() => setShowVerificationModal(false)}>
          <IonContent className="ion-padding">
            <IonCard className="ion-padding" style={{ marginTop: '25%' }}>
              <IonCardHeader>
                <IonCardTitle>User Registration Details</IonCardTitle>
                <hr />
                <IonCardSubtitle>Username</IonCardSubtitle>
                <IonCardTitle>{username}</IonCardTitle>
                <IonCardSubtitle>Email</IonCardSubtitle>
                <IonCardTitle>{email}</IonCardTitle>

                <IonCardSubtitle>Name</IonCardSubtitle>
                <IonCardTitle>{firstName} {lastName}</IonCardTitle>
              </IonCardHeader>
              <IonCardContent></IonCardContent>
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginRight: '5px' }}>
                <IonButton fill="clear" onClick={() => setShowVerificationModal(false)}>Cancel</IonButton>
                <IonButton color="primary" onClick={doRegister}>Confirm</IonButton>
              </div>
            </IonCard>
          </IonContent>
        </IonModal>
      </IonContent>
      </IonPage>
    );
  };
  
  export default Signup;