'use client';
import Link from 'next/link';

export default function Home(){
  return (
    <div style={{ minHeight: '100vh', background: '#f8f9fa' }}>
      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '80px 20px',
        textAlign: 'center'
      }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h1 style={{ 
            fontSize: '56px', 
            fontWeight: '800', 
            margin: '0 0 20px 0',
            textShadow: '2px 2px 4px rgba(0,0,0,0.2)'
          }}>
            Smart Agri
          </h1>
          <p style={{ 
            fontSize: '24px', 
            margin: '0 0 40px 0',
            opacity: 0.95
          }}>
            Modern Farming Solutions - Soil Monitoring, Smart Irrigation & Crop Management
          </p>
          <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/signup" style={{
              padding: '16px 32px',
              background: 'white',
              color: '#667eea',
              borderRadius: '50px',
              textDecoration: 'none',
              fontWeight: '600',
              fontSize: '18px',
              boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
              transition: 'all 0.3s',
              display: 'inline-block'
            }}
            onMouseEnter={(e) => e.target.style.transform = 'translateY(-3px)'}
            onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
            >
              Get Started
            </Link>
            <Link href="/login" style={{
              padding: '16px 32px',
              background: 'transparent',
              color: 'white',
              border: '2px solid white',
              borderRadius: '50px',
              textDecoration: 'none',
              fontWeight: '600',
              fontSize: '18px',
              transition: 'all 0.3s',
              display: 'inline-block'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = 'white';
              e.target.style.color = '#667eea';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'transparent';
              e.target.style.color = 'white';
            }}
            >
              Sign In
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section style={{ padding: '60px 20px', background: 'white' }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ 
            textAlign: 'center', 
            fontSize: '40px', 
            marginBottom: '50px',
            color: '#333'
          }}>
            Why Choose Smart Agri?
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '30px'
          }}>
            <div className="card" style={{
              padding: '30px',
              textAlign: 'center',
              transition: 'all 0.3s',
              border: 'none',
              boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
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
              <div style={{ fontSize: '48px', marginBottom: '15px' }}>📊</div>
              <h3 style={{ margin: '0 0 15px 0', color: '#667eea' }}>Real-time Monitoring</h3>
              <p style={{ color: '#666', lineHeight: '1.6' }}>
                Monitor soil moisture, temperature, and pH levels in real-time with advanced sensor technology
              </p>
            </div>

            <div className="card" style={{
              padding: '30px',
              textAlign: 'center',
              transition: 'all 0.3s',
              border: 'none',
              boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
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
              <div style={{ fontSize: '48px', marginBottom: '15px' }}>💧</div>
              <h3 style={{ margin: '0 0 15px 0', color: '#667eea' }}>Smart Irrigation</h3>
              <p style={{ color: '#666', lineHeight: '1.6' }}>
                Automated irrigation systems that optimize water usage based on soil conditions
              </p>
            </div>

            <div className="card" style={{
              padding: '30px',
              textAlign: 'center',
              transition: 'all 0.3s',
              border: 'none',
              boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
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
              <div style={{ fontSize: '48px', marginBottom: '15px' }}>🌾</div>
              <h3 style={{ margin: '0 0 15px 0', color: '#667eea' }}>Crop Management</h3>
              <p style={{ color: '#666', lineHeight: '1.6' }}>
                Get expert recommendations for crop selection, planting, and harvesting
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Articles & Images Section */}
      <section style={{ padding: '60px 20px', background: '#f8f9fa' }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ 
            textAlign: 'center', 
            fontSize: '40px', 
            marginBottom: '50px',
            color: '#333'
          }}>
            Farming Articles & Insights
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '30px',
            marginBottom: '50px'
          }}>
            {/* Article 1 */}
            <div className="card" style={{
              overflow: 'hidden',
              border: 'none',
              boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
              transition: 'all 0.3s'
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
                height: '200px',
                background: 'linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '80px'
              }}>
                🌾
              </div>
              <div style={{ padding: '25px' }}>
                <h3 style={{ margin: '0 0 15px 0', color: '#333', fontSize: '24px' }}>
                  Modern Rice Cultivation Techniques
                </h3>
                <p style={{ color: '#666', lineHeight: '1.6', margin: '0 0 15px 0' }}>
                  Discover the latest methods in rice farming that increase yield by up to 30% while reducing water consumption. Learn about precision planting and smart irrigation systems.
                </p>
                <Link href="/login" style={{
                  color: '#667eea',
                  fontWeight: '600',
                  textDecoration: 'none'
                }}>
                  Read More →
                </Link>
              </div>
            </div>

            {/* Article 2 */}
            <div className="card" style={{
              overflow: 'hidden',
              border: 'none',
              boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
              transition: 'all 0.3s'
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
                height: '200px',
                background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '80px'
              }}>
                🥬
              </div>
              <div style={{ padding: '25px' }}>
                <h3 style={{ margin: '0 0 15px 0', color: '#333', fontSize: '24px' }}>
                  Organic Vegetable Farming
                </h3>
                <p style={{ color: '#666', lineHeight: '1.6', margin: '0 0 15px 0' }}>
                  Master organic farming practices for vegetables. Learn about natural fertilizers, pest control, and sustainable farming methods that protect the environment.
                </p>
                <Link href="/login" style={{
                  color: '#667eea',
                  fontWeight: '600',
                  textDecoration: 'none'
                }}>
                  Read More →
                </Link>
              </div>
            </div>

            {/* Article 3 */}
            <div className="card" style={{
              overflow: 'hidden',
              border: 'none',
              boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
              transition: 'all 0.3s'
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
                height: '200px',
                background: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '80px'
              }}>
                🌽
              </div>
              <div style={{ padding: '25px' }}>
                <h3 style={{ margin: '0 0 15px 0', color: '#333', fontSize: '24px' }}>
                  Corn Production Best Practices
                </h3>
                <p style={{ color: '#666', lineHeight: '1.6', margin: '0 0 15px 0' }}>
                  Optimize your corn harvest with data-driven insights. Understand soil pH requirements, optimal planting times, and modern harvesting techniques.
                </p>
                <Link href="/login" style={{
                  color: '#667eea',
                  fontWeight: '600',
                  textDecoration: 'none'
                }}>
                  Read More →
                </Link>
              </div>
            </div>
          </div>

          {/* Farmer Success Stories */}
          <div style={{ marginTop: '60px' }}>
            <h2 style={{ 
              textAlign: 'center', 
              fontSize: '40px', 
              marginBottom: '50px',
              color: '#333'
            }}>
              Success Stories from Our Farmers
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '30px'
            }}>
              <div className="card" style={{
                textAlign: 'center',
                padding: '30px',
                border: 'none',
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
              }}>
                <div style={{
                  width: '120px',
                  height: '120px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  margin: '0 auto 20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '60px'
                }}>
                  👨‍🌾
                </div>
                <h3 style={{ margin: '0 0 10px 0', color: '#333' }}>Rahul Kumar</h3>
                <p style={{ color: '#667eea', fontWeight: '600', margin: '0 0 15px 0' }}>Rice Farmer, West Bengal</p>
                <p style={{ color: '#666', lineHeight: '1.6', fontStyle: 'italic' }}>
                  "Smart Agri helped me increase my rice yield by 35% and reduce water usage. The real-time monitoring is a game-changer!"
                </p>
              </div>

              <div className="card" style={{
                textAlign: 'center',
                padding: '30px',
                border: 'none',
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
              }}>
                <div style={{
                  width: '120px',
                  height: '120px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                  margin: '0 auto 20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '60px'
                }}>
                  👩‍🌾
                </div>
                <h3 style={{ margin: '0 0 10px 0', color: '#333' }}>Priya Sharma</h3>
                <p style={{ color: '#667eea', fontWeight: '600', margin: '0 0 15px 0' }}>Vegetable Farmer, Punjab</p>
                <p style={{ color: '#666', lineHeight: '1.6', fontStyle: 'italic' }}>
                  "The soil analysis tools are amazing! I can now grow organic vegetables with perfect pH balance. Highly recommended!"
                </p>
              </div>

              <div className="card" style={{
                textAlign: 'center',
                padding: '30px',
                border: 'none',
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
              }}>
                <div style={{
                  width: '120px',
                  height: '120px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                  margin: '0 auto 20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '60px'
                }}>
                  👨‍🌾
                </div>
                <h3 style={{ margin: '0 0 10px 0', color: '#333' }}>Amit Patel</h3>
                <p style={{ color: '#667eea', fontWeight: '600', margin: '0 0 15px 0' }}>Corn Farmer, Gujarat</p>
                <p style={{ color: '#666', lineHeight: '1.6', fontStyle: 'italic' }}>
                  "Smart irrigation saved me 40% on water costs. The dashboard makes farming so much easier and profitable!"
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '80px 20px',
        textAlign: 'center'
      }}>
        <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '42px', margin: '0 0 20px 0' }}>
            Ready to Transform Your Farming?
          </h2>
          <p style={{ fontSize: '20px', margin: '0 0 40px 0', opacity: 0.95 }}>
            Join thousands of farmers who are already using Smart Agri to improve their yields and reduce costs.
          </p>
          <Link href="/signup" style={{
            padding: '18px 40px',
            background: 'white',
            color: '#667eea',
            borderRadius: '50px',
            textDecoration: 'none',
            fontWeight: '700',
            fontSize: '20px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
            transition: 'all 0.3s',
            display: 'inline-block'
          }}
          onMouseEnter={(e) => e.target.style.transform = 'translateY(-3px) scale(1.05)'}
          onMouseLeave={(e) => e.target.style.transform = 'translateY(0) scale(1)'}
          >
            Start Your Free Trial
          </Link>
        </div>
      </section>
    </div>
  );
}
