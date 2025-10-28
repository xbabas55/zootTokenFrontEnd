import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const Tokenomics: React.FC = () => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    const ctx = chartRef.current.getContext("2d");
    if (!ctx) return;

    // Create chart
    const chart = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: [
          "Presale (40%)",
          "Liquidity (25%)",
          "Marketing (15%)",
          "Team (10%)",
          "Rewards (5%)",
          "Charity (5%)",
        ],
        datasets: [
          {
            data: [40, 25, 15, 10, 5, 5],
            backgroundColor: [
              "#ff6b6b",
              "#4ecdc4",
              "#45b7d1",
              "#f9ca24",
              "#a55eea",
              "#2ecc71",
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: "bottom" as const,
            labels: {
              color: "#fff",
              font: {
                size: 14,
                weight: 500 as const, // ✅ fixed type-safe value
              },
            },
          },
        },
      },
    });

    return () => chart.destroy();
  }, []);

  return (
    <section id="tokenomics" className="tokenomics">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Tokenomics</h2>
          <p className="section-subtitle">Transparent and fair distribution</p>
        </div>

        <div className="tokenomics-content">
          <div className="tokenomics-chart">
            <canvas ref={chartRef} id="tokenomicsChart"></canvas>
          </div>

          <div className="tokenomics-details">
            <div className="detail-card">
              <div className="detail-color" style={{ background: "#ff6b6b" }}></div>
              <div className="detail-info">
                <h4>Presale (40%)</h4>
                <p>400,000,000 ZOOT</p>
              </div>
            </div>

            <div className="detail-card">
              <div className="detail-color" style={{ background: "#4ecdc4" }}></div>
              <div className="detail-info">
                <h4>Liquidity (25%)</h4>
                <p>250,000,000 ZOOT</p>
              </div>
            </div>

            <div className="detail-card">
              <div className="detail-color" style={{ background: "#45b7d1" }}></div>
              <div className="detail-info">
                <h4>Marketing (15%)</h4>
                <p>150,000,000 ZOOT</p>
              </div>
            </div>

            <div className="detail-card">
              <div className="detail-color" style={{ background: "#f9ca24" }}></div>
              <div className="detail-info">
                <h4>Team (10%)</h4>
                <p>100,000,000 ZOOT</p>
              </div>
            </div>

            <div className="detail-card">
              <div className="detail-color" style={{ background: "#a55eea" }}></div>
              <div className="detail-info">
                <h4>Rewards (5%)</h4>
                <p>50,000,000 ZOOT</p>
              </div>
            </div>

            <div className="detail-card">
              <div className="detail-color" style={{ background: "#2ecc71" }}></div>
              <div className="detail-info">
                <h4>Charity (5%)</h4>
                <p>50,000,000 ZOOT</p>
              </div>
            </div>
          </div>
        </div>

        <div className="token-details">
          <div className="token-info">
            <h3>Token Information</h3>
            <div className="info-grid">
              <div className="info-item">
                <span>Token Name:</span>
                <span>ZOOT</span>
              </div>
              <div className="info-item">
                <span>Total Supply:</span>
                <span>1,000,000,000 ZOOT</span>
              </div>
              <div className="info-item">
                <span>Blockchain:</span>
                <span>Solana</span>
              </div>
              <div className="info-item">
                <span>Token Type:</span>
                <span>SPL Token</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Tokenomics;
