
import React from 'react';

interface MiniChartProps {
  data: number[];
  trend: 'up' | 'down';
  className?: string;
}

const MiniChart: React.FC<MiniChartProps> = ({ data, trend, className }) => {
  // Calculate the min and max values for scaling
  const minValue = Math.min(...data);
  const maxValue = Math.max(...data);
  const range = maxValue - minValue;
  
  // Chart height and width settings
  const width = 120;
  const height = 40;
  
  // Function to normalize data points to the chart height
  const normalizePoint = (value: number): number => {
    return height - ((value - minValue) / range * height);
  };
  
  // Create SVG path
  const points = data.map((value, index) => {
    const x = (index / (data.length - 1)) * width;
    const y = normalizePoint(value);
    return `${x},${y}`;
  }).join(' ');
  
  // Create path command
  const pathCommand = `M ${points}`;
  
  // Chart color based on trend
  const chartColor = trend === 'up' ? '#00b88a' : '#ea384c';

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className={className}>
      <path
        d={pathCommand}
        fill="none"
        stroke={chartColor}
        strokeWidth="1.5"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default MiniChart;
