
import React from 'react';

const CryptoTableHead: React.FC = () => {
  return (
    <thead className="bg-table-header text-sm text-muted-foreground">
      <tr>
        <th className="p-3 text-left whitespace-nowrap font-medium">#</th>
        <th className="p-3 text-left whitespace-nowrap font-medium">Name</th>
        <th className="p-3 text-right whitespace-nowrap font-medium">Price</th>
        <th className="p-3 text-right whitespace-nowrap font-medium">1h %</th>
        <th className="p-3 text-right whitespace-nowrap font-medium">24h %</th>
        <th className="p-3 text-right whitespace-nowrap font-medium">7d %</th>
        <th className="p-3 text-right whitespace-nowrap font-medium">Market Cap</th>
        <th className="p-3 text-right whitespace-nowrap font-medium">24h Volume</th>
        <th className="p-3 text-right whitespace-nowrap font-medium">Circulating Supply</th>
        <th className="p-3 text-right whitespace-nowrap font-medium">Max Supply</th>
        <th className="p-3 text-center whitespace-nowrap font-medium">7D Chart</th>
      </tr>
    </thead>
  );
};

export default CryptoTableHead;
