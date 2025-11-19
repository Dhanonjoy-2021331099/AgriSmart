'use client';

export default function Products() {
  const products = [
    {
      id: 1,
      name: 'স্মার্ট সেন্সর',
      description: 'মাটির আর্দ্রতা, তাপমাত্রা এবং pH পরিমাপের জন্য',
      price: '৫,০০০ টাকা',
      image: '📡',
      features: ['রিয়েল-টাইম মনিটরিং', 'ওয়াই-ফাই সংযোগ', 'মোবাইল অ্যাপ']
    },
    {
      id: 2,
      name: 'অটোমেটিক সেচ সিস্টেম',
      description: 'স্বয়ংক্রিয় সেচ ব্যবস্থাপনা',
      price: '১৫,০০০ টাকা',
      image: '💧',
      features: ['স্বয়ংক্রিয় নিয়ন্ত্রণ', 'পানি সাশ্রয়', 'মোবাইল কন্ট্রোল']
    },
    {
      id: 3,
      name: 'ড্রোন সার্ভিস',
      description: 'ফসলের উপরিভাগ পর্যবেক্ষণ',
      price: '১০,০০০ টাকা/বার',
      image: '🚁',
      features: ['এআই বিশ্লেষণ', 'HD ক্যামেরা', 'রিপোর্ট']
    },
    {
      id: 4,
      name: 'কৃষি উপকরণ প্যাকেজ',
      description: 'সম্পূর্ণ কৃষি সরঞ্জাম সেট',
      price: '২৫,০০০ টাকা',
      image: '📦',
      features: ['সেন্সর', 'সেচ সিস্টেম', 'সফটওয়্যার']
    },
    {
      id: 5,
      name: 'মোবাইল অ্যাপ',
      description: 'কৃষি ব্যবস্থাপনার জন্য অ্যাপ',
      price: 'মাসিক ৫০০ টাকা',
      image: '📱',
      features: ['ড্যাশবোর্ড', 'এলার্ট', 'রিপোর্ট']
    },
    {
      id: 6,
      name: 'কনসাল্টেশন সার্ভিস',
      description: 'কৃষি বিশেষজ্ঞ পরামর্শ',
      price: '২,০০০ টাকা/ঘণ্টা',
      image: '👨‍🌾',
      features: ['বিশেষজ্ঞ পরামর্শ', 'ফিল্ড ভিজিট', 'রিপোর্ট']
    }
  ];

  return (
    <div style={{ minHeight: '100vh', padding: '40px 20px', background: 'var(--bg, #f8f9fa)' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <h1 style={{ 
          fontSize: '42px', 
          marginBottom: '10px',
          color: '#333',
          textAlign: 'center'
        }}>
          আমাদের পণ্য
        </h1>
        <p style={{ 
          textAlign: 'center', 
          color: '#666', 
          marginBottom: '50px',
          fontSize: '18px'
        }}>
          আধুনিক কৃষির জন্য প্রয়োজনীয় সব সরঞ্জাম
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '30px',
          marginTop: '40px'
        }}>
          {products.map(product => (
            <div 
              key={product.id}
              className="card" 
              style={{
                padding: '30px',
                transition: 'all 0.3s',
                border: 'none',
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                borderRadius: '15px',
                display: 'flex',
                flexDirection: 'column'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
              }}
            >
              <div style={{
                fontSize: '64px',
                textAlign: 'center',
                marginBottom: '20px'
              }}>
                {product.image}
              </div>
              
              <h2 style={{ 
                color: '#333', 
                marginBottom: '10px',
                fontSize: '24px',
                textAlign: 'center'
              }}>
                {product.name}
              </h2>
              
              <p style={{ 
                color: '#666', 
                marginBottom: '20px',
                textAlign: 'center',
                lineHeight: '1.6'
              }}>
                {product.description}
              </p>

              <div style={{ marginBottom: '20px', flexGrow: 1 }}>
                <h4 style={{ color: '#667eea', marginBottom: '10px' }}>সুবিধা:</h4>
                <ul style={{ 
                  listStyle: 'none', 
                  padding: 0,
                  margin: 0
                }}>
                  {product.features.map((feature, idx) => (
                    <li key={idx} style={{ 
                      color: '#666', 
                      marginBottom: '8px',
                      paddingLeft: '20px',
                      position: 'relative'
                    }}>
                      <span style={{
                        position: 'absolute',
                        left: 0,
                        color: '#22c55e'
                      }}>✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div style={{
                padding: '15px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                borderRadius: '10px',
                textAlign: 'center',
                marginTop: 'auto'
              }}>
                <div style={{ fontSize: '28px', fontWeight: '700' }}>
                  {product.price}
                </div>
              </div>

              <button
                style={{
                  width: '100%',
                  padding: '12px',
                  marginTop: '15px',
                  background: 'white',
                  color: '#667eea',
                  border: '2px solid #667eea',
                  borderRadius: '10px',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = '#667eea';
                  e.target.style.color = 'white';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'white';
                  e.target.style.color = '#667eea';
                }}
              >
                এখনই কিনুন
              </button>
            </div>
          ))}
        </div>

        {/* Contact Section */}
        <div style={{
          marginTop: '60px',
          padding: '40px',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          borderRadius: '20px',
          color: 'white',
          textAlign: 'center'
        }}>
          <h2 style={{ fontSize: '32px', marginBottom: '15px' }}>
            আরও তথ্য চাই?
          </h2>
          <p style={{ fontSize: '18px', marginBottom: '25px', opacity: 0.95 }}>
            আমাদের সাথে যোগাযোগ করুন এবং আপনার কৃষি ব্যবস্থাপনার জন্য সেরা সমাধান পান
          </p>
          <button
            style={{
              padding: '14px 32px',
              background: 'white',
              color: '#667eea',
              border: 'none',
              borderRadius: '50px',
              fontSize: '18px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s'
            }}
            onMouseEnter={(e) => e.target.style.transform = 'translateY(-3px)'}
            onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
          >
            যোগাযোগ করুন
          </button>
        </div>
      </div>
    </div>
  );
}

