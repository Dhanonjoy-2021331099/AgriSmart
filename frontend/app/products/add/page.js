'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function AddProductPage() {
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isEmpty = Object.values(formData).some((value) => !value.trim());
    if (isEmpty) {
      setStatus({ type: 'error', message: 'সব ঘর পূরণ করুন।' });
      return;
    }
    const newProduct = {
      ...formData,
      id: Date.now().toString(),
    };
    setAddedProducts((prev) => [newProduct, ...prev]);
    setStatus({
      type: 'success',
      message: `${formData.name} সফলভাবে এক্সপোর্ট তালিকায় যুক্ত হয়েছে!`,
    });
    setFormData({
      name: '',
      image: '',
      price: '',
      origin: '',
      rating: '',
      quantity: '',
    });
  };

  return (
    <div style={{ minHeight: '100vh', padding: '40px 20px', background: '#f9fafb' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
          <div>
            <p style={{ margin: 0, color: '#64748b', fontWeight: 600, letterSpacing: '0.08em' }}>Export Product</p>
            <h1 style={{ fontSize: '40px', margin: '6px 0 10px', color: '#0f172a' }}>পণ্য যুক্ত করুন</h1>
            <p style={{ margin: 0, color: '#475569', maxWidth: '620px' }}>
              আন্তর্জাতিক বাজারে পাঠানোর জন্য পণ্যের তথ্য দিন। ছবির URL যে কোনো মাপের হলেও প্রিভিউ বক্সে সঠিকভাবে দেখা যাবে।
            </p>
          </div>
          <Link
            href="/products"
            style={{
              padding: '14px 24px',
              borderRadius: '999px',
              border: '1px solid #e2e8f0',
              color: '#0f172a',
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
              background: 'white',
              borderRadius: '24px',
              padding: '32px',
              boxShadow: '0 30px 80px rgba(15,23,42,0.1)',
              border: '1px solid #e2e8f0',
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
                  <label style={{ display: 'block', fontWeight: 600, marginBottom: '6px', color: '#0f172a' }}>
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
                      border: '1px solid #cbd5f5',
                      fontSize: '16px',
                      outline: 'none',
                      transition: 'border 0.2s, box-shadow 0.2s',
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#6366f1';
                      e.target.style.boxShadow = '0 0 0 3px rgba(99,102,241,0.15)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = '#cbd5f5';
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
              >
                পণ্য যুক্ত করুন
              </button>
              {status && (
                <div
                  style={{
                    marginTop: '8px',
                    padding: '14px',
                    borderRadius: '12px',
                    background: status.type === 'success' ? '#ecfdf5' : '#fef2f2',
                    color: status.type === 'success' ? '#047857' : '#b91c1c',
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
              background: 'white',
              borderRadius: '24px',
              padding: '32px',
              border: '1px solid #e2e8f0',
              boxShadow: '0 30px 80px rgba(15,23,42,0.08)',
              display: 'flex',
              flexDirection: 'column',
              gap: '24px',
            }}
          >
            <div>
              <p style={{ margin: 0, color: '#94a3b8', fontWeight: 600 }}>লাইভ প্রিভিউ</p>
              <h2 style={{ margin: '6px 0 12px', color: '#0f172a' }}>
                {formData.name || 'পণ্য নাম আসবে এখানে'}
              </h2>
              <div
                style={{
                  width: '100%',
                  borderRadius: '20px',
                  border: '1px dashed #cbd5f5',
                  background: '#f8fafc',
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
                  <div style={{ textAlign: 'center', color: '#94a3b8' }}>
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
                      border: '2px dashed rgba(148,163,184,0.5)',
                    }}
                  />
                )}
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '16px' }}>
              <div style={{ padding: '16px', borderRadius: '16px', background: '#f0fdf4' }}>
                <p style={{ margin: 0, color: '#16a34a', fontSize: '13px', letterSpacing: '0.08em' }}>মূল্য</p>
                <h3 style={{ margin: '8px 0 0', color: '#0f172a' }}>
                  {formData.price ? `$${formData.price}` : '—'}
                </h3>
              </div>
              <div style={{ padding: '16px', borderRadius: '16px', background: '#eef2ff' }}>
                <p style={{ margin: 0, color: '#4338ca', fontSize: '13px', letterSpacing: '0.08em' }}>উৎপত্তি</p>
                <h3 style={{ margin: '8px 0 0', color: '#111827' }}>
                  {formData.origin || '—'}
                </h3>
              </div>
              <div style={{ padding: '16px', borderRadius: '16px', background: '#fff7ed' }}>
                <p style={{ margin: 0, color: '#c2410c', fontSize: '13px', letterSpacing: '0.08em' }}>রেটিং</p>
                <h3 style={{ margin: '8px 0 0', color: '#7c2d12' }}>
                  {formData.rating ? `${formData.rating} ⭐` : '—'}
                </h3>
              </div>
              <div style={{ padding: '16px', borderRadius: '16px', background: '#fdf2f8' }}>
                <p style={{ margin: 0, color: '#be185d', fontSize: '13px', letterSpacing: '0.08em' }}>পরিমাণ</p>
                <h3 style={{ margin: '8px 0 0', color: '#831843' }}>
                  {formData.quantity ? `${formData.quantity} টন` : '—'}
                </h3>
              </div>
            </div>
          </div>
        </div>

        {addedProducts.length > 0 && (
          <section style={{ marginTop: '60px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
              <h2 style={{ margin: 0, color: '#0f172a', fontSize: '30px' }}>যুক্ত করা পণ্য</h2>
              <span style={{ padding: '4px 12px', borderRadius: '999px', background: '#eef2ff', color: '#4338ca', fontWeight: 600 }}>
                {addedProducts.length}
              </span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
              {addedProducts.map((product) => (
                <div
                  key={product.id}
                  style={{
                    background: 'white',
                    borderRadius: '20px',
                    border: '1px solid #e2e8f0',
                    padding: '20px',
                    boxShadow: '0 15px 40px rgba(15,23,42,0.06)',
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
                      background: '#f8fafc',
                      border: '1px dashed #cbd5f5',
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
                      <div style={{ color: '#94a3b8', textAlign: 'center' }}>
                        <div style={{ fontSize: '40px' }}>🖼️</div>
                        <p>ছবি নেই</p>
                      </div>
                    )}
                  </div>
                  <div>
                    <h3 style={{ margin: '0 0 6px', color: '#0f172a' }}>{product.name}</h3>
                    <p style={{ margin: 0, color: '#64748b' }}>{product.origin}</p>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px', flexWrap: 'wrap', color: '#475569', fontWeight: 600 }}>
                    <span>${product.price}</span>
                    <span>{product.rating} ⭐</span>
                    <span>{product.quantity} টন</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

