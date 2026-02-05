'use client';

export default function Footer() {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-grid">
                    <div className="footer-col">
                        <h3>PropertyAdvisor</h3>
                        <p>Your one-stop destination for Singapore residential properties.</p>
                    </div>
                    <div className="footer-col">
                        <h4>Quick Links</h4>
                        <ul>
                            <li><a href="#">About Us</a></li>
                            <li><a href="#">Contact</a></li>
                            <li><a href="#">Careers</a></li>
                        </ul>
                    </div>
                    <div className="footer-col">
                        <h4>Social</h4>
                        <div className="social-links">
                            {/* Social icons would go here */}
                        </div>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>&copy; 2026 PropertyAdvisor Singapore. All rights reserved.</p>
                </div>
            </div>
            <style jsx>{`
        .footer {
          background: #2c3e50;
          color: white;
          padding: 60px 0 20px;
          margin-top: 50px;
        }
        .footer-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 40px;
        }
        .footer-col h3, .footer-col h4 {
          margin-bottom: 20px;
        }
        .footer-col ul li {
          margin-bottom: 10px;
        }
        .footer-col ul li a:hover {
          text-decoration: underline;
        }
        .footer-bottom {
          margin-top: 40px;
          padding-top: 20px;
          border-top: 1px solid #3e5871;
          text-align: center;
          font-size: 14px;
        }
      `}</style>
        </footer>
    );
}
