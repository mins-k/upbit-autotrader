import { Injectable } from '@nestjs/common';

type PaperPos = { qty: number; avg: number; cash: number; pnl: number };

@Injectable()
export class TradeService {
  private state: PaperPos = { qty: 0, avg: 0, cash: 1_000_000, pnl: 0 }; // 초기 가상 KRW

  // 매우 단순한 paper 체결(수수료/슬리피지 무시 버전)
  marketBuyKRW(lastPrice: number, krw: number) {
    const vol = krw / lastPrice;
    const newQty = this.state.qty + vol;
    const newAvg = (this.state.avg * this.state.qty + vol * lastPrice) / newQty;
    this.state.qty = newQty;
    this.state.avg = newAvg;
    this.state.cash -= krw;
    return { side: 'bid', vol, price: lastPrice, state: this.state };
  }

  marketSellVolume(lastPrice: number, volume: number) {
    const vol = Math.min(volume, this.state.qty);
    const proceeds = vol * lastPrice;
    const cost = vol * this.state.avg;
    const pnl = proceeds - cost;
    this.state.qty -= vol;
    if (this.state.qty === 0) this.state.avg = 0;
    this.state.cash += proceeds;
    this.state.pnl += pnl;
    return { side: 'ask', vol, price: lastPrice, realized: pnl, state: this.state };
  }

  snapshot(lastPrice: number) {
    const equity = this.state.cash + this.state.qty * lastPrice;
    const uPnL = this.state.qty * (lastPrice - this.state.avg);
    return { ...this.state, lastPrice, equity, uPnL };
  }
}