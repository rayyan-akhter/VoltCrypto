
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectAssetById } from '../store/cryptoSlice';
import { RootState } from '../store/store';
import { ChartContainer } from "@/components/ui/chart";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import { formatCurrency, formatPercentage, getPercentageColorClass } from '../utils/formatters';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const CoinDetail = () => {
  const { id } = useParams();
  const asset = useSelector((state: RootState) => selectAssetById(state, id!));

  if (!asset) {
    return <div className="p-4">Coin not found</div>;
  }

  // Generate sample historical data from chart data
  const historicalData = asset.chartData.map((value, index) => ({
    timestamp: new Date(Date.now() - (asset.chartData.length - index) * 24 * 60 * 60 * 1000).toLocaleDateString(),
    price: value,
  }));

  return (
    <div className="container mx-auto p-4 space-y-8">
      <div className="flex items-center gap-4">
        <Link to="/">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div className="flex items-center gap-4">
          <img src={asset.logo} alt={asset.name} className="w-12 h-12" />
          <div>
            <h1 className="text-2xl font-bold">{asset.name}</h1>
            <p className="text-muted-foreground">{asset.symbol}</p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Price</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">{formatCurrency(asset.price)}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>24h Change</CardTitle>
          </CardHeader>
          <CardContent>
            <p className={`text-2xl font-semibold ${getPercentageColorClass(asset.priceChange.oneDay)}`}>
              {formatPercentage(asset.priceChange.oneDay)}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Market Cap</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">{formatCurrency(asset.marketCap)}</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Price Chart</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[400px] w-full">
            <ChartContainer config={{ price: { color: "#8B5CF6" } }}>
              <AreaChart data={historicalData}>
                <defs>
                  <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="timestamp" />
                <YAxis domain={['auto', 'auto']} />
                <Tooltip 
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-background border border-border p-2 rounded-lg shadow">
                          <p className="font-medium">{payload[0].payload.timestamp}</p>
                          <p className="text-muted-foreground">
                            Price: {formatCurrency(Number(payload[0].value))}
                          </p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="price" 
                  stroke="#8B5CF6" 
                  fillOpacity={1} 
                  fill="url(#colorPrice)" 
                />
              </AreaChart>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CoinDetail;
