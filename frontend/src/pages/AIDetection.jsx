import { useRef, useState } from 'react';

export default function AIDetection() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const [cropRect, setCropRect] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const imageContainerRef = useRef(null);

  const diseaseProfiles = [
    {
      disease: 'পাতাঝরা ব্লাইট',
      latinName: 'Bipolaris oryzae',
      confidence: '92%',
      severity: 'উচ্চ',
      summary:
        'পাতার কিনারা থেকে বাদামী দাগ শুরু হয়ে ধীরে ধীরে পাতাকে শুকিয়ে ফেলে। দ্রুত ব্যবস্থা না নিলে ফলনের ৩০-৪০% নষ্ট হয়।',
      causes: [
        'গরম ও আর্দ্র পরিবেশে ছত্রাকের দ্রুত বংশবিস্তার',
        'অতিরিক্ত নাইট্রোজেন সার ব্যবহারে নরম পাতা তৈরি',
        'ঘন লাগানো জমিতে বাতাস চলাচলে বাধা',
      ],
      solutions: [
        '৭-১০ দিন পরপর কপার-ভিত্তিক ফাংগিসাইড স্প্রে করুন',
        'গাছের মাঝের পাতা পাতলা করে বাতাস চলাচল নিশ্চিত করুন',
        'সেচের পানি জমে না থাকলে রোগ কমে',
      ],
      blogSections: [
        {
          title: 'দ্রুত শনাক্তকরণ কেন জরুরি?',
          content:
            'পাতার উপর লম্বাটে বাদামী দাগ দেখা গেলে ২৪ ঘণ্টার মধ্যে ট্রিটমেন্ট শুরু করলে ছত্রাক ছড়ানো ঠেকানো সম্ভব। দেরি করলে দাগগুলো মধ্যভাগে ধূসর হয়ে চারপাশে গাঢ় বাদামী রিং তৈরি করে।',
        },
        {
          title: 'জনপ্রিয় কৃষকদের অভিজ্ঞতা',
          content:
            'ঝিনাইদহের কৃষক মিজানুল হক ক্রপ মনিটরিং সেন্সর ব্যবহার করে আর্দ্রতার তথ্য দেখে সেচ কমিয়েছেন। ফলে ব্লাইটের মাত্রা ৫০% কমেছে এবং স্প্রে খরচ অর্ধেকে নেমেছে।',
        },
      ],
    },
    {
      disease: 'ব্ল্যাক স্পট ফাঙ্গাস',
      latinName: 'Alternaria solani',
      confidence: '88%',
      severity: 'মাঝারি',
      summary:
        'টমেটো ও আলুর পাতায় কালচে বৃত্তাকার দাগ তৈরি হয় যা দ্রুত বড় হয়ে পাতাকে ঝলসে দেয়।',
      causes: [
        'হঠাৎ তাপমাত্রা পরিবর্তন ও শিশিরপাত',
        'পূর্বের ফসলের গাছের অবশিষ্টাংশ না পরিষ্কার করা',
        'উচ্চ আর্দ্রতায় জৈব সার অবশিষ্ট গরম হয়ে যাওয়া',
      ],
      solutions: [
        'আবোনিক তামা-ওক্সিক্লোরাইড বা ক্লোরোথালোনিল স্প্রে',
        'ফসল কাটার পরে জমির আবর্জনা পুড়িয়ে ফেলুন',
        'প্রতি ১৫ দিনে জৈব মুলচ উলটে দিন যাতে বাতাস ঢোকে',
      ],
      blogSections: [
        {
          title: 'লক্ষণ ও পর্যবেক্ষণ',
          content:
            'পাতার উপরের অংশে ছোট কালো দাগ দিয়ে শুরু হয়। ধীরে ধীরে দাগের চারদিকে হলুদ বর্ডার তৈরি হয়। সঠিক সময়ে শনাক্ত না হলে ফলের গায়েও কালো দাগ পড়ে।',
        },
        {
          title: 'প্রতিরোধে স্মার্ট ক্যালেন্ডার',
          content:
            'AI শিডিউলার বৃষ্টির সম্ভাবনা দেখিয়ে সতর্ক করলে আগেই প্রতিরোধক স্প্রে করলে আক্রান্ত ক্ষেত্র ৬০% কমে।',
        },
      ],
    },
    {
      disease: 'লিফ কার্ল ভাইরাস',
      latinName: 'Begomovirus spp.',
      confidence: '79%',
      severity: 'নিম্ন',
      summary:
        'পাতা উপরের দিকে কুঁকড়ে যায়, রঙ হালকা হয়ে ধমনী বেরিয়ে আসে। ভাইরাস হলেও দ্রুত পরিচর্যায় ক্ষতি কমানো যায়।',
      causes: [
        'সাদা মাছি বা অ্যাফিডের আক্রমণ',
        'দূষিত চারা/ডাল ব্যবহার',
        'একই জমিতে বারবার একই ফসল',
      ],
      solutions: [
        'সাদা মাছি প্রতিরোধে নীল আঠালো ফাঁদ ব্যবহার',
        'ভাইরাসমুক্ত জাতের চারা সংগ্রহ',
        'নিয়মিত জৈব কীটনাশক (নিম তেল) ব্যবহার',
      ],
      blogSections: [
        {
          title: 'কীভাবে দ্রুত আলাদা করবেন',
          content:
            'পাতা হাতের তালুর মতো বাঁকা হয়ে যায়, শিরা মোটা ও গা ছাড়া হয়। নতুন পাতায় বিকৃতি বেশি থাকে।',
        },
        {
          title: 'ব্যবস্থাপনার রুটিন',
          content:
            '৩ দিনের ব্যবধানে নিম তেল স্প্রে, আক্রান্ত পাতা তুলে পুড়িয়ে ফেলা এবং পরবর্তী রোপণে প্রতিরোধী জাত ব্যবহারে রোগের পুনরাবৃত্তি কমে।',
        },
      ],
    },
  ];

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
        setCroppedImage(null);
        setCropRect(null);
        setResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const getRelativePosition = (clientX, clientY) => {
    if (!imageContainerRef.current) return null;
    const rect = imageContainerRef.current.getBoundingClientRect();
    const x = Math.min(Math.max(clientX - rect.left, 0), rect.width);
    const y = Math.min(Math.max(clientY - rect.top, 0), rect.height);
    return { x, y, rect };
  };

  const handleMouseDown = (e) => {
    const position = getRelativePosition(e.clientX, e.clientY);
    if (!position) return;
    setIsDragging(true);
    setDragStart({ x: position.x, y: position.y });
    setCropRect({ x: position.x, y: position.y, width: 0, height: 0 });
  };

  const handleMouseMove = (e) => {
    if (!isDragging || !dragStart) return;
    const position = getRelativePosition(e.clientX, e.clientY);
    if (!position) return;
    const width = position.x - dragStart.x;
    const height = position.y - dragStart.y;
    setCropRect({
      x: width < 0 ? position.x : dragStart.x,
      y: height < 0 ? position.y : dragStart.y,
      width: Math.abs(width),
      height: Math.abs(height),
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleCropConfirm = () => {
    if (!selectedImage || !cropRect || !imageContainerRef.current) return;
    const img = new Image();
    img.src = selectedImage;
    img.onload = () => {
      const containerWidth = imageContainerRef.current.offsetWidth;
      const containerHeight = imageContainerRef.current.offsetHeight;
      const scaleX = img.naturalWidth / containerWidth;
      const scaleY = img.naturalHeight / containerHeight;

      const canvas = document.createElement('canvas');
      canvas.width = Math.max(1, Math.round(cropRect.width * scaleX));
      canvas.height = Math.max(1, Math.round(cropRect.height * scaleY));

      const ctx = canvas.getContext('2d');
      ctx.drawImage(
        img,
        cropRect.x * scaleX,
        cropRect.y * scaleY,
        cropRect.width * scaleX,
        cropRect.height * scaleY,
        0,
        0,
        canvas.width,
        canvas.height
      );

      setCroppedImage(canvas.toDataURL('image/png'));
    };
  };

  const handleDetection = async () => {
    if (!selectedImage && !croppedImage) return;
    
    setLoading(true);
    // Simulate AI detection
    setResult(null);
    setTimeout(() => {
      const profile =
        diseaseProfiles[Math.floor(Math.random() * diseaseProfiles.length)];
      setResult({
        ...profile,
        detectedImage: croppedImage || selectedImage,
        timestamp: new Date().toLocaleString('bn-BD'),
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
              background: '#f8f9fa',
              position: 'relative'
            }}>
              {selectedImage ? (
                <div
                  ref={imageContainerRef}
                  style={{
                    position: 'relative',
                    width: '100%',
                    minHeight: '280px',
                    maxHeight: '360px',
                    overflow: 'hidden',
                    borderRadius: '12px',
                    cursor: 'crosshair'
                  }}
                  onMouseDown={handleMouseDown}
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUp}
                  onMouseLeave={handleMouseUp}
                >
                  <img 
                    src={selectedImage} 
                    alt="Selected" 
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                  {cropRect && (
                    <div
                      style={{
                        position: 'absolute',
                        left: `${cropRect.x}px`,
                        top: `${cropRect.y}px`,
                        width: `${cropRect.width}px`,
                        height: `${cropRect.height}px`,
                        border: '2px solid #22d3ee',
                        background: 'rgba(34,211,238,0.15)',
                        pointerEvents: 'none'
                      }}
                    />
                  )}
                </div>
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
            <p style={{ color: '#6b7280', fontSize: '14px', marginTop: '-10px', marginBottom: '16px' }}>
              ছবির যে অংশে রোগের লক্ষণ আছে সেখানে ক্লিক করে ড্র্যাগ করুন।
            </p>
            <button
              onClick={handleCropConfirm}
              disabled={!cropRect}
              style={{
                width: '100%',
                padding: '12px',
                marginBottom: '10px',
                background: cropRect ? '#22d3ee' : '#cbd5f5',
                color: '#0f172a',
                border: 'none',
                borderRadius: '10px',
                fontWeight: 600,
                cursor: cropRect ? 'pointer' : 'not-allowed'
              }}
            >
              ক্রপ সংরক্ষণ করুন
            </button>
            {croppedImage && (
              <div style={{
                border: '1px solid #e5e7eb',
                borderRadius: '12px',
                padding: '16px',
                marginBottom: '15px',
                background: '#fff'
              }}>
                <p style={{ marginBottom: '10px', color: '#334155', fontWeight: 600 }}>ক্রপড প্রিভিউ</p>
                <img 
                  src={croppedImage}
                  alt="Cropped preview"
                  style={{ width: '100%', borderRadius: '10px' }}
                />
              </div>
            )}
            <button
              onClick={handleDetection}
              disabled={(!selectedImage && !croppedImage) || loading}
              style={{
                width: '100%',
                padding: '14px',
                background: ((!selectedImage && !croppedImage) || loading) ? '#ccc' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
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
              <article>
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px',
                  marginBottom: '20px'
                }}>
                  <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '12px',
                    alignItems: 'center'
                  }}>
                    <span style={{
                      padding: '6px 14px',
                      borderRadius: '30px',
                      background: '#eef2ff',
                      color: '#4338ca',
                      fontWeight: 600
                    }}>
                      {result.severity} ঝুঁকি
                    </span>
                    <span style={{
                      padding: '6px 14px',
                      borderRadius: '30px',
                      background: '#ecfdf5',
                      color: '#047857',
                      fontWeight: 600
                    }}>
                      আত্মবিশ্বাস {result.confidence}
                    </span>
                  </div>
                  <h3 style={{ color: '#111827', fontSize: '28px', margin: 0 }}>
                    {result.disease} ({result.latinName})
                  </h3>
                  <p style={{ color: '#6b7280', margin: 0 }}>বিশ্লেষণের সময়: {result.timestamp}</p>
                </div>

                {result.detectedImage && (
                  <div style={{
                    marginBottom: '24px',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    border: '1px solid #e5e7eb'
                  }}>
                    <img
                      src={result.detectedImage}
                      alt="Detection crop"
                      style={{ width: '100%', display: 'block' }}
                    />
                  </div>
                )}

                <p style={{ color: '#374151', lineHeight: 1.7, marginBottom: '24px' }}>
                  {result.summary}
                </p>

                <section style={{ marginBottom: '24px' }}>
                  <h4 style={{ color: '#111827', marginBottom: '10px' }}>রোগের কারণ</h4>
                  <ul style={{ paddingLeft: '18px', color: '#4b5563', lineHeight: 1.6 }}>
                    {result.causes.map((cause) => (
                      <li key={cause}>{cause}</li>
                    ))}
                  </ul>
                </section>

                <section style={{ marginBottom: '24px' }}>
                  <h4 style={{ color: '#111827', marginBottom: '10px' }}>সমাধান ও করণীয়</h4>
                  <ul style={{ paddingLeft: '18px', color: '#4b5563', lineHeight: 1.6 }}>
                    {result.solutions.map((solution) => (
                      <li key={solution}>{solution}</li>
                    ))}
                  </ul>
                </section>

                {result.blogSections.map((section) => (
                  <section
                    key={section.title}
                    style={{
                      padding: '18px',
                      borderRadius: '16px',
                      border: '1px solid #eef2ff',
                      background: '#fafaff',
                      marginBottom: '16px'
                    }}
                  >
                    <h5 style={{ color: '#4338ca', marginBottom: '10px', fontSize: '18px' }}>
                      {section.title}
                    </h5>
                    <p style={{ color: '#4c1d95', lineHeight: 1.7 }}>
                      {section.content}
                    </p>
                  </section>
                ))}
              </article>
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

