'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="navbar">
            <div className="container nav-content">
                <Link href="/" className="logo">
                    PropertyAdvisor
                </Link>

                <nav className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
                    <Link href="/search?listingType=SALE">Buy</Link>
                    <Link href="/search?listingType=RENT">Rent</Link>
                    <Link href="/projects">New Projects</Link>
                    <Link href="/agents">Find Agent</Link>
                </nav>

                <div className="nav-actions">
                    <Link href="/login" className="btn-outline">Login</Link>
                </div>
            </div>

            <style jsx>{`
        .navbar {
          background: white;
          border-bottom: 1px solid #eee;
          padding: 15px 0;
          position: sticky;
          top: 0;
          z-index: 1000;
        }
        .nav-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .logo {
          font-size: 24px;
          font-weight: 800;
          color: #e31837;
        }
        .nav-links {
          display: flex;
          gap: 30px;
        }
        .nav-links a {
          font-weight: 500;
          color: #333;
        }
        .nav-links a:hover {
          color: #e31837;
        }
        .nav-actions {
          display: flex;
          gap: 15px;
        }
      `}</style>
        </header>
    );
}
