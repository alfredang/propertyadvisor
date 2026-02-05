'use client';

import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { API_BASE_URL } from '@/config';

export default function PropertyDetail() {
    const { id } = useParams();
    const [property, setProperty] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeImage, setActiveImage] = useState(0);

    useEffect(() => {
        const fetchProperty = async () => {
            try {
                const res = await fetch(`${API_BASE_URL}/properties/${id}`);
                const data = await res.json();
                setProperty(data);
            } catch (err) {
                console.error('Fetch detail failed:', err);
            } finally {
                setLoading(false);
            }
        };
        if (id) fetchProperty();
    }, [id]);

    if (loading) return <div className="container loading">Loading...</div>;
    if (!property) return <div className="container loading">Property not found.</div>;

    return (
        <div className="detail-page">
            <div className="container">
                <div className="gallery">
                    <div className="main-image">
                        <img src={property.images[activeImage]?.url} alt={property.title} />
                    </div>
                    <div className="thumbnails">
                        {property.images.map((img, idx) => (
                            <div
                                key={img.id}
                                className={`thumb ${idx === activeImage ? 'active' : ''}`}
                                onClick={() => setActiveImage(idx)}
                            >
                                <img src={img.url} alt={`Thumb ${idx}`} />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="detail-grid">
                    <div className="main-info">
                        <div className="header">
                            <h1>{property.title}</h1>
                            <p className="address">{property.address}</p>
                            <div className="price-tag">
                                {property.listingType === 'SALE' ? '$' : '$'}{property.price.toLocaleString()}
                                {property.listingType === 'RENT' && <span> / month</span>}
                            </div>
                        </div>

                        <div className="features-bar">
                            <div className="feature">
                                <span className="label">Bedrooms</span>
                                <span className="value">{property.bedrooms}</span>
                            </div>
                            <div className="feature">
                                <span className="label">Bathrooms</span>
                                <span className="value">{property.bathrooms}</span>
                            </div>
                            <div className="feature">
                                <span className="label">Area</span>
                                <span className="value">{property.floorArea} sqft</span>
                            </div>
                            <div className="feature">
                                <span className="label">Type</span>
                                <span className="value">{property.propertyType}</span>
                            </div>
                        </div>

                        <div className="description">
                            <h2>Description</h2>
                            <p>{property.description}</p>
                        </div>

                        <div className="map-placeholder">
                            <h2>Location</h2>
                            <div className="map-box">
                                {/* Map integration would go here */}
                                <p>Interactive Map (Lat: {property.lat}, Lng: {property.lng})</p>
                            </div>
                        </div>
                    </div>

                    <aside className="sidebar">
                        <div className="agent-card">
                            <img src={property.agent.photoUrl} alt={property.agent.name} />
                            <h3>{property.agent.name}</h3>
                            <p>Certified Estate Agent</p>
                            <div className="agent-actions">
                                <button className="btn-primary">WhatsApp</button>
                                <button className="btn-outline">Call Agent</button>
                            </div>
                        </div>

                        <div className="inquiry-form">
                            <h3>Enquire About This Property</h3>
                            <input type="text" placeholder="Your Name" />
                            <input type="email" placeholder="Your Email" />
                            <textarea placeholder="I'm interested in this property..."></textarea>
                            <button className="btn-primary">Send Inquiry</button>
                        </div>
                    </aside>
                </div>
            </div>

            <style jsx>{`
        .detail-page { padding: 40px 0; }
        .gallery { margin-bottom: 40px; }
        .main-image { height: 500px; border-radius: 12px; overflow: hidden; margin-bottom: 15px; }
        .main-image img { width: 100%; height: 100%; object-fit: cover; }
        .thumbnails { display: flex; gap: 15px; overflow-x: auto; }
        .thumb { width: 120px; height: 80px; border-radius: 8px; overflow: hidden; cursor: pointer; border: 2px solid transparent; }
        .thumb.active { border-color: #e31837; }
        .thumb img { width: 100%; height: 100%; object-fit: cover; }
        
        .detail-grid { display: grid; grid-template-columns: 1fr 350px; gap: 40px; }
        .header { margin-bottom: 30px; }
        .header h1 { font-size: 32px; color: #2c3e50; }
        .address { font-size: 18px; color: #666; }
        .price-tag { font-size: 28px; font-weight: 800; color: #e31837; margin-top: 10px; }
        
        .features-bar { display: flex; gap: 40px; border-top: 1px solid #eee; border-bottom: 1px solid #eee; padding: 20px 0; margin-bottom: 30px; }
        .feature { display: flex; flex-direction: column; }
        .label { font-size: 14px; color: #777; text-transform: uppercase; letter-spacing: 1px; }
        .value { font-size: 18px; font-weight: 700; color: #333; }
        
        .description { margin-bottom: 40px; }
        .description h2 { margin-bottom: 15px; }
        
        .map-box { height: 300px; background: #f0f0f0; display: flex; align-items: center; justify-content: center; border-radius: 12px; }
        
        .agent-card { background: white; padding: 25px; border-radius: 12px; border: 1px solid #eee; text-align: center; margin-bottom: 30px; }
        .agent-card img { width: 100px; height: 100px; border-radius: 50%; object-fit: cover; margin-bottom: 15px; }
        .agent-actions { display: flex; flex-direction: column; gap: 10px; margin-top: 20px; }
        
        .inquiry-form { background: #f9f9f9; padding: 25px; border-radius: 12px; }
        .inquiry-form input, .inquiry-form textarea { width: 100%; padding: 12px; margin-bottom: 15px; border: 1px solid #ddd; border-radius: 8px; }
        .inquiry-form textarea { height: 100px; }
      `}</style>
        </div>
    );
}
