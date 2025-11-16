'use client';
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Register(){
  const [form, setForm] = useState({name:'', email:'', password:'', phone:''});
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg('');
    try {
      const api = process.env.NEXT_PUBLIC_API || 'http://localhost:5000/api';
      const res = await axios.post(api + '/auth/register', form);
      localStorage.setItem('token', res.data.token);
      router.push('/dashboard');
    } catch(err){
      const errorMsg = err.response?.data?.msg || 'নিবন্ধন ব্যর্থ হয়েছে। আবার চেষ্টা করুন।';
      setMsg(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '20px'
    }}>
      <div style={{
        background: 'white',
        borderRadius: '20px',
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
        padding: '40px',
        maxWidth: '450px',
        width: '100%'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <h1 style={{ 
            margin: '0 0 10px 0', 
            fontSize: '32px', 
            fontWeight: '700',
            color: '#333',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            নিবন্ধন করুন
          </h1>
          <p style={{ color: '#666', margin: 0 }}>Agri Smart এ যোগ দিন এবং স্মার্ট কৃষি শুরু করুন</p>
        </div>

        <form onSubmit={submit}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '8px', 
              color: '#333',
              fontWeight: '500',
              fontSize: '14px'
            }}>
              সম্পূর্ণ নাম *
            </label>
            <input 
              required 
              type="text" 
              placeholder="আপনার সম্পূর্ণ নাম লিখুন" 
              value={form.name} 
              onChange={e=>setForm({...form,name:e.target.value})} 
              style={{
                width: '100%',
                padding: '14px 16px',
                border: '2px solid #e0e0e0',
                borderRadius: '10px',
                fontSize: '16px',
                transition: 'all 0.3s',
                boxSizing: 'border-box'
              }}
              onFocus={(e) => e.target.style.borderColor = '#667eea'}
              onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '8px', 
              color: '#333',
              fontWeight: '500',
              fontSize: '14px'
            }}>
              ইমেইল ঠিকানা *
            </label>
            <input 
              required 
              type="email" 
              placeholder="আপনার ইমেইল লিখুন" 
              value={form.email} 
              onChange={e=>setForm({...form,email:e.target.value})} 
              style={{
                width: '100%',
                padding: '14px 16px',
                border: '2px solid #e0e0e0',
                borderRadius: '10px',
                fontSize: '16px',
                transition: 'all 0.3s',
                boxSizing: 'border-box'
              }}
              onFocus={(e) => e.target.style.borderColor = '#667eea'}
              onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '8px', 
              color: '#333',
              fontWeight: '500',
              fontSize: '14px'
            }}>
              ফোন নম্বর (ঐচ্ছিক)
            </label>
            <input 
              type="tel" 
              placeholder="আপনার ফোন নম্বর লিখুন" 
              value={form.phone} 
              onChange={e=>setForm({...form,phone:e.target.value})} 
              style={{
                width: '100%',
                padding: '14px 16px',
                border: '2px solid #e0e0e0',
                borderRadius: '10px',
                fontSize: '16px',
                transition: 'all 0.3s',
                boxSizing: 'border-box'
              }}
              onFocus={(e) => e.target.style.borderColor = '#667eea'}
              onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
            />
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '8px', 
              color: '#333',
              fontWeight: '500',
              fontSize: '14px'
            }}>
              পাসওয়ার্ড *
            </label>
            <input 
              required 
              type="password" 
              placeholder="পাসওয়ার্ড তৈরি করুন" 
              value={form.password} 
              onChange={e=>setForm({...form,password:e.target.value})} 
              style={{
                width: '100%',
                padding: '14px 16px',
                border: '2px solid #e0e0e0',
                borderRadius: '10px',
                fontSize: '16px',
                transition: 'all 0.3s',
                boxSizing: 'border-box'
              }}
              onFocus={(e) => e.target.style.borderColor = '#667eea'}
              onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
            />
          </div>

          <button 
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '14px',
              background: loading ? '#ccc' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '10px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s',
              marginBottom: '16px',
              boxShadow: loading ? 'none' : '0 4px 15px rgba(102, 126, 234, 0.4)'
            }}
            onMouseEnter={(e) => !loading && (e.target.style.transform = 'translateY(-2px)')}
            onMouseLeave={(e) => !loading && (e.target.style.transform = 'translateY(0)')}
          >
            {loading ? 'নিবন্ধন করা হচ্ছে...' : 'নিবন্ধন করুন'}
          </button>
        </form>

        {msg && (
          <div style={{
            padding: '12px',
            background: msg.includes('success') ? '#efe' : '#fee',
            color: msg.includes('success') ? '#3c3' : '#c33',
            borderRadius: '8px',
            marginBottom: '16px',
            fontSize: '14px',
            textAlign: 'center'
          }}>
            {msg}
          </div>
        )}

        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <p style={{ color: '#666', margin: 0 }}>
            ইতিমধ্যে একটি অ্যাকাউন্ট আছে?{' '}
            <Link href="/login" style={{ 
              color: '#667eea', 
              fontWeight: '600',
              textDecoration: 'none'
            }}>
              লগইন করুন
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

