'use client';
import { useState } from 'react';

export default function Advice() {
  const [selectedCrop, setSelectedCrop] = useState('');
  const [selectedSeason, setSelectedSeason] = useState('');
  const [advice, setAdvice] = useState(null);

  const crops = ['ধান', 'গম', 'ভুট্টা', 'আলু', 'টমেটো', 'বেগুন', 'পেঁয়াজ'];
  const seasons = ['রবি', 'খরিফ', 'জায়েদ'];

  const cropGuides = {
    'ধান': {
      soil: 'দোঁআশ বা এঁটেল মাটি',
      seedRate: 'প্রতি বিঘায় ৮-১০ কেজি শোধিত বীজ ব্যবহার করুন',
      spacing: 'লাইন দূরত্ব ২০-২৫ সেমি ও গাছের দূরত্ব ১৫ সেমি',
      irrigation: 'মোটা করে ৫-৭ দিন অন্তর হালকা সেচ',
      fertilizer: 'ইউরিয়া ৬০ কেজি, টিএসপি ৪০ কেজি, এমওপি ৩০ কেজি (প্রতি বিঘায়)',
      pest: 'পাতাঝরা/ব্লাস্ট রোগ',
      pestTip: 'কপার-ভিত্তিক বা ট্রাইসাইক্লাজোল স্প্রে করুন এবং ক্ষেতে পানি জমে থাকতে দিন',
      harvest: 'ধান দুধ থেকে আঠা পর্যায়ে গেলে কাটাই শুরু করুন',
      yield: '২২-২৫ মণ/বিঘা',
    },
    'গম': {
      soil: 'অল্প দোঁআশ ও ভালো নিষ্কাশনযুক্ত মাটি',
      seedRate: 'প্রতি বিঘায় ২০-২২ কেজি বীজ',
      spacing: 'লাইন দূরত্ব ১৮ সেমি',
      irrigation: 'মাটির আর্দ্রতা অনুযায়ী ৮-১০ দিন অন্তর সেচ',
      fertilizer: 'সুষম ডিএপি ও এমওপি',
      pest: 'ঝিল্লি পোকা ও রস্ট',
      pestTip: 'রস্ট দেখা গেলে তাৎক্ষণিকভাবে টিল্ট স্প্রে করুন',
      harvest: 'শীষ হলুদ হয়ে আর্দ্রতা ২০% হলে কাটাই করুন',
      yield: '১৮-২০ মণ/বিঘা',
    },
    'default': {
      soil: 'ভাল নিষ্কাশন ও জৈব সমৃদ্ধ দোঁআশ',
      seedRate: 'উন্নত জাতের শোধিত বীজ ব্যবহার করুন',
      spacing: 'গাছের স্বাস্থ্য অনুযায়ী ২০ সেমি দূরত্ব',
      irrigation: 'প্রতি সপ্তাহে ২-৩ বার সেচ',
      fertilizer: 'নাইট্রোজেন, ফসফরাস ও পটাশের সুষম মিশ্রণ',
      pest: 'সাধারণ ছত্রাক/কীটপতঙ্গ',
      pestTip: 'পরিচ্ছন্ন মাঠ ও জৈব কীটনাশক ব্যবহার করুন',
      harvest: 'ফসলের ৮০% পরিপক্ব হলে কাটাই করুন',
      yield: 'উপযুক্ত পরিচর্যায় উচ্চ ফলন',
    },
  };

  const seasonGuides = {
    'রবি': {
      sowingWindow: 'নভেম্বর - ডিসেম্বর',
      summary: 'শীতল ও শুষ্ক আবহাওয়ায় রোগের চাপ কম থাকে, তাই সেচ ও তাপমাত্রা সামঞ্জস্য জরুরি।',
      soilPrep: 'মাটি শুকনো অবস্থায় চাষ দিয়ে প্রতিবার রোটাভেটর চালান।',
      irrigationCycle: '৭ দিনে হালকা সেচ',
      nutrition: 'মাটির পরীক্ষার ভিত্তিতে প্রাথমিক ডোজ দিন',
      proAdvice: 'সকালের কুয়াশা শেষে কীট প্রতিরোধক স্প্রে কার্যকর।',
    },
    'খরিফ': {
      sowingWindow: 'জুন - জুলাই',
      summary: 'বর্ষায় অতিরিক্ত আর্দ্রতা থাকায় জল নিষ্কাশন ও রোগব্যবস্থাপনায় সতর্ক থাকুন।',
      soilPrep: 'জমি উঁচু করে নালা রাখুন যাতে পানি দ্রুত বের হয়।',
      irrigationCycle: 'প্রয়োজনে বৃষ্টির ফাঁকে সেচ',
      nutrition: 'জৈব পদার্থ ও জিপসাম প্রয়োগ করুন',
      proAdvice: 'ঘন বৃষ্টির পর সিস্টেমিক ফাঙ্গিসাইড প্রয়োগে রোগ কমে।',
    },
    'জায়েদ': {
      sowingWindow: 'ফেব্রুয়ারি - মার্চ',
      summary: 'উষ্ণ ও শুষ্ক হাওয়ায় বাষ্পীভবন বেশি, ড্রিপ বা স্প্রিঙ্কলার সেচ উপযোগী।',
      soilPrep: 'হালকা সেচ দিয়ে চাষ দিন ও মালচ ব্যবহার করুন।',
      irrigationCycle: '৪-৫ দিনে সেচ',
      nutrition: 'ফোলিয়ার স্প্রে করে মাইক্রো নিউট্রিয়েন্ট দিন',
      proAdvice: 'গরম বাতাসে সকালে সেচ দিলে পানি সাশ্রয় হয়।',
    },
    'default': {
      sowingWindow: 'মৌসুম অনুযায়ী',
      summary: 'স্থানীয় কৃষি অফিসের সুপারিশ অনুসরণ করুন।',
      soilPrep: 'জৈব সার মিশিয়ে জমি ফাইন টিল্থে আনুন।',
      irrigationCycle: 'সপ্তাহে ২ বার',
      nutrition: 'সমন্বিত সারের ব্যবহার',
      proAdvice: 'নিয়মিত রোগবালাই পর্যবেক্ষণ করুন।',
    },
  };

  const getAdvice = () => {
    if (!selectedCrop || !selectedSeason) {
      alert('অনুগ্রহ করে ফসল এবং মৌসুম নির্বাচন করুন');
      return;
    }

    const cropInfo = cropGuides[selectedCrop] || cropGuides.default;
    const seasonInfo = seasonGuides[selectedSeason] || seasonGuides.default;

    const adviceData = {
      crop: selectedCrop,
      season: selectedSeason,
      summary: `${selectedSeason} মৌসুমে ${selectedCrop} চাষে ${seasonInfo.summary} ${cropInfo.soil}`,
      quickFacts: [
        { label: 'বপন সময়', value: seasonInfo.sowingWindow },
        { label: 'সেচ রুটিন', value: seasonInfo.irrigationCycle || cropInfo.irrigation },
        { label: 'মাটির ধরন', value: cropInfo.soil },
        { label: 'লক্ষ্য ফলন', value: cropInfo.yield },
      ],
      blocks: [
        {
          title: 'বীজ বপন ও জমি প্রস্তুতি',
          icon: '🌱',
          badge: seasonInfo.sowingWindow,
          items: [
            cropInfo.seedRate,
            seasonInfo.soilPrep,
            cropInfo.spacing,
          ],
        },
        {
          title: 'সেচ ও পুষ্টি ব্যবস্থাপনা',
          icon: '💧',
          badge: seasonInfo.irrigationCycle || cropInfo.irrigation,
          items: [
            cropInfo.irrigation,
            cropInfo.fertilizer,
            seasonInfo.nutrition,
          ],
        },
        {
          title: 'কীটপতঙ্গ ও রোগ নিয়ন্ত্রণ',
          icon: '🛡️',
          badge: cropInfo.pest,
          items: [
            `প্রধান রোগ: ${cropInfo.pest}`,
            cropInfo.pestTip,
            'সাপ্তাহিক পর্যবেক্ষণ করে আক্রান্ত পাতা সরান',
          ],
        },
        {
          title: 'ফসল তোলা ও সংরক্ষণ',
          icon: '🧺',
          badge: cropInfo.harvest,
          items: [
            cropInfo.harvest,
            'কাটার পর ২-৩ দিন ছায়ায় শুকান',
            'শুকনো ও বাতাস চলাচলকারী ঘরে সংরক্ষণ করুন',
          ],
        },
      ],
      alerts: [
        {
          title: 'বিশেষ সতর্কতা',
          content: cropInfo.pestTip,
        },
        {
          title: 'বিশেষজ্ঞের নোট',
          content: seasonInfo.proAdvice,
        },
      ],
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
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <div style={{
                  padding: '24px',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  borderRadius: '14px'
                }}>
                  <p style={{ margin: 0, opacity: 0.9 }}>নির্বাচিত ফসল</p>
                  <h3 style={{ margin: '6px 0 12px', fontSize: '26px' }}>
                    {advice.crop} · {advice.season} মৌসুম
                  </h3>
                  <p style={{ margin: 0, lineHeight: 1.7 }}>{advice.summary}</p>
                </div>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
                  gap: '12px'
                }}>
                  {advice.quickFacts.map((fact) => (
                    <div key={fact.label} style={{
                      border: '1px solid #e2e8f0',
                      borderRadius: '12px',
                      padding: '14px'
                    }}>
                      <p style={{ margin: 0, color: '#94a3b8', fontSize: '12px', letterSpacing: '0.5px' }}>
                        {fact.label}
                      </p>
                      <p style={{ margin: '8px 0 0', color: '#0f172a', fontWeight: 600 }}>
                        {fact.value}
                      </p>
                    </div>
                  ))}
                </div>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                  gap: '18px'
                }}>
                  {advice.blocks.map((block) => (
                    <div key={block.title} style={{
                      border: '1px solid #e5e7eb',
                      borderRadius: '16px',
                      padding: '20px',
                      background: '#fcfdff',
                      boxShadow: '0 10px 30px rgba(15,23,42,0.04)'
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                        <span style={{ fontSize: '26px' }}>{block.icon}</span>
                        <span style={{
                          padding: '4px 10px',
                          borderRadius: '999px',
                          background: '#eef2ff',
                          color: '#4338ca',
                          fontSize: '12px',
                          fontWeight: 600
                        }}>
                          {block.badge}
                        </span>
                      </div>
                      <h4 style={{ margin: '0 0 12px', color: '#1e293b' }}>{block.title}</h4>
                      <ul style={{ margin: 0, paddingLeft: '18px', color: '#475569', lineHeight: 1.7 }}>
                        {block.items.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                  gap: '16px'
                }}>
                  {advice.alerts.map((alert) => (
                    <div key={alert.title} style={{
                      border: '1px dashed #c4b5fd',
                      borderRadius: '16px',
                      padding: '18px',
                      background: '#f5f3ff'
                    }}>
                      <p style={{ margin: '0 0 8px', color: '#7c3aed', fontWeight: 600 }}>{alert.title}</p>
                      <p style={{ margin: 0, color: '#4c1d95', lineHeight: 1.6 }}>{alert.content}</p>
                    </div>
                  ))}
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

   