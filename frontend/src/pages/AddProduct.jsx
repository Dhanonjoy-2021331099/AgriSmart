import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppSettings } from '../Contexts/AppSettingsContext';

export default function AddProductPage() {
  const apiBase = import.meta.env.VITE_API_BASE_URL || 'http://localhost:6001/api';
  const [formData, setFormData] = useState({
    name: '',
    image: '',
    price: '',
    origin: '',
    rating: '',
    quantity: '',
  });
  const [status, setStatus] = useState(null);
  const [addedProducts, setAddedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { getText, theme } = useAppSettings();
  const t = (bn, en) => getText(bn, en);
  const isDark = theme === 'dark';
  
  // Theme-aware colors
  const bgColor = isDark ? '#0f172a' : '#f9fafb';
  const cardBg = isDark ? '#1e293b' : '#ffffff';
  const textColor = isDark ? '#f8fafc' : '#0f172a';
  const textSecondary = isDark ? '#cbd5e1' : '#475569';
  const textMuted = isDark ? '#94a3b8' : '#64748b';
  const borderColor = isDark ? '#334155' : '#e2e8f0';

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const res = await fetch(`${apiBase}/products`);
        
        // Check if response is JSON
        const contentType = res.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          const text = await res.text();
          console.error('Non-JSON response:', text.substring(0, 200));
          throw new Error('Server returned non-JSON response. Please check backend URL and ensure backend is running.');
        }
        
        if (!res.ok) {
          const errorData = await res.json().catch(() => ({}));
          throw new Error(errorData.message || `পণ্যের তালিকা লোড করা যায়নি (${res.status})।`);
        }
        const data = await res.json();
        setAddedProducts(data);
        setStatus(null); // Clear any previous errors
      } catch (error) {
        console.error('Failed to load products:', error);
        let errorMsg = 'কিছু ভুল হয়েছে।';
        
        if (error.message.includes('fetch') || error.message.includes('Failed to fetch')) {
          errorMsg = `ব্যাকএন্ড সার্ভার connect করতে পারছে না। API URL: ${apiBase}/products`;
        } else if (error.message.includes('non-JSON')) {
          errorMsg = error.message;
        } else {
          errorMsg = error.message || 'কিছু ভুল হয়েছে।';
        }
        
        setStatus({ type: 'error', message: errorMsg });
      } finally {
        setIsLoading(false);
      }
    };
    loadProducts();
  }, [apiBase]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isEmpty = Object.values(formData).some((value) => !value.trim());
    if (isEmpty) {
      setStatus({ type: 'error', message: 'সব ঘর পূরণ করুন।' });
      return;
    }
    const payload = {
      name: formData.name.trim(),
      image: formData.image.trim(),
      price: Number(formData.price),
      origin: formData.origin.trim(),
      rating: Number(formData.rating),
      quantity: Number(formData.quantity),
    };

    try {
      setIsSubmitting(true);
      setStatus(null); // Clear previous status
      
      const res = await fetch(`${apiBase}/products`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload),
      });

      // Check if response is JSON
      const contentType = res.headers.get('content-type') || '';
      if (!contentType.includes('application/json')) {
        const text = await res.text();
        console.error('Non-JSON response received:');
        console.error('Status:', res.status);
        console.error('Content-Type:', contentType);
        console.error('Response preview:', text.substring(0, 500));
        
        // Try to provide more helpful error message
        let errorMsg = 'Server returned non-JSON response. ';
        if (text.includes('<!DOCTYPE') || text.includes('<html')) {
          errorMsg += 'Backend may be returning HTML error page. Check Vercel logs.';
        } else if (res.status === 0 || !res.status) {
          errorMsg += 'Cannot connect to backend. Check if backend is deployed and URL is correct.';
        } else {
          errorMsg += `Received status ${res.status}. Check backend logs.`;
        }
        errorMsg += ` API URL: ${apiBase}/products`;
        throw new Error(errorMsg);
      }

      const responseData = await res.json();
      
      if (!res.ok) {
        throw new Error(responseData?.message || responseData?.error || `পণ্য যুক্ত করা যায়নি (${res.status})।`);
      }

      setAddedProducts((prev) => [responseData, ...prev]);
      setStatus({
        type: 'success',
        message: `${payload.name} সফলভাবে এক্সপোর্ট তালিকায় যুক্ত হয়েছে!`,
      });
      setFormData({
        name: '',
        image: '',
        price: '',
        origin: '',
        rating: '',
        quantity: '',
      });
    } catch (error) {
      console.error('Failed to add product:', error);
      let errorMsg = 'পণ্য যুক্ত করা যায়নি।';
      
      if (error.message.includes('fetch') || error.message.includes('Failed to fetch')) {
        errorMsg = `ব্যাকএন্ড সার্ভার connect করতে পারছে না। API URL: ${apiBase}/products`;
      } else if (error.message.includes('non-JSON')) {
        errorMsg = error.message;
      } else {
        errorMsg = error.message || 'পণ্য যুক্ত করা যায়নি।';
      }
      
      setStatus({
        type: 'error',
        message: errorMsg,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', padding: '40px 20px', background: bgColor }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
          <div>
            <p style={{ margin: 0, color: textMuted, fontWeight: 600, letterSpacing: '0.08em' }}>Export Product</p>
            <h1 style={{ fontSize: '40px', margin: '6px 0 10px', color: textColor }}>পণ্য যুক্ত করুন</h1>
            <p style={{ margin: 0, color: textSecondary, maxWidth: '620px' }}>
              আন্তর্জাতিক বাজারে পাঠানোর জন্য পণ্যের তথ্য দিন। ছবির URL যে কোনো মাপের হলেও প্রিভিউ বক্সে সঠিকভাবে দেখা যাবে।
            </p>
          </div>
          <Link
            to="/products"
            style={{
              padding: '14px 24px',
              borderRadius: '999px',
              border: `1px solid ${borderColor}`,
              color: textColor,
              fontWeight: 600,
              textDecoration: 'none',
            }}
          >
            ← পণ্যের তালিকায় ফিরে যান
          </Link>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '30px',
            marginTop: '40px',
          }}
        >
          <form
            onSubmit={handleSubmit}
            style={{
              background: cardBg,
              borderRadius: '24px',
              padding: '32px',
              boxShadow: isDark ? '0 30px 80px rgba(0,0,0,0.3)' : '0 30px 80px rgba(15,23,42,0.1)',
              border: `1px solid ${borderColor}`,
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              {[
                { label: 'পণ্যের নাম', name: 'name', type: 'text', placeholder: 'উদাহরণ: সুনামগঞ্জ ধান' },
                { label: 'ছবির লিংক (URL)', name: 'image', type: 'url', placeholder: 'https://example.com/rice.png' },
                { label: 'মূল্য (USD)', name: 'price', type: 'number', placeholder: 'উদাহরণ: 1200' },
                { label: 'উৎপত্তি দেশ', name: 'origin', type: 'text', placeholder: 'উদাহরণ: বাংলাদেশ' },
                { label: 'রেটিং (১-৫)', name: 'rating', type: 'number', step: '0.1', min: '0', max: '5', placeholder: '৪.৮' },
                { label: 'উপলব্ধ পরিমাণ (টন)', name: 'quantity', type: 'number', placeholder: 'উদাহরণ: 25' },
              ].map((field) => (
                <div key={field.name}>
                  <label style={{ display: 'block', fontWeight: 600, marginBottom: '6px', color: textColor }}>
                    {field.label}
                  </label>
                  <input
                    {...field}
                    value={formData[field.name]}
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      padding: '14px 16px',
                      borderRadius: '12px',
                      border: `1px solid ${borderColor}`,
                      fontSize: '16px',
                      outline: 'none',
                      transition: 'border 0.2s, box-shadow 0.2s',
                      background: isDark ? '#334155' : '#ffffff',
                      color: textColor,
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#6366f1';
                      e.target.style.boxShadow = '0 0 0 3px rgba(99,102,241,0.15)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = borderColor;
                      e.target.style.boxShadow = 'none';
                    }}
                    required
                  />
                </div>
              ))}

              <button
                type="submit"
                style={{
                  marginTop: '10px',
                  padding: '16px',
                  borderRadius: '16px',
                  border: 'none',
                  background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                  color: 'white',
                  fontSize: '18px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  boxShadow: '0 12px 30px rgba(34,197,94,0.25)',
                  transition: 'transform 0.2s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-2px)')}
                onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'পণ্য যুক্ত হচ্ছে...' : 'পণ্য যুক্ত করুন'}
              </button>
              {status && (
                <div
                  style={{
                    marginTop: '8px',
                    padding: '14px',
                    borderRadius: '12px',
                    background: status.type === 'success' 
                      ? (isDark ? '#065f46' : '#ecfdf5')
                      : (isDark ? '#7f1d1d' : '#fef2f2'),
                    color: status.type === 'success' 
                      ? (isDark ? '#6ee7b7' : '#047857')
                      : (isDark ? '#fca5a5' : '#b91c1c'),
                    fontWeight: 600,
                  }}
                >
                  {status.message}
                </div>
              )}
            </div>
          </form>

          <div
            style={{
              background: cardBg,
              borderRadius: '24px',
              padding: '32px',
              border: `1px solid ${borderColor}`,
              boxShadow: isDark ? '0 30px 80px rgba(0,0,0,0.3)' : '0 30px 80px rgba(15,23,42,0.08)',
              display: 'flex',
              flexDirection: 'column',
              gap: '24px',
            }}
          >
            <div>
              <p style={{ margin: 0, color: textMuted, fontWeight: 600 }}>লাইভ প্রিভিউ</p>
              <h2 style={{ margin: '6px 0 12px', color: textColor }}>
                {formData.name || 'পণ্য নাম আসবে এখানে'}
              </h2>
              <div
                style={{
                  width: '100%',
                  borderRadius: '20px',
                  border: `1px dashed ${borderColor}`,
                  background: isDark ? '#334155' : '#f8fafc',
                  height: '320px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden',
                  position: 'relative',
                }}
              >
                {formData.image ? (
                  <img
                    src={formData.image}
                    alt={formData.name || 'Product preview'}
                    style={{
                      maxWidth: '100%',
                      maxHeight: '100%',
                      objectFit: 'contain',
                    }}
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                ) : (
                  <div style={{ textAlign: 'center', color: textMuted }}>
                    <div style={{ fontSize: '48px' }}>🖼️</div>
                    <p>ছবির লিংক দিলে এখানে দেখা যাবে</p>
                  </div>
                )}
                {!formData.image && (
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      borderRadius: '20px',
                      border: `2px dashed ${isDark ? 'rgba(148,163,184,0.3)' : 'rgba(148,163,184,0.5)'}`,
                    }}
                  />
                )}
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '16px' }}>
              <div style={{ padding: '16px', borderRadius: '16px', background: isDark ? '#065f46' : '#f0fdf4' }}>
                <p style={{ margin: 0, color: isDark ? '#6ee7b7' : '#16a34a', fontSize: '13px', letterSpacing: '0.08em' }}>মূল্য</p>
                <h3 style={{ margin: '8px 0 0', color: textColor }}>
                  {formData.price ? `$${formData.price}` : '—'}
                </h3>
              </div>
              <div style={{ padding: '16px', borderRadius: '16px', background: isDark ? '#1e1b4b' : '#eef2ff' }}>
                <p style={{ margin: 0, color: isDark ? '#a5b4fc' : '#4338ca', fontSize: '13px', letterSpacing: '0.08em' }}>উৎপত্তি</p>
                <h3 style={{ margin: '8px 0 0', color: textColor }}>
                  {formData.origin || '—'}
                </h3>
              </div>
              <div style={{ padding: '16px', borderRadius: '16px', background: isDark ? '#7c2d12' : '#fff7ed' }}>
                <p style={{ margin: 0, color: isDark ? '#fdba74' : '#c2410c', fontSize: '13px', letterSpacing: '0.08em' }}>রেটিং</p>
                <h3 style={{ margin: '8px 0 0', color: textColor }}>
                  {formData.rating ? `${formData.rating} ⭐` : '—'}
                </h3>
              </div>
              <div style={{ padding: '16px', borderRadius: '16px', background: isDark ? '#831843' : '#fdf2f8' }}>
                <p style={{ margin: 0, color: isDark ? '#f9a8d4' : '#be185d', fontSize: '13px', letterSpacing: '0.08em' }}>পরিমাণ</p>
                <h3 style={{ margin: '8px 0 0', color: textColor }}>
                  {formData.quantity ? `${formData.quantity} টন` : '—'}
                </h3>
              </div>
            </div>
          </div>
        </div>

        {(isLoading || addedProducts.length > 0) && (
          <section style={{ marginTop: '60px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
              <h2 style={{ margin: 0, color: textColor, fontSize: '30px' }}>যুক্ত করা পণ্য</h2>
              <span style={{ 
                padding: '4px 12px', 
                borderRadius: '999px', 
                background: isDark ? '#1e1b4b' : '#eef2ff', 
                color: isDark ? '#a5b4fc' : '#4338ca', 
                fontWeight: 600 
              }}>
                {isLoading ? '…' : addedProducts.length}
              </span>
            </div>
            {isLoading ? (
              <p style={{ color: textSecondary }}>পণ্য লোড হচ্ছে...</p>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
                {addedProducts.map((product) => (
                <div
                  key={product._id || product.id}
                  style={{
                    background: cardBg,
                    borderRadius: '20px',
                    border: `1px solid ${borderColor}`,
                    padding: '20px',
                    boxShadow: isDark ? '0 15px 40px rgba(0,0,0,0.3)' : '0 15px 40px rgba(15,23,42,0.06)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px',
                  }}
                >
                  <div
                    style={{
                      width: '100%',
                      height: '180px',
                      borderRadius: '16px',
                      background: isDark ? '#334155' : '#f8fafc',
                      border: `1px dashed ${borderColor}`,
                      overflow: 'hidden',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {product.image ? (
                      <img
                        src={product.image}
                        alt={product.name}
                        style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                        onError={(e) => (e.currentTarget.style.display = 'none')}
                      />
                    ) : (
                      <div style={{ color: textMuted, textAlign: 'center' }}>
                        <div style={{ fontSize: '40px' }}>🖼️</div>
                        <p>ছবি নেই</p>
                      </div>
                    )}
                  </div>
                  <div>
                    <h3 style={{ margin: '0 0 6px', color: textColor }}>{product.name}</h3>
                    <p style={{ margin: 0, color: textMuted }}>{product.origin}</p>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px', flexWrap: 'wrap', color: textSecondary, fontWeight: 600 }}>
                    <span>${product.price}</span>
                    <span>{product.rating} ⭐</span>
                    <span>{product.quantity} টন</span>
                  </div>
                </div>
                ))}
              </div>
            )}
          </section>
        )}
      </div>
    </div>
  );
}

