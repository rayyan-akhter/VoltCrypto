
import React from 'react';
import { ArrowDown, ArrowUp } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="mb-8">
      <div className="flex flex-col md:flex-row justify-between md:items-center">
        <div>
          <h1 className="text-3xl font-bold">Crypto Market Beacon</h1>
          <p className="text-muted-foreground mt-1">
            Real-time cryptocurrency market data
          </p>
        </div>
        <div className="flex items-center mt-4 md:mt-0">
          <div className="bg-secondary rounded-lg py-2 px-4 flex items-center text-sm">
            <span className="mr-2 text-muted-foreground">Market:</span>
            <span className="flex items-center text-positive">
              <ArrowUp className="w-4 h-4 mr-1" />
              <span>Bullish</span>
            </span>
          </div>
          <div className="ml-4 bg-secondary rounded-lg py-2 px-4 text-sm">
            <span className="mr-2 text-muted-foreground">Updates:</span>
            <span>Live</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
