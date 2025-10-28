"use client";

import React from "react";
import { FaBolt, FaUsers, FaRocket } from "react-icons/fa";

interface AboutSectionProps {
  id?: string;
}

const AboutSection: React.FC<AboutSectionProps> = ({ id = "about" }) => {
  return (
    <section id={id} className="about py-12 bg-gray-900 text-white">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="section-header text-center mb-10">
          <h2 className="section-title text-4xl font-bold mb-2">About ZOOT</h2>
          <p className="section-subtitle text-lg text-gray-400">
            The meme coin that's serious about fun
          </p>
        </div>

        {/* About Content */}
        <div className="about-content grid md:grid-cols-2 gap-10 items-center">
          {/* Text Section */}
          <div className="about-text space-y-6">
            <h3 className="text-2xl font-semibold">What is ZOOT?</h3>
            <p className="text-gray-300 leading-relaxed">
              ZOOT is not just another meme coin. Built on the lightning-fast Solana blockchain,
              ZOOT combines the viral nature of meme culture with real utility and community
              governance.
            </p>

            {/* Features */}
            <div className="features space-y-6">
              <div className="feature flex items-start gap-4">
                {/* <FaBolt className="text-yellow-400 text-3xl mt-1" /> */}
                <div>
                  <h4 className="text-xl font-medium">Lightning Fast</h4>
                  <p className="text-gray-400">
                    Built on Solana for instant transactions and low fees.
                  </p>
                </div>
              </div>

              <div className="feature flex items-start gap-4">
                {/* <FaUsers className="text-blue-400 text-3xl mt-1" /> */}
                <div>
                  <h4 className="text-xl font-medium">Community Driven</h4>
                  <p className="text-gray-400">
                    100% community-owned with decentralized governance.
                  </p>
                </div>
              </div>

              <div className="feature flex items-start gap-4">
                {/* <FaRocket className="text-green-400 text-3xl mt-1" /> */}
                <div>
                  <h4 className="text-xl font-medium">Deflationary</h4>
                  <p className="text-gray-400">
                    Built-in burn mechanism to increase value over time.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Image Section */}
          <div className="about-image flex justify-center">
            <img
              src="/ZOOT AF EXMP/ZOOTO1.png"
              alt="ZOOT Character"
              className="zoot-character w-80 h-auto rounded-2xl shadow-lg"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;