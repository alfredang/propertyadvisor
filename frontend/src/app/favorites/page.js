'use client';

import { useState, useEffect } from 'react';
import PropertyCard from '@/components/PropertyCard';
import { API_BASE_URL } from '@/config';

export default function FavoritesPage() {
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            setLoading(false);
            return;
        }

        fetch(`${API_BASE_URL}/favorites`, {
            headers: { 'Authorization': `Bearer ${token}` }
        })
            .then(res => res.json())
            .then(data => {
                setFavorites(data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    if (loading) return <div className="container">Loading favorites...</div>;

    return (
        <div className="container" style={{ padding: '40px 0' }}>
            <h1 style={{ marginBottom: '30px' }}>Your Shortlist</h1>
            {favorites.length === 0 ? (
                <p>You haven't added any properties to your shortlist yet.</p>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '25px' }}>
                    {favorites.map(property => (
                        <PropertyCard key={property.id} property={property} />
                    ))}
                </div>
            )}
        </div>
    );
}
