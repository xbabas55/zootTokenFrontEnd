import React from "react";

const HeroSection: React.FC = () => {
  // Smooth scroll function
  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="home" className="hero">
      {/* Video Background */}
      <div className="video-background">
        <video
          autoPlay={true}
          muted
          loop
          preload="metadata"
          playsInline
          poster="ZOOT AF EXMP/Gy0_WvlaoAARfEY.jpg"
        >
          <source src="ZOOT AF EXMP/bg_1.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="video-overlay"></div>
      </div>

      {/* Main Hero Content */}
      <div className="hero-content">
        <div className="hero-text">
          <h1 className="hero-title">
            Welcome to <span className="gradient-text">ZOOT</span>
          </h1>
          <p className="hero-subtitle">
            The revolutionary meme coin on Solana that's changing the game.
            <br />
            Join the presale and be part of the future!
          </p>

          <div className="hero-buttons">
            <button
              className="btn btn-primary"
              onClick={() => scrollToSection("presale")}
            >
              Join Presale
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => scrollToSection("about")}
            >
              Learn More
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="hero-stats">
          <div className="stat-card">
            <div className="stat-number" id="raisedAmount">
              $0
            </div>
            <div className="stat-label">Raised</div>
          </div>
          <div className="stat-card">
            <div className="stat-number" id="contributors">
              0
            </div>
            <div className="stat-label">Contributors</div>
          </div>
          <div className="stat-card">
            <div className="stat-number" id="timeLeft">
              --:--:--
            </div>
            <div className="stat-label">Time Left</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
