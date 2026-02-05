'use client';

import Link from 'next/link';

export default function PropertyCard({ property }) {
    const primaryImage = property.images.find(img => img.isPrimary) || property.images[0];

    return (
        <div className="card">
            <Link href={`/property/${property.id}`}>
                <div className="image-container">
                    <img
                        src={primaryImage?.url || 'https://via.placeholder.com/400x300?text=No+Image'}
                        alt={property.title}
                        loading="lazy"
                    />
                    <span className="listing-type">{property.listingType}</span>
                </div>
                <div className="card-content">
                    <h3 className="price">
                        {property.listingType === 'SALE' ? '$' : '$'}{property.price.toLocaleString()}
                        {property.listingType === 'RENT' && <span className="period"> / mo</span>}
                    </h3>
                    <h4 className="title">{property.title}</h4>
                    <p className="location">{property.location}</p>
                    <div className="features">
                        <span>{property.bedrooms} Beds</span>
                        <span>{property.bathrooms} Baths</span>
                        <span>{property.floorArea} sqft</span>
                    </div>
                </div>
            </Link>

            <style jsx>{`
        .card {
          background: white;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          transition: transform 0.2s;
          border: 1px solid #eee;
        }
        .card:hover {
          transform: translateY(-5px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        }
        .image-container {
          position: relative;
          height: 200px;
        }
        .image-container img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .listing-type {
          position: absolute;
          top: 10px;
          left: 10px;
          background: rgba(0,0,0,0.7);
          color: white;
          padding: 4px 10px;
          border-radius: 4px;
          font-size: 12px;
          font-weight: 600;
          text-transform: uppercase;
        }
        .card-content {
          padding: 15px;
        }
        .price {
          color: #e31837;
          font-size: 20px;
          font-weight: 800;
          margin-bottom: 5px;
        }
        .period {
          font-size: 14px;
          font-weight: 400;
          color: #666;
        }
        .title {
          font-size: 16px;
          margin-bottom: 5px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .location {
          font-size: 14px;
          color: #666;
          margin-bottom: 10px;
        }
        .features {
          display: flex;
          gap: 15px;
          font-size: 13px;
          color: #444;
          border-top: 1px solid #f0f0f0;
          padding-top: 10px;
        }
      `}</style>
        </div>
    );
}
