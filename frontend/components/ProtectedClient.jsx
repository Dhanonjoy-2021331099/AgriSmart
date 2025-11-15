'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ProtectedClient({ children }){
  const router = useRouter();
  useEffect(()=>{
    const t = localStorage.getItem('token');
    if(!t) {
      router.push('/login');
    }
  },[router]);
  return <>{children}</>;
}
