import Link from 'next/link';

export default function Navbar(){
  return (
    <header className="nav">
      <div style={{fontWeight:700}}>Smart Agri</div>
      <nav>
        <Link href="/" style={{marginRight:12,color:'#fff'}}>Home</Link>
        <Link href="/tools" style={{marginRight:12,color:'#fff'}}>Tools</Link>
        <Link href="/dashboard" style={{marginRight:12,color:'#fff'}}>Dashboard</Link>
        <Link href="/admin" style={{color:'#fff'}}>Admin</Link>
      </nav>
    </header>
  )
}
