import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Outlet } from 'react-router-dom';

export default function MainLayout() {
  return (
    <>
      <Navbar />
      <div className="container" style={{ minHeight: 'calc(100vh - 200px)' }}>
        <Outlet />
      </div>
      <Footer />
    </>
  );
}

