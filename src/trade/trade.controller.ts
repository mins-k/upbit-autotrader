import { Controller, Get, Post, Query } from '@nestjs/common';
import { TradeService } from './trade.service';

@Controller('paper')
export class TradeController {
  constructor(private readonly paper: TradeService) {}

  // KRW 금액만큼 시장가 매수 (paper)
  @Post('buy')
  buy(@Query('price') price: string, @Query('krw') krw: string) {
    return this.paper.marketBuyKRW(Number(price), Number(krw));
  }

  // 수량 만큼 시장가 매도 (paper)
  @Post('sell')
  sell(@Query('price') price: string, @Query('volume') vol: string) {
    return this.paper.marketSellVolume(Number(price), Number(vol));
  }

  // 현재 포지션 스냅샷
  @Get('snapshot')
  snap(@Query('price') price: string) {
    return this.paper.snapshot(Number(price));
  }
}