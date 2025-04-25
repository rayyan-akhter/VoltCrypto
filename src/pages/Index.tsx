
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store/store';
import CryptoTable from '../components/CryptoTable';
import CryptoCardList from '../components/CryptoCardList';
import cryptoWebSocketSimulator from '../services/cryptoWebSocketSimulator';
import Header from '../components/Header';
import { useIsMobile } from '../hooks/use-mobile';

const Index: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const isMobile = useIsMobile();
  
  // Connect to the WebSocket simulator on component mount
  useEffect(() => {
    cryptoWebSocketSimulator.connect(dispatch);
    
    // Disconnect when the component unmounts
    return () => {
      cryptoWebSocketSimulator.disconnect();
    };
  }, [dispatch]);

  return (
    <div className="min-h-screen p-4 md:p-6 lg:p-8">
      <div className="container mx-auto">
        <Header />
        
        {/* For desktop, we show the table */}
        <div className="hidden md:block">
          <CryptoTable />
        </div>
        
        {/* For mobile, we show cards */}
        <CryptoCardList />
      </div>
    </div>
  );
};

export default Index;
