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
  IonLoading,
  IonIcon, 
  IonGrid, 
  IonRow, 
  IonCol, 
  IonList, 
  IonAvatar,
  IonBadge
} from '@ionic/react';
import { useState, useEffect } from 'react';
import { supabase } from '../../utils/supabaseClient';
import { useIonRouter } from '@ionic/react';
import { checkmarkCircle, alertCircle, helpCircle, warning } from 'ionicons/icons';

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
  const [statusRecords, setStatusRecords] = useState<any[]>([]);

  // Authentication Check
  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user }, error } = await supabase.auth.getUser();
      
      if (error || !user) {
        router.push('/it35-final', 'root', 'replace');
        return;
      }
      
      // Check existing status for today
      const today = new Date().toISOString().split('T')[0];
      const { data } = await supabase
        .from('emergency_status')
        .select('*')
        .eq('user_id', user.id)
        .eq('date', today)
        .single();

      setIsMarked(!!data);
      setLoading(prev => ({ ...prev, auth: false }));
    };

    checkAuth();
  }, [router]);

  // Fetch status records
  const fetchStatusRecords = async () => {
    try {
      const dateStr = selectedDate.split('T')[0];
      const { data, error, status } = await supabase
        .from('emergency_status')
        .select(`
          id,
          date,
          status,
          marked_at,
          user_id,
          profiles:user_id (username, avatar_url)
        `)
        .eq('date', dateStr)
        .order('marked_at', { ascending: false });
  
      if (error && status !== 406) { // 406 is when no rows are returned
        throw error;
      }
  
      setStatusRecords(data || []);
    } catch (error) {
      console.error('Error fetching status records:', error);
      setToastMessage('Failed to load status records. Please check your permissions.');
      setShowToast(true);
      setStatusRecords([]); // Reset to empty array on error
    }
  };

  useEffect(() => {
    fetchStatusRecords();
  }, [selectedDate, isMarked]);

  const handleStatusUpdate = async (status: 'safe' | 'help') => {
    setLoading(prev => ({ ...prev, action: true }));
    
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const dateStr = selectedDate.split('T')[0];

      // Upsert status record (update if exists, otherwise insert)
      const { error } = await supabase
        .from('emergency_status')
        .upsert({
          user_id: user.id,
          date: dateStr,
          status: status,
          marked_at: new Date().toISOString()
        }, {
          onConflict: 'user_id,date' // Update if record exists for this user+date
        });

      if (error) throw error;

      setIsMarked(true);
      setToastMessage(`Successfully marked as ${status === 'safe' ? 'safe' : 'needing help'}!`);
      fetchStatusRecords(); // Refresh the list
    } catch (error) {
      console.error('Status update error:', error);
      setToastMessage(error instanceof Error ? error.message : 'Failed to update status');
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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'safe':
        return { icon: checkmarkCircle, color: 'success' };
      case 'help':
        return { icon: warning, color: 'danger' };
      default:
        return { icon: helpCircle, color: 'warning' };
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'safe':
        return 'Safe';
      case 'help':
        return 'Needs Help';
      default:
        return 'Unknown';
    }
  };

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
              <IonLabel position="stacked">Select Date</IonLabel>
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

            <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
              {isMarked ? (
                <IonButton expand="block" color="medium" disabled>
                  Status Already Submitted
                </IonButton>
              ) : (
                <>
                  <IonButton 
                    expand="block" 
                    color="success" 
                    onClick={() => handleStatusUpdate('safe')}
                  >
                    MARK SAFE
                  </IonButton>
                  <IonButton 
                    expand="block" 
                    color="danger" 
                    onClick={() => handleStatusUpdate('help')}
                  >
                    NEED HELP
                  </IonButton>
                </>
              )}
            </div>
          </IonCardContent>
        </IonCard>

        <IonCard>
          <IonCardContent>
            <IonLabel><h2>Emergency Status Reports</h2></IonLabel>
            <IonList>
              {statusRecords.length > 0 ? (
                <IonGrid>
                  <IonRow className="ion-text-center ion-align-items-center" style={{ fontWeight: 'bold', padding: '10px 0' }}>
                    <IonCol size="4">User</IonCol>
                    <IonCol size="3">Status</IonCol>
                    <IonCol size="5">Time</IonCol>
                  </IonRow>
                  {statusRecords.map((record) => {
                    const statusInfo = getStatusIcon(record.status);
                    return (
                      <IonRow key={record.id} className="ion-text-center ion-align-items-center" style={{ padding: '8px 0', borderBottom: '1px solid #eee' }}>
                        <IonCol size="4">
                          <IonItem lines="none" style={{ '--inner-padding-end': '0' }}>
                            {record.profiles?.avatar_url && (
                              <IonAvatar slot="start" style={{ width: '30px', height: '30px', marginRight: '10px' }}>
                                <img src={record.profiles.avatar_url} alt="avatar" />
                              </IonAvatar>
                            )}
                            <IonLabel style={{ fontSize: '0.9rem' }}>{record.profiles?.username || 'Unknown'}</IonLabel>
                          </IonItem>
                        </IonCol>
                        <IonCol size="3">
                          <IonBadge color={statusInfo.color}>
                            <IonIcon icon={statusInfo.icon} style={{ marginRight: '5px', fontSize: '0.9rem' }} />
                            {getStatusText(record.status)}
                          </IonBadge>
                        </IonCol>
                        <IonCol size="5">
                          {new Date(record.marked_at).toLocaleString()}
                        </IonCol>
                      </IonRow>
                    );
                  })}
                </IonGrid>
              ) : (
                <IonItem>
                  <IonLabel className="ion-text-center">No status reports for this date</IonLabel>
                </IonItem>
              )}
            </IonList>
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