'use client';

import { Suspense, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import PropertyCard from '@/components/PropertyCard';
import { API_BASE_URL } from '@/config';

function SearchResults() {
  const searchParams = useSearchParams();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true);
      try {
        const query = new URLSearchParams(searchParams).toString();
        const res = await fetch(`${API_BASE_URL}/properties?${query}`);
        const data = await res.json();
        setProperties(data);
      } catch (err) {
        console.error('Search failed:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, [searchParams]);

  return (
    <div className="search-page">
      <div className="container">
        <div className="search-layout">
          <aside className="filters">
            <h3>Filters</h3>
            {/* Simple filter UI placeholder */}
            <div className="filter-group">
              <label>Property Type</label>
              <select>
                <option>All Types</option>
                <option>Condo</option>
                <option>HDB</option>
                <option>Landed</option>
              </select>
            </div>
            <div className="filter-group">
              <label>Price Range</label>
              <div className="range-inputs">
                <input type="number" placeholder="Min" />
                <input type="number" placeholder="Max" />
              </div>
            </div>
          </aside>

          <div className="results-container">
            <div className="results-header">
              <h1>Search Results</h1>
              <p>{properties.length} properties found</p>
            </div>

            {loading ? (
              <div className="loading">Loading properties...</div>
            ) : (
              <div className="results-grid">
                {properties.map(property => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        .search-page {
          padding: 40px 0;
        }
        .search-layout {
          display: grid;
          grid-template-columns: 280px 1fr;
          gap: 40px;
        }
        .filters {
          background: white;
          padding: 25px;
          border-radius: 12px;
          border: 1px solid #eee;
          height: fit-content;
          position: sticky;
          top: 100px;
        }
        .filters h3 {
          margin-bottom: 20px;
        }
        .filter-group {
          margin-bottom: 20px;
        }
        .filter-group label {
          display: block;
          margin-bottom: 8px;
          font-weight: 600;
          font-size: 14px;
        }
        .filter-group select, .filter-group input {
          width: 100%;
          padding: 10px;
          border: 1px solid #ddd;
          border-radius: 6px;
        }
        .range-inputs {
          display: flex;
          gap: 10px;
        }
        .results-header {
          margin-bottom: 30px;
        }
        .results-header h1 {
          font-size: 28px;
          margin-bottom: 5px;
        }
        .results-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 25px;
        }
        .loading {
          text-align: center;
          padding: 50px;
          font-size: 18px;
          color: #666;
        }
        @media (max-width: 900px) {
          .search-layout {
            grid-template-columns: 1fr;
          }
          .filters {
            position: relative;
            top: 0;
          }
        }
      `}</style>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div>Loading search...</div>}>
      <SearchResults />
    </Suspense>
  );
}
