import { useEffect, useState } from 'react';

export default function Products() {
  const apiBase = import.meta.env.VITE_API_BASE_URL || 'http://localhost:6001/api';
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${apiBase}/products`);
        if (!res.ok) {
          throw new Error(`পণ্য লোড করা যাচ্ছে না (${res.status})।`);
        }
        const data = await res.json();
        setProducts(data);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch products:', err);
        const errorMsg = err.message.includes('fetch') 
          ? 'ব্যাকএন্ড সার্ভার চালু আছে কিনা পরীক্ষা করুন।' 
          : err.message || 'কিছু ভুল হয়েছে।';
        setError(errorMsg);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [apiBase]);

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
          {isLoading && (
            <p style={{ gridColumn: '1 / -1', textAlign: 'center', color: '#64748b' }}>
              পণ্য লোড হচ্ছে...
            </p>
          )}

          {error && !isLoading && (
            <p style={{ gridColumn: '1 / -1', textAlign: 'center', color: '#b91c1c', fontWeight: 600 }}>
              {error}
            </p>
          )}

          {!isLoading && !error && products.length === 0 && (
            <p style={{ gridColumn: '1 / -1', textAlign: 'center', color: '#475569' }}>
              এখনও কোনো পণ্য যোগ করা হয়নি। অনুগ্রহ করে “পণ্য যুক্ত করুন” পাতায় গিয়ে নতুন পণ্য যোগ করুন।
            </p>
          )}

          {!isLoading && !error && products.map(product => (
            <div
              key={product._id}
              className="card"
              style={{
                padding: '30px',
                transition: 'all 0.3s',
                border: 'none',
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                borderRadius: '15px',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px'
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
                width: '100%',
                height: '220px',
                borderRadius: '15px',
                background: '#f8fafc',
                border: '1px dashed #cbd5f5',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden'
              }}>
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.name}
                    style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                    onError={(e) => (e.currentTarget.style.display = 'none')}
                  />
                ) : (
                  <span style={{ fontSize: '64px' }}>🛒</span>
                )}
              </div>

              <div>
                <h2 style={{
                  color: '#333',
                  marginBottom: '6px',
                  fontSize: '24px',
                }}>
                  {product.name}
                </h2>
                <p style={{ color: '#64748b', margin: 0 }}>
                  উৎপত্তি: {product.origin || '—'}
                </p>
              </div>

              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '12px',
                color: '#475569',
                fontWeight: 600
              }}>
                <span>মূল্য: ${product.price}</span>
                <span>রেটিং: {product.rating} ⭐</span>
                <span>পরিমাণ: {product.quantity} টন</span>
              </div>

              <button
                style={{
                  width: '100%',
                  padding: '12px',
                  marginTop: 'auto',
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
                এখনই যোগাযোগ করুন
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

