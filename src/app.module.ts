import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { UpbitModule } from './upbit/upbit.module';
import { TradeModule } from './trade/trade.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // .env 로드
    ScheduleModule.forRoot(),
    UpbitModule,
    TradeModule,
  ],
})
export class AppModule {}