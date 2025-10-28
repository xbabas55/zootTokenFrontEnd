'use client';
import React, { useState, useEffect } from 'react';

const PresaleSection: React.FC = () => {
  const [solAmount, setSolAmount] = useState<number | string>('');
  const [zootAmount, setZootAmount] = useState<number | string>(0);
  const [walletConnected, setWalletConnected] = useState<boolean>(false);

  const exchangeRate = 1_000_000; // 1 SOL = 1,000,000 ZOOT

  // Update calculated ZOOT amount whenever SOL input changes
  useEffect(() => {
    if (solAmount && Number(solAmount) > 0) {
      setZootAmount(Number(solAmount) * exchangeRate);
    } else {
      setZootAmount(0);
    }
  }, [solAmount]);

  const handleBuy = () => {
    if (!walletConnected) {
      alert('Please connect your wallet first!');
      return;
    }
    alert(`Buying ${zootAmount} ZOOT for ${solAmount} SOL`);
  };

  const handleConnectWallet = () => {
    // TODO: Replace with real wallet connect logic
    setWalletConnected(true);
  };

  return (
    <section id="presale" className="presale py-16">
      <div className="container mx-auto px-4">
        <div className="section-header text-center mb-10">
          <h2 className="section-title text-3xl font-bold">ZOOT Presale</h2>
          <p className="section-subtitle text-gray-500">
            Get in early before we moon! 🚀
          </p>
        </div>

        <div className="presale-content grid md:grid-cols-2 gap-10">
          {/* Left: Presale Stages */}
          <div className="presale-info">
            <div className="presale-stages space-y-6">
              {/* Stage 1 */}
              <div className="stage active border border-gray-300 rounded-lg p-4 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="stage-number bg-blue-500 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold">
                    1
                  </div>
                  <div className="stage-info">
                    <h4 className="font-semibold">Stage 1</h4>
                    <p>1 SOL = 1,000,000 ZOOT</p>
                    <div className="stage-progress mt-2">
                      <div className="progress-bar bg-gray-200 rounded-full h-2">
                        <div
                          className="progress bg-blue-500 h-2 rounded-full"
                          style={{ width: '0%' }}
                        ></div>
                      </div>
                      <span id="stage1-progress" className="text-sm text-gray-500">
                        0% Complete
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stage 2 */}
              <div className="stage border border-gray-300 rounded-lg p-4">
                <div className="flex items-center gap-3">
                  <div className="stage-number bg-gray-400 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold">
                    2
                  </div>
                  <div className="stage-info">
                    <h4 className="font-semibold">Stage 2</h4>
                    <p>1 SOL = 800,000 ZOOT</p>
                    <div className="stage-progress mt-2">
                      <div className="progress-bar bg-gray-200 rounded-full h-2">
                        <div className="progress bg-gray-400 h-2 rounded-full w-0"></div>
                      </div>
                      <span className="text-sm text-gray-500">Coming Soon</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stage 3 */}
              <div className="stage border border-gray-300 rounded-lg p-4">
                <div className="flex items-center gap-3">
                  <div className="stage-number bg-gray-400 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold">
                    3
                  </div>
                  <div className="stage-info">
                    <h4 className="font-semibold">Stage 3</h4>
                    <p>1 SOL = 600,000 ZOOT</p>
                    <div className="stage-progress mt-2">
                      <div className="progress-bar bg-gray-200 rounded-full h-2">
                        <div className="progress bg-gray-400 h-2 rounded-full w-0"></div>
                      </div>
                      <span className="text-sm text-gray-500">Coming Soon</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Presale Widget */}
          <div className="presale-widget border border-gray-300 rounded-xl shadow-md p-6 bg-white">
            <div className="widget-header text-center mb-6">
              <h3 className="text-xl font-semibold">Buy ZOOT Tokens</h3>
              <div className="current-rate text-gray-600 mt-1">
                1 SOL = 1,000,000 ZOOT
              </div>
            </div>

            <div className="widget-body space-y-4">
              <div className="input-group">
                <label className="block text-sm font-medium">Amount (SOL)</label>
                <input
                  type="number"
                  value={solAmount}
                  onChange={(e) => setSolAmount(e.target.value)}
                  placeholder="0.0"
                  min="0.1"
                  step="0.1"
                  className="w-full border border-gray-300 rounded-md p-2"
                />
              </div>

              <div className="text-center text-gray-400 text-xl">⇅</div>

              <div className="input-group">
                <label className="block text-sm font-medium">You will receive (ZOOT)</label>
                <input
                  type="text"
                  value={zootAmount}
                  readOnly
                  className="w-full border border-gray-300 rounded-md p-2 bg-gray-100"
                />
              </div>

              <div className="wallet-status flex items-center gap-2 text-gray-600 border border-dashed border-gray-400 rounded-md p-3">
                <span>💰</span>
                <span>
                  {walletConnected
                    ? 'Wallet Connected'
                    : 'Connect your wallet to continue'}
                </span>
              </div>

              {!walletConnected ? (
                <button
                  className="btn btn-secondary w-full bg-gray-800 text-white py-2 rounded-md"
                  onClick={handleConnectWallet}
                >
                  Connect Wallet
                </button>
              ) : (
                <button
                  className="btn btn-primary w-full bg-blue-600 text-white py-2 rounded-md"
                  onClick={handleBuy}
                  disabled={!solAmount}
                >
                  Buy ZOOT Tokens
                </button>
              )}

              <div className="presale-info-small text-sm text-gray-500 mt-2">
                <p>ℹ️ Minimum purchase: 0.1 SOL</p>
                <p>🛡️ Smart contract audited</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PresaleSection;

