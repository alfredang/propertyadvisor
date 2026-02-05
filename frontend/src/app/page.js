'use client';

import { useState, useEffect } from 'react';
import PropertyCard from '@/components/PropertyCard';
import Link from 'next/link';
import { API_BASE_URL } from '@/config';

export default function Home() {
  const [properties, setProperties] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetch(`${API_BASE_URL}/properties`)
      .then(res => res.json())
      .then(data => setProperties(data.slice(0, 6)))
      .catch(err => console.error('Error fetching props:', err));
  }, []);

  return (
    <div className="home-page">
      <section className="hero">
        <div className="container hero-content">
          <h1>Find Your Dream Home in Singapore</h1>
          <div className="search-box">
            <div className="tabs">
              <button className="active">Buy</button>
              <button>Rent</button>
            </div>
            <div className="input-group">
              <input
                type="text"
                placeholder="Search by location, project, or station..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Link href={`/search?location=${searchQuery}`} className="btn-primary search-btn">
                Search
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="featured container">
        <div className="section-header">
          <h2>Featured Properties</h2>
          <Link href="/search" className="view-all">View All Properties &rarr;</Link>
        </div>
        <div className="property-grid">
          {properties.map(property => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </section>

      <style jsx>{`
        .hero {
          background: linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('https://images.unsplash.com/photo-1525625230556-9e60abc59210?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80');
          background-size: cover;
          background-position: center;
          height: 500px;
          display: flex;
          align-items: center;
          color: white;
          text-align: center;
        }
        .hero-content h1 {
          font-size: 48px;
          font-weight: 800;
          margin-bottom: 30px;
          text-shadow: 0 2px 4px rgba(0,0,0,0.3);
        }
        .search-box {
          background: white;
          padding: 24px;
          border-radius: 12px;
          max-width: 800px;
          margin: 0 auto;
          box-shadow: 0 10px 25px rgba(0,0,0,0.2);
        }
        .tabs {
          display: flex;
          gap: 10px;
          margin-bottom: 20px;
        }
        .tabs button {
          background: none;
          color: #333;
          padding: 8px 24px;
          border-radius: 20px;
          font-weight: 600;
        }
        .tabs button.active {
          background: #e31837;
          color: white;
        }
        .input-group {
          display: flex;
          gap: 10px;
        }
        .input-group input {
          flex: 1;
          padding: 15px 20px;
          border: 1px solid #ddd;
          border-radius: 8px;
          font-size: 16px;
        }
        .search-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
        }
        .featured {
          padding: 80px 0;
        }
        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 40px;
        }
        .section-header h2 {
          font-size: 32px;
          color: #2c3e50;
        }
        .view-all {
          color: #e31837;
          font-weight: 600;
        }
        .property-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          gap: 30px;
        }
      `}</style>
    </div>
  );
}
