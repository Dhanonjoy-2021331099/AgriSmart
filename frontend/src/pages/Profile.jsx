import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    // Simulate fetching user data
    setTimeout(() => {
      setUser({
        name: 'রহমান আলী',
        email: 'rahman@example.com',
        phone: '+880 1712 345 678',
        address: 'ঢাকা, বাংলাদেশ',
        farmSize: '৫ একর',
        crops: ['ধান', 'গম', 'ভুট্টা']
      });
      setLoading(false);
    }, 1000);
  }, [navigate]);

  if (loading) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center' 
      }}>
        <div style={{ fontSize: '24px', color: '#666' }}>লোড হচ্ছে...</div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', padding: '40px 20px', background: 'var(--bg, #f8f9fa)' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <h1 style={{ 
          fontSize: '42px', 
          marginBottom: '40px',
          color: '#333',
          textAlign: 'center'
        }}>
          প্রোফাইল
        </h1>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '30px'
        }}>
          {/* Profile Card */}
          <div className="card" style={{ padding: '30px', textAlign: 'center' }}>
            <div style={{
              width: '120px',
              height: '120px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              margin: '0 auto 20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '60px'
            }}>
              👨‍🌾
            </div>
            <h2 style={{ color: '#333', marginBottom: '10px' }}>{user.name}</h2>
            <p style={{ color: '#666', marginBottom: '20px' }}>কৃষক</p>
            <button
              style={{
                padding: '10px 20px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              প্রোফাইল সম্পাদনা
            </button>
          </div>

          {/* Information Card */}
          <div className="card" style={{ padding: '30px' }}>
            <h2 style={{ color: '#333', marginBottom: '25px' }}>ব্যক্তিগত তথ্য</h2>
            
            <div style={{ marginBottom: '20px' }}>
              <label style={{ 
                display: 'block', 
                color: '#667eea', 
                fontWeight: '600',
                marginBottom: '8px',
                fontSize: '14px'
              }}>
                নাম
              </label>
              <div style={{ 
                padding: '12px',
                background: '#f8f9fa',
                borderRadius: '8px',
                color: '#333'
              }}>
                {user.name}
              </div>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ 
                display: 'block', 
                color: '#667eea', 
                fontWeight: '600',
                marginBottom: '8px',
                fontSize: '14px'
              }}>
                ইমেইল
              </label>
              <div style={{ 
                padding: '12px',
                background: '#f8f9fa',
                borderRadius: '8px',
                color: '#333'
              }}>
                {user.email}
              </div>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ 
                display: 'block', 
                color: '#667eea', 
                fontWeight: '600',
                marginBottom: '8px',
                fontSize: '14px'
              }}>
                ফোন
              </label>
              <div style={{ 
                padding: '12px',
                background: '#f8f9fa',
                borderRadius: '8px',
                color: '#333'
              }}>
                {user.phone}
              </div>
            </div>

            <div>
              <label style={{ 
                display: 'block', 
                color: '#667eea', 
                fontWeight: '600',
                marginBottom: '8px',
                fontSize: '14px'
              }}>
                ঠিকানা
              </label>
              <div style={{ 
                padding: '12px',
                background: '#f8f9fa',
                borderRadius: '8px',
                color: '#333'
              }}>
                {user.address}
              </div>
            </div>
          </div>

          {/* Farm Information */}
          <div className="card" style={{ padding: '30px' }}>
            <h2 style={{ color: '#333', marginBottom: '25px' }}>খামার তথ্য</h2>
            
            <div style={{ marginBottom: '20px' }}>
              <label style={{ 
                display: 'block', 
                color: '#667eea', 
                fontWeight: '600',
                marginBottom: '8px',
                fontSize: '14px'
              }}>
                খামারের আকার
              </label>
              <div style={{ 
                padding: '12px',
                background: '#f8f9fa',
                borderRadius: '8px',
                color: '#333'
              }}>
                {user.farmSize}
              </div>
            </div>

            <div>
              <label style={{ 
                display: 'block', 
                color: '#667eea', 
                fontWeight: '600',
                marginBottom: '8px',
                fontSize: '14px'
              }}>
                চাষকৃত ফসল
              </label>
              <div style={{ 
                display: 'flex',
                flexWrap: 'wrap',
                gap: '10px'
              }}>
                {user.crops.map((crop, idx) => (
                  <span
                    key={idx}
                    style={{
                      padding: '8px 16px',
                      background: 'linear-gradient(135deg, #4ade80 0%, #22c55e 100%)',
                      color: 'white',
                      borderRadius: '20px',
                      fontSize: '14px',
                      fontWeight: '500'
                    }}
                  >
                    {crop}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Statistics */}
          <div className="card" style={{ padding: '30px' }}>
            <h2 style={{ color: '#333', marginBottom: '25px' }}>পরিসংখ্যান</h2>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '15px'
            }}>
              <div style={{
                padding: '20px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                borderRadius: '10px',
                color: 'white',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '32px', fontWeight: '700', marginBottom: '5px' }}>১২</div>
                <div style={{ fontSize: '14px', opacity: 0.9 }}>সক্রিয় সেন্সর</div>
              </div>

              <div style={{
                padding: '20px',
                background: 'linear-gradient(135deg, #4ade80 0%, #22c55e 100%)',
                borderRadius: '10px',
                color: 'white',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '32px', fontWeight: '700', marginBottom: '5px' }}>৩</div>
                <div style={{ fontSize: '14px', opacity: 0.9 }}>চাষকৃত ফসল</div>
              </div>

              <div style={{
                padding: '20px',
                background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                borderRadius: '10px',
                color: 'white',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '32px', fontWeight: '700', marginBottom: '5px' }}>২৪</div>
                <div style={{ fontSize: '14px', opacity: 0.9 }}>মাস</div>
              </div>

              <div style={{
                padding: '20px',
                background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                borderRadius: '10px',
                color: 'white',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '32px', fontWeight: '700', marginBottom: '5px' }}>৯৮%</div>
                <div style={{ fontSize: '14px', opacity: 0.9 }}>সাফল্যের হার</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

