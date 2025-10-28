import React, { useEffect } from "react";

const Navbar: React.FC = () => {
  useEffect(() => {
    const hamburger = document.getElementById("hamburger");
    const navMenu = document.querySelector(".nav-menu");
    const dropdownToggle = document.querySelector(".dropdown-toggle");
    const dropdownMenu = document.querySelector(".dropdown-menu");

    // Mobile menu toggle
    hamburger?.addEventListener("click", () => {
      navMenu?.classList.toggle("active");
      hamburger.classList.toggle("active");
    });

    // Dropdown toggle
    dropdownToggle?.addEventListener("click", (e) => {
      e.preventDefault();
      dropdownMenu?.classList.toggle("show");
    });

    return () => {
      hamburger?.removeEventListener("click", () => {});
      dropdownToggle?.removeEventListener("click", () => {});
    };
  }, []);

  return (
    <nav className="navbar">
      <div className="nav-container">
        {/* Logo */}
        <div className="nav-logo">
          <img
            src="icon/photo_2025-08-05_00-55-40.jpg"
            alt="ZOOT Logo"
            className="logo"
          />
          <span className="logo-text">ZOOT</span>
        </div>

        {/* Menu Links */}
        <div className="nav-menu">
          <a href="#home" className="nav-link">
            Home
          </a>
          <a href="#about" className="nav-link">
            About
          </a>
          <a href="#presale" className="nav-link">
            Presale
          </a>
          <a href="#tokenomics" className="nav-link">
            Tokenomics
          </a>
          <a href="#roadmap" className="nav-link">
            Roadmap
          </a>
          <a href="#gallery" className="nav-link">
            Gallery
          </a>

          {/* Dropdown Section */}
          <div className="nav-dropdown">
            <a href="#" className="nav-link dropdown-toggle">
              +More
            </a>
            <div className="dropdown-menu">
              <a href="#games" className="dropdown-item">
                <i className="fas fa-gamepad"></i>
                Games
              </a>

              <div className="dropdown-item disabled coming-soon">
                <i className="fas fa-palette"></i>
                <span>NFTs</span>
                <div className="lock-indicator">
                  <i className="fas fa-lock"></i>
                  <span className="coming-soon-text">Coming Soon</span>
                </div>
              </div>

              <div className="dropdown-item disabled coming-soon">
                <i className="fas fa-shopping-bag"></i>
                <span>Merch</span>
                <div className="lock-indicator">
                  <i className="fas fa-lock"></i>
                  <span className="coming-soon-text">Coming Soon</span>
                </div>
              </div>

              <a
                href="whitepaper.html"
                className="dropdown-item"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fas fa-file-alt"></i>
                Whitepaper
              </a>
            </div>
          </div>
        </div>

        {/* Wallet Button */}
        <button className="wallet-btn" id="connectWallet">
          <i className="fas fa-wallet"></i>
          Connect Wallet
        </button>

        {/* Hamburger (mobile) */}
        <div className="hamburger" id="hamburger">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
