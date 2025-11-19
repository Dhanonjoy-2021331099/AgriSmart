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
            Agri Smart
          </h1>
          <p style={{ 
            fontSize: '24px', 
            margin: '0 0 40px 0',
            opacity: 0.95
          }}>
            আধুনিক কৃষি সমাধান - মাটি পর্যবেক্ষণ, স্মার্ট সেচ ও ফসল ব্যবস্থাপনা
          </p>
          <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/register" style={{
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
              শুরু করুন
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
              লগইন করুন
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
            কেন Agri Smart বেছে নিবেন?
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
              <h3 style={{ margin: '0 0 15px 0', color: '#667eea' }}>রিয়েল-টাইম মনিটরিং</h3>
              <p style={{ color: '#666', lineHeight: '1.6' }}>
                উন্নত সেন্সর প্রযুক্তি দিয়ে মাটির আর্দ্রতা, তাপমাত্রা এবং pH মাত্রা রিয়েল-টাইমে পর্যবেক্ষণ করুন
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
              <h3 style={{ margin: '0 0 15px 0', color: '#667eea' }}>স্মার্ট সেচ</h3>
              <p style={{ color: '#666', lineHeight: '1.6' }}>
                স্বয়ংক্রিয় সেচ ব্যবস্থা যা মাটির অবস্থার উপর ভিত্তি করে পানির ব্যবহার অপ্টিমাইজ করে
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
              <h3 style={{ margin: '0 0 15px 0', color: '#667eea' }}>ফসল ব্যবস্থাপনা</h3>
              <p style={{ color: '#666', lineHeight: '1.6' }}>
                ফসল নির্বাচন, বপন এবং ফসল তোলার জন্য বিশেষজ্ঞ পরামর্শ পান
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
            কৃষি নিবন্ধ ও তথ্য
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
                  আধুনিক ধান চাষের কৌশল
                </h3>
                <p style={{ color: '#666', lineHeight: '1.6', margin: '0 0 15px 0' }}>
                  ধান চাষের সর্বশেষ পদ্ধতি আবিষ্কার করুন যা পানির ব্যবহার কমিয়ে ফলন ৩০% পর্যন্ত বৃদ্ধি করে। সুনির্দিষ্ট বপন এবং স্মার্ট সেচ ব্যবস্থা সম্পর্কে জানুন।
                </p>
                <Link href="/login" style={{
                  color: '#667eea',
                  fontWeight: '600',
                  textDecoration: 'none'
                }}>
                  আরও পড়ুন →
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
                  জৈব সবজি চাষ
                </h3>
                <p style={{ color: '#666', lineHeight: '1.6', margin: '0 0 15px 0' }}>
                  সবজির জন্য জৈব চাষের অনুশীলন আয়ত্ত করুন। প্রাকৃতিক সার, কীটপতঙ্গ নিয়ন্ত্রণ এবং পরিবেশ রক্ষাকারী টেকসই চাষের পদ্ধতি সম্পর্কে জানুন।
                </p>
                <Link href="/login" style={{
                  color: '#667eea',
                  fontWeight: '600',
                  textDecoration: 'none'
                }}>
                  আরও পড়ুন →
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
                  ভুট্টা উৎপাদনের সেরা অনুশীলন
                </h3>
                <p style={{ color: '#666', lineHeight: '1.6', margin: '0 0 15px 0' }}>
                  ডেটা-চালিত অন্তর্দৃষ্টি দিয়ে আপনার ভুট্টার ফসল অপ্টিমাইজ করুন। মাটির pH প্রয়োজনীয়তা, সর্বোত্তম বপন সময় এবং আধুনিক ফসল তোলার কৌশল বুঝুন।
                </p>
                <Link href="/login" style={{
                  color: '#667eea',
                  fontWeight: '600',
                  textDecoration: 'none'
                }}>
                  আরও পড়ুন →
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
              আমাদের কৃষকদের সাফল্যের গল্প
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
                  "Agri Smart আমাকে ধানের ফলন ৩৫% বৃদ্ধি করতে এবং পানির ব্যবহার কমাতে সাহায্য করেছে। রিয়েল-টাইম মনিটরিং একটি গেম-চেঞ্জার!"
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
                  "মাটি বিশ্লেষণ সরঞ্জামগুলি আশ্চর্যজনক! আমি এখন নিখুঁত pH ভারসাম্য সহ জৈব সবজি চাষ করতে পারি। অত্যন্ত সুপারিশকৃত!"
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
                  "স্মার্ট সেচ আমাকে পানির খরচে ৪০% সাশ্রয় করেছে। ড্যাশবোর্ড চাষকে অনেক সহজ এবং লাভজনক করে তোলে!"
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
            আপনার কৃষিকে রূপান্তর করতে প্রস্তুত?
          </h2>
          <p style={{ fontSize: '20px', margin: '0 0 40px 0', opacity: 0.95 }}>
            হাজার হাজার কৃষকের সাথে যোগ দিন যারা ইতিমধ্যে Agri Smart ব্যবহার করে তাদের ফলন বৃদ্ধি এবং খরচ কমানোর জন্য।
          </p>
          <Link href="/register" style={{
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
            বিনামূল্যে শুরু করুন
          </Link>
        </div>
      </section>
    </div>
  );
}
