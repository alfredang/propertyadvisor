'use client';

import { useState } from 'react';

export default function LoginPage() {
    return (
        <div className="container" style={{ padding: '100px 0', display: 'flex', justifyContent: 'center' }}>
            <div style={{ width: '100%', maxWidth: '400px', background: 'white', padding: '40px', borderRadius: '12px', border: '1px solid #eee', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
                <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>Welcome Back</h1>

                <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Email Address</label>
                    <input type="email" placeholder="agent@propertyguru.com" style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }} />
                </div>

                <div style={{ marginBottom: '30px' }}>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Password</label>
                    <input type="password" placeholder="••••••••" style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }} />
                </div>

                <button className="btn-primary" style={{ width: '100%', padding: '14px', fontSize: '16px', fontWeight: '700' }}>
                    Sign In
                </button>

                <p style={{ textAlign: 'center', marginTop: '25px', color: '#666' }}>
                    Don't have an account? <a href="#" style={{ color: '#e31837', fontWeight: '600' }}>Register here</a>
                </p>
            </div>
        </div>
    );
}
