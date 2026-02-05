'use client';

import { useState, useEffect } from 'react';
import PropertyCard from '@/components/PropertyCard';
import { API_BASE_URL } from '@/config';

export default function ProjectsPage() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // For now, we'll fetch properties that are of type 'CONDO' or 'LANDED' as "projects"
        fetch(`${API_BASE_URL}/properties?propertyType=CONDO`)
            .then(res => res.json())
            .then(data => {
                setProjects(data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    return (
        <div className="container" style={{ padding: '60px 0' }}>
            <div style={{ marginBottom: '40px' }}>
                <h1 style={{ fontSize: '36px', fontWeight: '800', marginBottom: '10px' }}>New Projects & Residences</h1>
                <p style={{ color: '#666', fontSize: '18px' }}>Discover the latest residential developments in Singapore.</p>
            </div>

            {loading ? (
                <div style={{ textAlign: 'center', padding: '100px 0' }}>Loading projects...</div>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '30px' }}>
                    {projects.map(project => (
                        <PropertyCard key={project.id} property={project} />
                    ))}
                </div>
            )}
        </div>
    );
}
