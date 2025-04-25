
import React, { useEffect, useState } from 'react';
import { CryptoAsset } from '../store/cryptoSlice';
import { formatCurrency, formatLargeNumber, formatPercentage, getPercentageColorClass } from '../utils/formatters';
import MiniChart from './MiniChart';

interface CryptoTableRowProps {
  asset: CryptoAsset;
  lastUpdatedField: string | null;
}

const CryptoTableRow: React.FC<CryptoTableRowProps> = ({ asset, lastUpdatedField }) => {
  const [highlightPrice, setHighlightPrice] = useState(false);
  const [highlightVolume, setHighlightVolume] = useState(false);
  const [highlightPriceChange, setHighlightPriceChange] = useState(false);
  
  // Determine the 7-day trend
  const sevenDayTrend = asset.priceChange.sevenDays >= 0 ? 'up' : 'down';
  
  // Effect to flash price updates
  useEffect(() => {
    if (lastUpdatedField === 'price') {
      setHighlightPrice(true);
      const timer = setTimeout(() => {
        setHighlightPrice(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [asset.price, lastUpdatedField]);
  
  // Effect to flash volume updates
  useEffect(() => {
    if (lastUpdatedField === 'volume') {
      setHighlightVolume(true);
      const timer = setTimeout(() => {
        setHighlightVolume(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [asset.volume24h, lastUpdatedField]);
  
  // Effect to flash percentage changes
  useEffect(() => {
    if (lastUpdatedField === 'priceChange') {
      setHighlightPriceChange(true);
      const timer = setTimeout(() => {
        setHighlightPriceChange(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [asset.priceChange, lastUpdatedField]);

  return (
    <tr className="border-b border-border hover:bg-secondary/50 transition-colors">
      <td className="p-3 text-left">{asset.rank}</td>
      <td className="p-3 text-left">
        <div className="flex items-center">
          <img src={asset.logo} alt={asset.name} className="w-6 h-6 mr-2" />
          <span>{asset.name}</span>
          <span className="ml-2 text-muted-foreground text-xs">{asset.symbol}</span>
        </div>
      </td>
      <td className={`p-3 text-right ${highlightPrice ? 'animate-pulse-price' : ''}`}>
        {formatCurrency(asset.price)}
      </td>
      <td className={`p-3 text-right ${highlightPriceChange ? 'animate-pulse-price' : ''} ${getPercentageColorClass(asset.priceChange.oneHour)}`}>
        {formatPercentage(asset.priceChange.oneHour)}
      </td>
      <td className={`p-3 text-right ${highlightPriceChange ? 'animate-pulse-price' : ''} ${getPercentageColorClass(asset.priceChange.oneDay)}`}>
        {formatPercentage(asset.priceChange.oneDay)}
      </td>
      <td className={`p-3 text-right ${highlightPriceChange ? 'animate-pulse-price' : ''} ${getPercentageColorClass(asset.priceChange.sevenDays)}`}>
        {formatPercentage(asset.priceChange.sevenDays)}
      </td>
      <td className="p-3 text-right">
        {formatCurrency(asset.marketCap)} <span className="text-xs text-muted-foreground">{formatLargeNumber(asset.marketCap)}</span>
      </td>
      <td className={`p-3 text-right ${highlightVolume ? 'animate-pulse-price' : ''}`}>
        {formatCurrency(asset.volume24h)} <span className="text-xs text-muted-foreground">{formatLargeNumber(asset.volume24h)}</span>
      </td>
      <td className="p-3 text-right">
        {formatLargeNumber(asset.circulatingSupply)} <span className="text-xs text-muted-foreground">{asset.symbol}</span>
      </td>
      <td className="p-3 text-right">
        {asset.maxSupply ? formatLargeNumber(asset.maxSupply) : '∞'} <span className="text-xs text-muted-foreground">{asset.symbol}</span>
      </td>
      <td className="p-3 flex justify-center">
        <MiniChart data={asset.chartData} trend={sevenDayTrend} />
      </td>
    </tr>
  );
};

export default CryptoTableRow;
