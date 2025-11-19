'use client';
import { useState } from 'react';

export default function Advice() {
  const [selectedCrop, setSelectedCrop] = useState('');
  const [selectedSeason, setSelectedSeason] = useState('');
  const [advice, setAdvice] = useState(null);

  const crops = ['ধান', 'গম', 'ভুট্টা', 'আলু', 'টমেটো', 'বেগুন', 'পেঁয়াজ'];
  const seasons = ['রবি', 'খরিফ', 'জায়েদ'];

  const getAdvice = () => {
    if (!selectedCrop || !selectedSeason) {
      alert('অনুগ্রহ করে ফসল এবং মৌসুম নির্বাচন করুন');
      return;
    }

    // Simulate advice generation
    const adviceData = {
      crop: selectedCrop,
      season: selectedSeason,
      planting: 'সেপ্টেম্বর-অক্টোবর মাসে বীজ বপন করুন',
      irrigation: 'সপ্তাহে ২-৩ বার সেচ দিন',
      fertilizer: 'নাইট্রোজেন, ফসফরাস এবং পটাশ সমন্বিত সার ব্যবহার করুন',
      pestControl: 'নিয়মিতভাবে কীটনাশক স্প্রে করুন',
      harvesting: 'ডিসেম্বর-জানুয়ারি মাসে ফসল কাটুন'
    };

    setAdvice(adviceData);
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
          কৃষি পরামর্শ
        </h1>
        <p style={{ 
          textAlign: 'center', 
          color: '#666', 
          marginBottom: '40px',
          fontSize: '18px'
        }}>
          আপনার ফসলের জন্য বিশেষজ্ঞ পরামর্শ পান
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '30px',
          marginTop: '40px'
        }}>
          {/* Input Section */}
          <div className="card" style={{ padding: '30px' }}>
            <h2 style={{ marginBottom: '25px', color: '#333' }}>পরামর্শ চাইতে</h2>
            
            <div style={{ marginBottom: '20px' }}>
              <label style={{ 
                display: 'block', 
                marginBottom: '10px', 
                color: '#333',
                fontWeight: '500'
              }}>
                ফসল নির্বাচন করুন
              </label>
              <select
                value={selectedCrop}
                onChange={(e) => setSelectedCrop(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '2px solid #e0e0e0',
                  borderRadius: '8px',
                  fontSize: '16px'
                }}
              >
                <option value="">ফসল নির্বাচন করুন</option>
                {crops.map(crop => (
                  <option key={crop} value={crop}>{crop}</option>
                ))}
              </select>
            </div>

            <div style={{ marginBottom: '25px' }}>
              <label style={{ 
                display: 'block', 
                marginBottom: '10px', 
                color: '#333',
                fontWeight: '500'
              }}>
                মৌসুম নির্বাচন করুন
              </label>
              <select
                value={selectedSeason}
                onChange={(e) => setSelectedSeason(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '2px solid #e0e0e0',
                  borderRadius: '8px',
                  fontSize: '16px'
                }}
              >
                <option value="">মৌসুম নির্বাচন করুন</option>
                {seasons.map(season => (
                  <option key={season} value={season}>{season}</option>
                ))}
              </select>
            </div>

          <button
              onClick={getAdvice}
              style={{
                width: '100%',
                padding: '14px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '10px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s'
              }}
            >
              পরামর্শ পান
            </button>
          </div>

          {/* Advice Display Section */}
          <div className="card" style={{ padding: '30px' }}>
            <h2 style={{ marginBottom: '25px', color: '#333' }}>পরামর্শ</h2>
            {advice ? (
              <div>
                <div style={{
                  padding: '20px',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  borderRadius: '10px',
                  marginBottom: '20px'
                }}>
                  <h3 style={{ margin: '0 0 10px 0' }}>{advice.crop} - {advice.season}</h3>
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <h4 style={{ color: '#667eea', marginBottom: '10px' }}>🌱 বপন</h4>
                  <p style={{ color: '#666', lineHeight: '1.6' }}>{advice.planting}</p>
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <h4 style={{ color: '#667eea', marginBottom: '10px' }}>💧 সেচ</h4>
                  <p style={{ color: '#666', lineHeight: '1.6' }}>{advice.irrigation}</p>
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <h4 style={{ color: '#667eea', marginBottom: '10px' }}>🌾 সার</h4>
                  <p style={{ color: '#666', lineHeight: '1.6' }}>{advice.fertilizer}</p>
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <h4 style={{ color: '#667eea', marginBottom: '10px' }}>🐛 কীটপতঙ্গ নিয়ন্ত্রণ</h4>
                  <p style={{ color: '#666', lineHeight: '1.6' }}>{advice.pestControl}</p>
                </div>

                <div>
                  <h4 style={{ color: '#667eea', marginBottom: '10px' }}>✂️ ফসল তোলা</h4>
                  <p style={{ color: '#666', lineHeight: '1.6' }}>{advice.harvesting}</p>
                </div>
              </div>
            ) : (
              <div style={{
                textAlign: 'center',
                padding: '40px 20px',
                color: '#999'
              }}>
                <div style={{ fontSize: '48px', marginBottom: '15px' }}>💡</div>
                <p>ফসল এবং মৌসুম নির্বাচন করে পরামর্শ পান</p>
              </div>
            )}
          </div>
        </div>

       {/* Tips Section */}
        <div style={{ marginTop: '60px' }}>
          <h2 style={{ 
            textAlign: 'center', 
            fontSize: '32px', 
            marginBottom: '40px',
            color: '#333'
          }}>
            সাধারণ কৃষি টিপস
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '20px'
          }}>
            <div className="card" style={{ padding: '25px' }}>
              <h3 style={{ color: '#22c55e', marginBottom: '10px' }}>✓ মাটি পরীক্ষা</h3>
              <p style={{ color: '#666', lineHeight: '1.6' }}>
                নিয়মিতভাবে মাটির pH এবং পুষ্টি উপাদান পরীক্ষা করুন
              </p>
            </div>
            <div className="card" style={{ padding: '25px' }}>
              <h3 style={{ color: '#22c55e', marginBottom: '10px' }}>✓ সঠিক সময়</h3>
              <p style={{ color: '#666', lineHeight: '1.6' }}>
                মৌসুম অনুযায়ী ফসল বপন করুন
              </p>
            </div>
            <div className="card" style={{ padding: '25px' }}>
              <h3 style={{ color: '#22c55e', marginBottom: '10px' }}>✓ পানির ব্যবস্থাপনা</h3>
              <p style={{ color: '#666', lineHeight: '1.6' }}>
                প্রয়োজন অনুযায়ী সেচ দিন, অতিরিক্ত সেচ এড়িয়ে চলুন
              </p>
            </div>
            <div className="card" style={{ padding: '25px' }}>
              <h3 style={{ color: '#22c55e', marginBottom: '10px' }}>✓ জৈব সার</h3>
              <p style={{ color: '#666', lineHeight: '1.6' }}>
                জৈব সারের ব্যবহার বৃদ্ধি করুন
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

   