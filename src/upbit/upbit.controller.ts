import { Controller, Get, Post, Query } from '@nestjs/common';
import { UpbitService } from './upbit.service';

@Controller('upbit')
export class UpbitController {
  constructor(private readonly upbit: UpbitService) {}

  @Get('accounts')
  accounts() {
    return this.upbit.accounts();
  }

  @Post('buy')
  buy(@Query('market') market: string, @Query('krw') krw: string) {
    return this.upbit.orderMarketBuyKRW(market, Number(krw));
  }

  @Post('sell')
  sell(@Query('market') market: string, @Query('volume') volume: string) {
    return this.upbit.orderMarketSell(market, Number(volume));
  }
}