
import Footer from './Footer';
import Header from './Header';
import AboutSection from './component/AboutSection';
import Gallery from './component/Gallery';
import HeroSection from './component/HeroSection';
import PresaleSection from './component/PresaleSection';
import RoadmapSection from './component/RoadmapSection';
import TokenomicsSection from './component/TokenomicsSection';
import {useMemo} from "react"
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { ConnectionProvider, WalletProvider, useWallet } from "@solana/wallet-adapter-react";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-wallets";
import { WalletModalProvider, WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import "@solana/wallet-adapter-react-ui/styles.css";
import  axios from "axios";


function App() {
  

 axios.defaults.baseURL =  process.env.NODE_ENV === "development"
    ? process.env.DEV_SEVER  // 👈 dev prefix
    : process.env.PRODUCT_SERVER; // 👈 prod prefix// ← change to your backend URL

    console.log(axios.defaults.baseURL);
  axios.defaults.headers.common["Content-Type"] = "application/json";


    
  const wallets = useMemo(() => [new PhantomWalletAdapter()], []);

  return (
    <WalletProvider wallets={wallets} autoConnect={true}>
      <WalletModalProvider>
      <div>
        <Header/>
        <HeroSection/>
        <AboutSection/>
        <PresaleSection/>
        <TokenomicsSection/>
        <RoadmapSection/>
        <Gallery/>
        <Footer/>
      </div>
      </WalletModalProvider>
    </WalletProvider>
  );
}

export default App;
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              