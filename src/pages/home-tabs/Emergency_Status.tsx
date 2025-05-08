import { 
  IonContent, 
  IonHeader, 
  IonPage, 
  IonTitle, 
  IonToolbar,
  IonButton,
  IonCard,
  IonCardContent,
  IonGrid,
  IonRow,
  IonCol,
  IonLoading,
  IonToast
} from '@ionic/react';
import { useState, useEffect } from 'react';
import { supabase } from '../../utils/supabaseClient';
import { useIonRouter } from '@ionic/react';

const EmergencyStatusDashboard: React.FC = () => {
  const router = useIonRouter();
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [loading, setLoading] = useState({
    auth: true,
    action: false,
    fetch: false
  });
  const [counts, setCounts] = useState({
    safe: 0,
    help: 0
  });

  // Authentication Check
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { user }, error } = await supabase.auth.getUser();
        
        if (error || !user) {
          router.push('/login', 'root', 'replace');
          return;
        }
      } catch (error) {
        console.error('Auth check error:', error);
      } finally {
        setLoading(prev => ({ ...prev, auth: false }));
      }
    };

    checkAuth();
    fetchCounts();
  }, [router]);

  // Fetch counts
  const fetchCounts = async () => {
    try {
      setLoading(prev => ({ ...prev, fetch: true }));
      const today = new Date().toISOString().split('T')[0];
      
      // Get safe count
      const { count: safeCount } = await supabase
        .from('emergency_status')
        .select('*', { count: 'exact', head: true })
        .eq('date', today)
        .eq('status', 'safe');

      // Get help count
      const { count: helpCount } = await supabase
        .from('emergency_status')
        .select('*', { count: 'exact', head: true })
        .eq('date', today)
        .eq('status', 'help');

      setCounts({
        safe: safeCount || 0,
        help: helpCount || 0
      });
    } catch (error) {
      console.error('Fetch error:', error);
      setToastMessage('Failed to load data');
      setShowToast(true);
    } finally {
      setLoading(prev => ({ ...prev, fetch: false }));
    }
  };

  // Handle status updates
  const handleStatusUpdate = async (status: 'safe' | 'help') => {
    setLoading(prev => ({ ...prev, action: true }));
    
    try {
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      if (authError || !user) throw new Error('Authentication failed');

      const today = new Date().toISOString().split('T')[0];

      // Upsert status
      const { error } = await supabase
        .from('emergency_status')
        .upsert({
          user_id: user.id,
          date: today,
          status: status,
          marked_at: new Date().toISOString()
        }, {
          onConflict: 'user_id,date'
        });

      if (error) throw error;

      setToastMessage(`Marked as ${status === 'safe' ? 'safe' : 'needing help'}!`);
      await fetchCounts();
    } catch (error) {
      console.error('Update error:', error);
      setToastMessage('Failed to update status');
    } finally {
      setLoading(prev => ({ ...prev, action: false }));
      setShowToast(true);
    }
  };

  if (loading.auth) {
    return <IonLoading isOpen={true} message="Verifying session..." />;
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Emergency Status</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonLoading isOpen={loading.action || loading.fetch} message={loading.action ? "Updating..." : "Loading..."} />

        <IonCard>
          <IonCardContent>
            <IonGrid>
              <IonRow>
                <IonCol>
                  <IonButton 
                    expand="block" 
                    color="success" 
                    onClick={() => handleStatusUpdate('safe')}
                    disabled={loading.action}
                    style={{ marginBottom: '10px', height: '60px' }}
                  >
                    MARK SAFE
                  </IonButton>
                </IonCol>
                <IonCol>
                  <IonButton 
                    expand="block" 
                    color="danger" 
                    onClick={() => handleStatusUpdate('help')}
                    disabled={loading.action}
                    style={{ marginBottom: '10px', height: '60px' }}
                  >
                    NEED HELP
                  </IonButton>
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonCardContent>
        </IonCard>

        <IonCard>
          <IonCardContent>
            <IonGrid>
              <IonRow>
                <IonCol style={{ textAlign: 'center' }}>
                  <h2 style={{ color: '#2dd36f', margin: '0' }}>{counts.safe}</h2>
                  <p style={{ margin: '0' }}>Safe Users</p>
                </IonCol>
                <IonCol style={{ textAlign: 'center' }}>
                  <h2 style={{ color: '#eb445a', margin: '0' }}>{counts.help}</h2>
                  <p style={{ margin: '0' }}>Need Help</p>
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonCardContent>
        </IonCard>

        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message={toastMessage}
          duration={3000}
        />
      </IonContent>
    </IonPage>
  );
};

export default EmergencyStatusDashboard;