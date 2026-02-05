'use client';

import { useState, useEffect } from 'react';
import { API_BASE_URL } from '@/config';

export default function AgentsPage() {
    const [agents, setAgents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // We'll need a backend route for agents later, but for now we'll show the ones from properties
        fetch(`${API_BASE_URL}/properties`)
            .then(res => res.json())
            .then(data => {
                const uniqueAgents = Array.from(new Set(data.map(p => p.agent.id)))
                    .map(id => data.find(p => p.agent.id === id).agent);
                setAgents(uniqueAgents);
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
                <h1 style={{ fontSize: '36px', fontWeight: '800', marginBottom: '10px' }}>Find Your Trusted Agent</h1>
                <p style={{ color: '#666', fontSize: '18px' }}>Get in touch with certified real estate professionals in Singapore.</p>
            </div>

            {loading ? (
                <div style={{ textAlign: 'center', padding: '100px 0' }}>Loading agents...</div>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '30px' }}>
                    {agents.map(agent => (
                        <div key={agent.id} style={{ background: 'white', padding: '30px', borderRadius: '12px', border: '1px solid #eee', textAlign: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
                            <img src={agent.photoUrl} alt={agent.name} style={{ width: '120px', height: '120px', borderRadius: '50%', objectFit: 'cover', marginBottom: '20px' }} />
                            <h3 style={{ fontSize: '20px', marginBottom: '5px' }}>{agent.name}</h3>
                            <p style={{ color: '#666', fontSize: '14px', marginBottom: '20px' }}>Certified Estate Agent</p>
                            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                                <button className="btn-primary" style={{ padding: '8px 20px', fontSize: '14px' }}>Contact</button>
                                <button className="btn-outline" style={{ padding: '8px 20px', fontSize: '14px' }}>View Listings</button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
