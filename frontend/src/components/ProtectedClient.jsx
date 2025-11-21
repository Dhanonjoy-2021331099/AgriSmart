import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ProtectedClient({ children }){
  const navigate = useNavigate();
  useEffect(()=>{
    const t = localStorage.getItem('token');
    if(!t) {
      navigate('/login');
    }
  },[navigate]);
  return <>{children}</>;
}
