'use client';

import { useState, useEffect } from 'react';
import { API_BASE_URL } from '@/config';

export default function AdminPage() {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`${API_BASE_URL}/admin/properties`)
            .then(res => res.json())
            .then(data => {
                setProperties(data);
                setLoading(false);
            });
    }, []);

    const handleDelete = async (id) => {
        if (confirm('Are you sure?')) {
            await fetch(`${API_BASE_URL}/admin/properties/${id}`, { method: 'DELETE' });
            setProperties(properties.filter(p => p.id !== id));
        }
    };

    return (
        <div className="container" style={{ padding: '40px 0' }}>
            <header style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px' }}>
                <h1>Admin Dashboard - Property Management</h1>
                <button className="btn-primary">+ Add New Listing</button>
            </header>

            <table style={{ width: '100%', borderCollapse: 'collapse', background: 'white', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                <thead style={{ background: '#f8f9fa' }}>
                    <tr>
                        <th style={{ padding: '15px', textAlign: 'left' }}>Title</th>
                        <th style={{ padding: '15px', textAlign: 'left' }}>Type</th>
                        <th style={{ padding: '15px', textAlign: 'left' }}>Price</th>
                        <th style={{ padding: '15px', textAlign: 'left' }}>Location</th>
                        <th style={{ padding: '15px', textAlign: 'left' }}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {properties.map(p => (
                        <tr key={p.id} style={{ borderBottom: '1px solid #eee' }}>
                            <td style={{ padding: '15px' }}>{p.title}</td>
                            <td style={{ padding: '15px' }}>{p.propertyType}</td>
                            <td style={{ padding: '15px' }}>${p.price.toLocaleString()}</td>
                            <td style={{ padding: '15px' }}>{p.location}</td>
                            <td style={{ padding: '15px' }}>
                                <button style={{ marginRight: '10px', color: '#007bff', background: 'none' }}>Edit</button>
                                <button onClick={() => handleDelete(p.id)} style={{ color: '#e31837', background: 'none' }}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
