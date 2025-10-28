import React from "react";

const RoadmapSection: React.FC = () => {
  return (
    <section id="roadmap" className="roadmap">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <h2 className="section-title">Roadmap</h2>
          <p className="section-subtitle">Our journey to the moon</p>
        </div>

        {/* Timeline */}
        <div className="roadmap-timeline">
          {/* Q1 2025 */}
          <div className="timeline-item completed">
            <div className="timeline-marker"></div>
            <div className="timeline-content">
              <h4>Q1 2025 - Foundation</h4>
              <ul>
                <li>✅ Concept development &amp; whitepaper</li>
                <li>✅ Team formation &amp; advisory board</li>
                <li>✅ Brand identity &amp; visual assets</li>
                <li>✅ Website launch &amp; community setup</li>
                <li>✅ Social media presence establishment</li>
              </ul>
            </div>
          </div>

          {/* Q2 2025 */}
          <div className="timeline-item active">
            <div className="timeline-marker"></div>
            <div className="timeline-content">
              <h4>Q2 2025 - Token Launch</h4>
              <ul>
                <li>🔄 Smart contract development &amp; audit</li>
                <li>🔄 Presale launch &amp; early adoption</li>
                <li>🔄 Community building &amp; engagement</li>
                <li>🔄 DEX listing &amp; liquidity provision</li>
                <li>⏳ Initial marketing campaigns</li>
              </ul>
            </div>
          </div>

          {/* Q3 2025 */}
          <div className="timeline-item">
            <div className="timeline-marker"></div>
            <div className="timeline-content">
              <h4>Q3 2025 - Utility Development</h4>
              <ul>
                <li>🔜 NFT marketplace development</li>
                <li>🔜 First NFT collection launch</li>
                <li>🔜 Merchandise store beta</li>
                <li>🔜 Staking platform launch</li>
                <li>🔜 Gaming ecosystem planning</li>
              </ul>
            </div>
          </div>

          {/* Q4 2025 */}
          <div className="timeline-item">
            <div className="timeline-marker"></div>
            <div className="timeline-content">
              <h4>Q4 2025 - Gaming &amp; Betting</h4>
              <ul>
                <li>🔜 First ZOOT-powered game launch</li>
                <li>🔜 Betting platform development</li>
                <li>🔜 Play-to-earn mechanics implementation</li>
                <li>🔜 CEX listings &amp; partnerships</li>
                <li>🔜 Mobile app beta testing</li>
              </ul>
            </div>
          </div>

          {/* Q1 2026 */}
          <div className="timeline-item">
            <div className="timeline-marker"></div>
            <div className="timeline-content">
              <h4>Q1 2026 - Ecosystem Expansion</h4>
              <ul>
                <li>🔜 Full betting platform launch</li>
                <li>🔜 Advanced gaming features</li>
                <li>🔜 DAO governance implementation</li>
                <li>🔜 Cross-platform integrations</li>
                <li>🔜 Token burn mechanisms activation</li>
              </ul>
            </div>
          </div>

          {/* Q2 2026 */}
          <div className="timeline-item">
            <div className="timeline-marker"></div>
            <div className="timeline-content">
              <h4>Q2 2026 - Advanced Features</h4>
              <ul>
                <li>🔜 Multi-chain expansion</li>
                <li>🔜 Metaverse &amp; VR integration</li>
                <li>🔜 AI-powered trading tools</li>
                <li>🔜 Enterprise partnerships</li>
                <li>🔜 Advanced DeFi protocols</li>
              </ul>
            </div>
          </div>

          {/* Q3 2026 */}
          <div className="timeline-item">
            <div className="timeline-marker"></div>
            <div className="timeline-content">
              <h4>Q3 2026 - Global Dominance</h4>
              <ul>
                <li>🔜 Major exchange listings worldwide</li>
                <li>🔜 International market expansion</li>
                <li>🔜 Institutional partnerships</li>
                <li>🔜 Complete ecosystem maturity</li>
                <li>🔜 Industry leadership position</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RoadmapSection;
