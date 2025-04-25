
import React from 'react';
import { useSelector } from 'react-redux';
import { selectAllAssets, selectLastUpdatedField } from '../store/cryptoSlice';
import CryptoTableHead from './CryptoTableHead';
import CryptoTableRow from './CryptoTableRow';

const CryptoTable: React.FC = () => {
  const assets = useSelector(selectAllAssets);
  const lastUpdatedField = useSelector(selectLastUpdatedField);

  return (
    <div className="w-full overflow-x-auto rounded-lg border border-border">
      <table className="w-full">
        <CryptoTableHead />
        <tbody>
          {assets.map((asset) => (
            <CryptoTableRow 
              key={asset.id} 
              asset={asset} 
              lastUpdatedField={lastUpdatedField} 
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CryptoTable;
