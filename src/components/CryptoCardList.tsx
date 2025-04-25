
import React from 'react';
import { useSelector } from 'react-redux';
import { selectAllAssets, selectLastUpdatedField } from '../store/cryptoSlice';
import CryptoCard from './CryptoCard';

const CryptoCardList: React.FC = () => {
  const assets = useSelector(selectAllAssets);
  const lastUpdatedField = useSelector(selectLastUpdatedField);

  return (
    <div className="md:hidden">
      {assets.map((asset) => (
        <CryptoCard 
          key={asset.id} 
          asset={asset} 
          lastUpdatedField={lastUpdatedField} 
        />
      ))}
    </div>
  );
};

export default CryptoCardList;
