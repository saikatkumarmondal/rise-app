import React from 'react'
import GoogleImg from '../../assets/google.jpg'

export default function FeaturedWork() {
  return (
    <section
      style={{
        backgroundColor: '#ececec', // ইমেজের মতো হালকা গ্রে ব্যাকগ্রাউন্ড
        padding: '100px 60px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        minHeight: '450px',
        fontFamily: 'sans-serif', // ক্লিন সেরিফ-লেস ফন্ট
      }}
    >
      {/* বাম পাশের টেক্সট সেকশন */}
      <div style={{ flex: '0 0 35%', marginTop: '20px' }}>
        <p
          style={{
            fontSize: '28px',
            fontWeight: '600',
            lineHeight: '1.1',
            letterSpacing: '-1.5px',
            color: '#1a1a1a',
            margin: 0,
          }}
        >
          A global team of search-first content marketers engineering semantic relevancy & category signals for both the internet and people
        </p>
      </div>

      {/* ডান পাশের টাইটেল এবং বাটন সেকশন */}
      <div style={{ flex: '0 0 60%', display: 'flex', flexDirection: 'column' }}>
        <h1
          style={{
            fontSize: '85px', // টেক্সট সাইজ কমানো হয়েছে
            fontWeight: '600',
            lineHeight: '0.9',
            letterSpacing: '-4px',
            color: '#1a1a1a',
            margin: '0 0 60px 0',
            whiteSpace: 'nowrap' // এক লাইনে রাখার জন্য
          }}
        >
          Driving Demand &<br />
          <span style={{ display: 'inline-flex', alignItems: 'center' }}>
            Discovery
            <img
              src={GoogleImg}
              alt="Google"
              style={{
                width: '85px', // ফন্টের সাথে সামঞ্জস্য রেখে ইমেজের আকার সামান্য কমানো হয়েছে
                height: '85px',
                borderRadius: '20px', // রাউন্ডেড কর্নার
                objectFit: 'cover',
                marginLeft: '20px',
                verticalAlign: 'middle',
              }}
            />
          </span>
        </h1>

        {/* বাটন গ্রুপ */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '30px' }}>
          <button
            style={{
              padding: '18px 35px',
              borderRadius: '50px',
              border: 'none',
              backgroundColor: '#ffffff',
              fontSize: '18px',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
            }}
          >
            Our Story <span style={{ fontSize: '14px' }}>↗</span>
          </button>
          
          <button
            style={{
              backgroundColor: 'transparent',
              border: 'none',
              fontSize: '18px',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              color: '#1a1a1a',
            }}
          >
            Our Services <span style={{ fontSize: '14px' }}>↗</span>
          </button>
        </div>
      </div>
    </section>
  )
}