import { 
  IonButtons,
  IonContent, 
  IonHeader, 
  IonMenuButton, 
  IonPage, 
  IonTitle, 
  IonToolbar,
  IonButton,
  IonCard,
  IonCardContent,
  IonItem,
  IonLabel,
  IonDatetime,
  IonToast,
  IonLoading
} from '@ionic/react';
import { useState, useEffect } from 'react';
import { supabase } from '../../utils/supabaseClient';
import { useIonRouter } from '@ionic/react';

const Emergency_Status: React.FC = () => {
  const router = useIonRouter();
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString());
  const [isMarked, setIsMarked] = useState(false);
  const [loading, setLoading] = useState({
    auth: true,
    action: false
  });

  // 1. Authentication Check
  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user }, error } = await supabase.auth.getUser();
      
      if (error || !user) {
        router.push('/it35-final', 'root', 'replace');
        return;
      }
      
      // Check existing attendance for today
      const today = new Date().toISOString().split('T')[0];
      const { count } = await supabase
        .from('attendance_logs')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id)
        .eq('date', today);

      setIsMarked(!!count);
      setLoading(prev => ({ ...prev, auth: false }));
    };

    checkAuth();
  }, [router]);

  // 2. Mark Attendance Handler
  const handleMarkAttendance = async () => {
    setLoading(prev => ({ ...prev, action: true }));
    
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const dateStr = selectedDate.split('T')[0];

      // 3. Insert Attendance Record
      const { error } = await supabase
        .from('attendance_logs')
        .insert([{
          user_id: user.id,
          date: dateStr,
          status: 'safe', // or 'present' depending on your schema
          marked_at: new Date().toISOString()
        }]);

      if (error) throw error;

      setIsMarked(true);
      setToastMessage('Successfully marked as safe!');
    } catch (error) {
      console.error('Mark attendance error:', error);
      setToastMessage(error instanceof Error ? error.message : 'Failed to mark attendance');
    } finally {
      setLoading(prev => ({ ...prev, action: false }));
      setShowToast(true);
    }
  };

  if (loading.auth) {
    return (
      <IonPage>
        <IonContent>
          <IonLoading isOpen={true} message="Verifying session..." />
        </IonContent>
      </IonPage>
    );
  }

  // 4. Main Component Render
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Emergency Status</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonLoading isOpen={loading.action} message="Submitting..." />

        <IonCard>
          <IonCardContent>
            <IonItem>
              <IonLabel position="stacked">Select Drill Date</IonLabel>
              <IonDatetime
                value={selectedDate}
                onIonChange={e => {
                  setSelectedDate(e.detail.value as string);
                  setIsMarked(false);
                }}
                presentation="date"
                max={new Date().toISOString()}
              />
            </IonItem>

            <div style={{ marginTop: '20px' }}>
              {isMarked ? (
                <IonButton expand="block" color="success" disabled>
                  Safety Confirmed
                </IonButton>
              ) : (
                <IonButton 
                  expand="block" 
                  color="danger" 
                  onClick={handleMarkAttendance}
                >
                  CONFIRM SAFETY
                </IonButton>
              )}
            </div>
          </IonCardContent>
        </IonCard>

        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message={toastMessage}
          duration={2000}
          position="top"
        />
      </IonContent>
    </IonPage>
  );
};

export default Emergency_Status;