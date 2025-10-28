import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <div className="footer-logo">
              <img
                src="icon/photo_2025-08-05_00-55-40.jpg"
                alt="ZOOT Logo"
              />
              <span>ZOOT</span>
            </div>
            <p>The revolutionary meme coin on Solana that's changing the game.</p>
            <div className="social-links">
              <a
                href="https://x.com/Zoot_coin"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-twitter"></i>
              </a>
              <a
                href="https://t.me/zoot_com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-telegram"></i>
              </a>
              <a href="#">
                <i className="fab fa-discord"></i>
              </a>
              <a href="#">
                <i className="fab fa-medium"></i>
              </a>
            </div>
          </div>

          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="#home">Home</a></li>
              <li><a href="#about">About</a></li>
              <li><a href="#presale">Presale</a></li>
              <li><a href="#tokenomics">Tokenomics</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Resources</h4>
            <ul>
              <li><a href="#">Whitepaper</a></li>
              <li><a href="#">Smart Contract</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2025 ZOOT. All rights reserved. Built on Solana.</p>
          <div className="footer-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;