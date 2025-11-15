import '../styles/globals.css'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export const metadata = { title:'Smart Agri' };

export default function RootLayout({ children }){
  return (
    <html lang="en">
      <body>
        <Navbar />
        <div className="container">{children}</div>
        <Footer />
      </body>
    </html>
  )
}
