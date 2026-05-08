import React from 'react'
import serviceImg from '../../assets/service.jpg'

const serviceList = [
  { title: "Digital PR" },
  { title: "Organic Social & Content" },
  { title: "Search & Growth Strategy" },
  { title: "Content Experience" },
  { title: "Data & Insights" },
  { title: "Onsite SEO" },
]

export default function StatsSection() {
  return (
    <section
      style={{
        backgroundColor: '#ececec',
        padding: '100px 60px',
        fontFamily: 'sans-serif',
        color: '#1a1a1a',
      }}
    >
      {/* Upper Button */}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '60px' }}>
        <button
          style={{
            padding: '10px 24px',
            borderRadius: '50px',
            border: '1px solid rgba(0,0,0,0.1)',
            backgroundColor: 'white',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer',
          }}
        >
          Explore Our Work ↗
        </button>
      </div>

      {/* Main Heading with Inline Image */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '40px',
          borderBottom: '1px solid rgba(0,0,0,0.1)',
          paddingBottom: '40px',
        }}
      >
        <h1
          style={{
            fontSize: '110px',
            fontWeight: '600',
            margin: 0,
            display: 'flex',
            alignItems: 'center',
            letterSpacing: '-4px',
          }}
        >
          Our
          <img
            src={serviceImg}
            alt="Service"
            style={{
              width: '100px',
              height: '100px',
              borderRadius: '20px',
              objectFit: 'cover',
              margin: '0 25px',
            }}
          />
          Services
        </h1>

        <button
          style={{
            padding: '10px 24px',
            borderRadius: '50px',
            border: '1px solid rgba(0,0,0,0.1)',
            backgroundColor: 'white',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer',
          }}
        >
          View All Services ↗
        </button>
      </div>

      {/* Services Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          columnGap: '100px',
        }}
      >
        {serviceList.map((service, index) => (
          <div
            key={index}
            style={{
              padding: '35px 0',
              borderBottom: '1px solid rgba(0,0,0,0.1)',
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer',
            }}
          >
            <h2
              style={{
                fontSize: '52px',
                fontWeight: '600',
                margin: 0,
                letterSpacing: '-2px',
              }}
            >
              {service.title}
            </h2>
          </div>
        ))}
      </div>
    </section>
  )
}