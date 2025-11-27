import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { signInWithPopup } from 'firebase/auth';
import { toast } from 'react-toastify';
import { auth, googleProvider } from '../firebase/firebase.config';
import { useAppSettings } from '../Contexts/AppSettingsContext';

export default function Login(){
  const [form, setForm] = useState({email:'', password:''});
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { getText } = useAppSettings();
  const translate = (bn, en) => getText(bn, en);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg('');
    try {
      const api = import.meta.env.VITE_API_BASE_URL || 'http://localhost:6001/api';
      const res = await axios.post(api + '/auth/login', form);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      toast.success(translate('সফলভাবে লগইন হয়েছে!', 'Logged in successfully!'));
      navigate('/');
    } catch(err){
      const fallbackErr = translate('লগইন ব্যর্থ হয়েছে। আবার চেষ্টা করুন।', 'Login failed. Please try again.');
      setMsg(err.response?.data?.msg || fallbackErr);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    if (!auth || !googleProvider) {
      setMsg(translate('গুগল সাইন-ইন অনুপলব্ধ। Firebase কনফিগার করুন।', 'Google sign-in is unavailable. Please configure Firebase credentials.'));
      return;
    }
    setLoading(true);
    setMsg('');
    try {
      // Sign in with Google using Firebase
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      
      // Send user data to backend
      const api = import.meta.env.VITE_API_BASE_URL || 'http://localhost:6001/api';
      const res = await axios.post(api + '/auth/google', {
        googleId: user.uid,
        email: user.email,
        name: user.displayName || 'User',
        photoURL: user.photoURL || ''
      });
      
      // Store token and user data
      const mergedUser = {
        ...res.data.user,
        photoURL: res.data.user?.photoURL || user.photoURL || ''
      };
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(mergedUser));
      toast.success(translate('সফলভাবে লগইন হয়েছে!', 'Logged in successfully!'));
      navigate('/');
    } catch(err) {
      console.error('Google Sign-In Error:', err);
      if (err.code === 'auth/popup-closed-by-user') {
        setMsg(translate('গুগল সাইন-ইন বাতিল করা হয়েছে।', 'Google sign-in was cancelled.'));
      } else {
        setMsg(translate('গুগল সাইন-ইন ব্যর্থ হয়েছে। আবার চেষ্টা করুন।', 'Google sign-in failed. Please try again.'));
      }
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
            {translate('স্বাগতম', 'Welcome')}
          </h1>
          <p style={{ color: '#666', margin: 0 }}>
            {translate('আপনার Agri Smart অ্যাকাউন্টে সাইন ইন করুন', 'Sign in to your Agri Smart account')}
          </p>
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
              {translate('ইমেইল ঠিকানা', 'Email address')}
            </label>
            <input 
              required 
              type="email" 
              placeholder={translate('আপনার ইমেইল লিখুন', 'Enter your email')}
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

          <div style={{ marginBottom: '24px' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '8px', 
              color: '#333',
              fontWeight: '500',
              fontSize: '14px'
            }}>
              {translate('পাসওয়ার্ড', 'Password')}
            </label>
            <input 
              required 
              type="password" 
              placeholder={translate('আপনার পাসওয়ার্ড লিখুন', 'Enter your password')}
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
            {loading ? translate('সাইন ইন করা হচ্ছে...', 'Signing in...') : translate('সাইন ইন করুন', 'Sign in')}
          </button>
        </form>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          margin: '20px 0',
          color: '#999'
        }}>
          <div style={{ flex: 1, height: '1px', background: '#e0e0e0' }}></div>
          <span style={{ padding: '0 15px', fontSize: '14px' }}>{translate('অথবা', 'OR')}</span>
          <div style={{ flex: 1, height: '1px', background: '#e0e0e0' }}></div>
        </div>

        <button
          onClick={handleGoogleSignIn}
          disabled={loading}
          style={{
            width: '100%',
            padding: '14px',
            background: 'white',
            color: '#333',
            border: '2px solid #e0e0e0',
            borderRadius: '10px',
            fontSize: '16px',
            fontWeight: '500',
            cursor: loading ? 'not-allowed' : 'pointer',
            transition: 'all 0.3s',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px'
          }}
          onMouseEnter={(e) => !loading && (e.target.style.borderColor = '#667eea')}
          onMouseLeave={(e) => !loading && (e.target.style.borderColor = '#e0e0e0')}
        >
          <svg width="20" height="20" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          {translate('Google দিয়ে চালিয়ে যান', 'Continue with Google')}
        </button>

        {msg && (
          <div style={{
            padding: '12px',
            background: '#fee',
            color: '#c33',
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
            {translate('অ্যাকাউন্ট নেই?', "Don't have an account?")}{' '}
            <Link to="/register" style={{ 
              color: '#667eea', 
              fontWeight: '600',
              textDecoration: 'none'
            }}>
              {translate('এখনই নিবন্ধন করুন', 'Register now')}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
