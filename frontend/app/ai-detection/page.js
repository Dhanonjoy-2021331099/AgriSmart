'use client';
import { useState } from 'react';

export default function AIDetection() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDetection = async () => {
    if (!selectedImage) return;
    
    setLoading(true);
    // Simulate AI detection
    setTimeout(() => {
      setResult({
        disease: 'Leaf Blight',
        confidence: '85%',
        recommendation: 'Apply fungicide and improve air circulation',
        severity: 'Moderate'
      });
      setLoading(false);
    }, 2000);
  };

  return (
    <div style={{ minHeight: '100vh', padding: '40px 20px', background: 'var(--bg, #f8f9fa)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h1 style={{ 
          fontSize: '42px', 
          marginBottom: '10px',
          color: '#333',
          textAlign: 'center'
        }}>
          এআই শনাক্তকরণ
        </h1>
        <p style={{ 
          textAlign: 'center', 
          color: '#666', 
          marginBottom: '40px',
          fontSize: '18px'
        }}>
          আপনার ফসলের রোগ এবং কীটপতঙ্গ শনাক্ত করুন
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '30px',
          marginTop: '40px'
        }}>
          {/* Image Upload Section */}
          <div className="card" style={{
            padding: '30px',
            textAlign: 'center'
          }}>
            <h2 style={{ marginBottom: '20px', color: '#333' }}>ছবি আপলোড করুন</h2>
            <div style={{
              border: '2px dashed #667eea',
              borderRadius: '12px',
              padding: '40px 20px',
              marginBottom: '20px',
              background: '#f8f9fa'
            }}>
              {selectedImage ? (
                <img 
                  src={selectedImage} 
                  alt="Selected" 
                  style={{
                    maxWidth: '100%',
                    maxHeight: '300px',
                    borderRadius: '8px'
                  }}
                />
              ) : (
                <div>
                  <div style={{ fontSize: '48px', marginBottom: '15px' }}>📷</div>
                  <p style={{ color: '#666' }}>ছবি নির্বাচন করুন</p>
                </div>
              )}
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              style={{ marginBottom: '20px' }}
            />
            <button
              onClick={handleDetection}
              disabled={!selectedImage || loading}
              style={{
                width: '100%',
                padding: '14px',
                background: (!selectedImage || loading) ? '#ccc' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '10px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: (!selectedImage || loading) ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s'
              }}
            >
              {loading ? 'শনাক্তকরণ চলছে...' : 'শনাক্ত করুন'}
            </button>
          </div>

          {/* Results Section */}
          <div className="card" style={{ padding: '30px' }}>
            <h2 style={{ marginBottom: '20px', color: '#333' }}>শনাক্তকরণ ফলাফল</h2>
            {result ? (
              <div>
                <div style={{
                  padding: '20px',
                  background: '#f0f9ff',
                  borderRadius: '10px',
                  marginBottom: '20px'
                }}>
                  <h3 style={{ color: '#667eea', marginBottom: '10px' }}>রোগ: {result.disease}</h3>
                  <p style={{ color: '#666', marginBottom: '8px' }}>
                    <strong>আত্মবিশ্বাস:</strong> {result.confidence}
                  </p>
                  <p style={{ color: '#666', marginBottom: '8px' }}>
                    <strong>তীব্রতা:</strong> {result.severity}
                  </p>
                </div>
                <div style={{
                  padding: '20px',
                  background: '#f0fdf4',
                  borderRadius: '10px'
                }}>
                  <h4 style={{ color: '#22c55e', marginBottom: '10px' }}>পরামর্শ:</h4>
                  <p style={{ color: '#666', lineHeight: '1.6' }}>
                    {result.recommendation}
                  </p>
                </div>
              </div>
            ) : (
              <div style={{
                textAlign: 'center',
                padding: '40px 20px',
                color: '#999'
              }}>
                <div style={{ fontSize: '48px', marginBottom: '15px' }}>🔍</div>
                <p>শনাক্তকরণ ফলাফল এখানে দেখানো হবে</p>
              </div>
            )}
          </div>
        </div>

        {/* Features */}
        <div style={{ marginTop: '60px' }}>
          <h2 style={{ 
            textAlign: 'center', 
            fontSize: '32px', 
            marginBottom: '40px',
            color: '#333'
          }}>
            এআই শনাক্তকরণের সুবিধা
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '20px'
          }}>
            <div className="card" style={{ padding: '25px', textAlign: 'center' }}>
              <div style={{ fontSize: '40px', marginBottom: '15px' }}>⚡</div>
              <h3 style={{ color: '#333', marginBottom: '10px' }}>দ্রুত শনাক্তকরণ</h3>
              <p style={{ color: '#666' }}>কয়েক সেকেন্ডে রোগ শনাক্ত করুন</p>
            </div>
            <div className="card" style={{ padding: '25px', textAlign: 'center' }}>
              <div style={{ fontSize: '40px', marginBottom: '15px' }}>🎯</div>
              <h3 style={{ color: '#333', marginBottom: '10px' }}>সঠিক ফলাফল</h3>
              <p style={{ color: '#666' }}>উন্নত এআই মডেল ব্যবহার করে</p>
            </div>
            <div className="card" style={{ padding: '25px', textAlign: 'center' }}>
              <div style={{ fontSize: '40px', marginBottom: '15px' }}>💡</div>
              <h3 style={{ color: '#333', marginBottom: '10px' }}>পরামর্শ</h3>
              <p style={{ color: '#666' }}>স্বয়ংক্রিয় চিকিৎসা পরামর্শ</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

