
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';
import { initialCryptoData } from '../data/initialData';

export interface PriceChange {
  oneHour: number;
  oneDay: number;
  sevenDays: number;
}

export interface CryptoAsset {
  id: string;
  rank: number;
  name: string;
  symbol: string;
  logo: string;
  price: number;
  priceChange: PriceChange;
  marketCap: number;
  volume24h: number;
  circulatingSupply: number;
  maxSupply: number | null;
  chartData: number[];
  lastUpdated: string;
}

interface CryptoState {
  assets: CryptoAsset[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  lastUpdatedField: string | null;
}

const initialState: CryptoState = {
  assets: initialCryptoData,
  status: 'idle',
  error: null,
  lastUpdatedField: null,
};

export const cryptoSlice = createSlice({
  name: 'crypto',
  initialState,
  reducers: {
    updatePrice: (state, action: PayloadAction<{ id: string; price: number }>) => {
      const { id, price } = action.payload;
      const asset = state.assets.find(a => a.id === id);
      if (asset) {
        asset.price = price;
        asset.lastUpdated = new Date().toISOString();
      }
      state.lastUpdatedField = 'price';
    },
    updatePriceChanges: (
      state,
      action: PayloadAction<{ id: string; changes: Partial<PriceChange> }>
    ) => {
      const { id, changes } = action.payload;
      const asset = state.assets.find(a => a.id === id);
      if (asset) {
        asset.priceChange = { ...asset.priceChange, ...changes };
        asset.lastUpdated = new Date().toISOString();
      }
      state.lastUpdatedField = 'priceChange';
    },
    updateVolume: (state, action: PayloadAction<{ id: string; volume24h: number }>) => {
      const { id, volume24h } = action.payload;
      const asset = state.assets.find(a => a.id === id);
      if (asset) {
        asset.volume24h = volume24h;
        asset.lastUpdated = new Date().toISOString();
      }
      state.lastUpdatedField = 'volume';
    },
    batchUpdateAssets: (state, action: PayloadAction<Partial<CryptoAsset>[]>) => {
      action.payload.forEach(update => {
        const index = state.assets.findIndex(asset => asset.id === update.id);
        if (index !== -1) {
          state.assets[index] = { ...state.assets[index], ...update };
          state.assets[index].lastUpdated = new Date().toISOString();
        }
      });
      state.lastUpdatedField = 'batch';
    },
  },
});

// Actions
export const { updatePrice, updatePriceChanges, updateVolume, batchUpdateAssets } = cryptoSlice.actions;

// Selectors
export const selectAllAssets = (state: RootState) => state.crypto.assets;
export const selectAssetById = (state: RootState, id: string) => 
  state.crypto.assets.find(asset => asset.id === id);
export const selectLastUpdatedField = (state: RootState) => state.crypto.lastUpdatedField;

export default cryptoSlice.reducer;
