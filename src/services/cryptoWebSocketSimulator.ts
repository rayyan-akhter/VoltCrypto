
import { AppDispatch } from '../store/store';
import { updatePrice, updatePriceChanges, updateVolume } from '../store/cryptoSlice';
import { initialCryptoData } from '../data/initialData';

// Simulate WebSocket for crypto price updates
class CryptoWebSocketSimulator {
  private intervalId: number | null = null;
  private dispatch: AppDispatch | null = null;

  // Connect to the simulated WebSocket
  connect(dispatch: AppDispatch) {
    this.dispatch = dispatch;
    
    // Randomly update prices every 1-2 seconds
    this.intervalId = window.setInterval(() => {
      if (!this.dispatch) return;
      
      // Randomly select which crypto to update
      const randomCryptoIndex = Math.floor(Math.random() * initialCryptoData.length);
      const cryptoId = initialCryptoData[randomCryptoIndex].id;
      
      // Randomly decide what to update
      const updateType = Math.floor(Math.random() * 3);
      
      switch (updateType) {
        case 0: // Update price
          this.simulatePriceUpdate(cryptoId);
          break;
        case 1: // Update percentages
          this.simulatePercentageChanges(cryptoId);
          break;
        case 2: // Update 24h volume
          this.simulateVolumeUpdate(cryptoId);
          break;
      }
    }, 1000 + Math.random() * 1000); // Random interval between 1-2 seconds
  }

  // Disconnect from the simulated WebSocket
  disconnect() {
    if (this.intervalId !== null) {
      window.clearInterval(this.intervalId);
      this.intervalId = null;
    }
    this.dispatch = null;
  }

  // Simulate a price update
  private simulatePriceUpdate(cryptoId: string) {
    if (!this.dispatch) return;
    
    const crypto = initialCryptoData.find(c => c.id === cryptoId);
    if (!crypto) return;
    
    // Generate a price change within ±2% of current price
    const priceChangePercent = (Math.random() * 4 - 2) / 100;
    const newPrice = crypto.price * (1 + priceChangePercent);
    
    // Dispatch the update
    this.dispatch(updatePrice({
      id: cryptoId,
      price: parseFloat(newPrice.toFixed(2))
    }));
  }

  // Simulate percentage changes updates
  private simulatePercentageChanges(cryptoId: string) {
    if (!this.dispatch) return;
    
    // Generate random changes
    const changes = {
      oneHour: parseFloat((Math.random() * 5 - 2.5).toFixed(2)),
      oneDay: parseFloat((Math.random() * 10 - 5).toFixed(2)),
      sevenDays: parseFloat((Math.random() * 20 - 10).toFixed(2)),
    };
    
    // Randomly select which change(s) to update
    const updateOneHour = Math.random() > 0.5;
    const updateOneDay = Math.random() > 0.5;
    const updateSevenDays = Math.random() > 0.5;
    
    const updatedChanges = {
      ...(updateOneHour ? { oneHour: changes.oneHour } : {}),
      ...(updateOneDay ? { oneDay: changes.oneDay } : {}),
      ...(updateSevenDays ? { sevenDays: changes.sevenDays } : {}),
    };
    
    // Only dispatch if we're updating at least one change
    if (Object.keys(updatedChanges).length > 0) {
      this.dispatch(updatePriceChanges({
        id: cryptoId,
        changes: updatedChanges,
      }));
    }
  }

  // Simulate volume updates
  private simulateVolumeUpdate(cryptoId: string) {
    if (!this.dispatch) return;
    
    const crypto = initialCryptoData.find(c => c.id === cryptoId);
    if (!crypto) return;
    
    // Generate a volume change within ±5% of current volume
    const volumeChangePercent = (Math.random() * 10 - 5) / 100;
    const newVolume = crypto.volume24h * (1 + volumeChangePercent);
    
    // Dispatch the update
    this.dispatch(updateVolume({
      id: cryptoId,
      volume24h: Math.round(newVolume),
    }));
  }
}

export default new CryptoWebSocketSimulator();
