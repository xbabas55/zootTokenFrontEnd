'use client';
import React, { useState, useEffect } from 'react';
import axios from "axios"
import { BuyToken } from '../web3/web3';
import { useWallet, WalletContextState } from '@solana/wallet-adapter-react';
import { BN } from '@coral-xyz/anchor';
import { LAMPORTS_PER_SOL } from "@solana/web3.js";


const PresaleSection: React.FC = () => {
  const [solAmount, setSolAmount] = useState<number | string>('');
  const [zootAmount, setZootAmount] = useState<number | string>(0);
  const [wallStatus, setStatusText] = useState<boolean>(false)
  const exchangeRate = 1_000_000_000; // 1 SOL = 1,000,000 ZOOT
  const wallet: WalletContextState = useWallet();
  // Update calculated ZOOT amount whenever SOL input changes
  // useEffect(() => {
  //   if (solAmount && Number(solAmount) > 0) {
  //     setZootAmount(Number(solAmount) * exchangeRate);
  //   } else {
  //     setZootAmount(0);
  //   }


  //   // 🪙 Update UI when wallet connection changes
  //   if (wallet.connecting) {
  //     setStatusText(false);
  //   } else if (wallet.connected) {
  //     setStatusText(true);
  //   } else {
  //     setStatusText(false);
  //   }

  // }, [solAmount , wallet.connected, wallet.connecting]);

  const handleBuy = () => {

    if (!wallet.connected) {
      alert('Please connect your wallet first!');
      return;
    }



    const sol = Number(solAmount) * LAMPORTS_PER_SOL;
    BuyToken(wallet, new BN(sol));
  };

  const buy = async () => {

  }



  // const handleConnectWallet = () => {
  //   // TODO: Replace with real wallet connect logic
  //  wallet.connect();
  // };

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
          {/* <div className="presale-widget border border-gray-300 rounded-xl shadow-md p-6 bg-white">
            <div className="widget-header text-center mb-6">
              <h3 className="text-xl font-semibold">Buy ZOOT Tokens</h3>
              <div className="current-rate text-gray-600 mt-1">
                1 SOL = 1,000,000 ZOOT
              </div>
              <h1 className="text-xl font-semibold">Presale Wallet Address </h1>
              <h3 className="text-xl font-semibold">8TpCLxSiv77XqvLtNf6GiWb9KcszYxCBshx2395L5TK9 </h3>
              <p> To buy token. Send sol to presale wallet address. Token will be send you when presale end.</p>

            </div>


          </div> */}
          {PresaleWallet()}
        </div>
      </div>
    </section>
  );
};

export default PresaleSection;

export  function PresaleWallet() {
  const [sol, setSol] = useState<number>(0);
  const [tokens, setTokens] = useState<number>(0);
  const [showPhantomHint, setShowPhantomHint] = useState(false);

  const RATE = 1000; // 1 SOL = 1000 tokens

  useEffect(() => {
    setTokens(sol * RATE);
  }, [sol]);

  const copyAddress = async () => {
    const addr = '8TpCLxSiv77XqvLtNf6GiWb9KcszYxCBshx2395L5TK9';
    try {
      await navigator.clipboard.writeText(addr);
      setShowPhantomHint(true);
      setTimeout(() => setShowPhantomHint(false), 6000);
    } catch (err) {
      console.error('copy failed', err);
    }
  };

  return (
      <div className="max-w-xl w-full bg-gray-900 rounded-2xl shadow-lg p-8 space-y-6">
        <h1 className="text-3xl font-bold text-gray-100 text-center">Presale Wallet Address</h1>

        <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
          <p className="text-sm text-gray-300 mb-2">Send SOL to this wallet:</p>
          <p className="text-lg font-mono font-semibold break-all text-gray-200">
            8TpCLxSiv77XqvLtNf6GiWb9KcszYxCBshx2395L5TK9
          </p>
        </div>

        <p className="text-gray-300 text-center">
          To buy tokens, send SOL to the presale wallet address. Tokens will be
          automatically sent to you when the presale ends.
        </p>


        {/* Wallet section below input */}
        <div className="space-y-6">
          <div className="flex flex-col">
            <label className="text-sm mb-1 text-gray-300">Input SOL</label>
            <input
              id="solInput"
              type="number"
              value={sol}
              placeholder="0.0"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSol(Number(e.currentTarget.value || 0))}
              className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm mb-1 text-gray-300">Token Amount</label>
            <input
              id="tokenOutput"
              type="number"
              value={tokens}
              readOnly
              className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 text-gray-300"
            />
          </div>

          <div className="flex justify-center">
            <button
              className="px-6 py-3 bg-blue-600 text-white rounded-xl shadow-md hover:bg-blue-700 transition-all"
              onClick={copyAddress}
            >
              Copy Wallet Address
            </button>
          </div>

          {showPhantomHint && (
            <div id="phantomHint" className="mt-4 flex flex-col items-center animate-bounce">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
              <p className="text-sm text-purple-300 mt-2">Open Phantom</p>
            </div>
          )}
        </div>
      </div>
  );
}
