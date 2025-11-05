import { Module } from '@nestjs/common';
import { UpbitService } from './upbit.service';
import { UpbitController } from './upbit.controller';

@Module({
  providers: [UpbitService],
  controllers: [UpbitController],
  exports: [UpbitService], // 다른 모듈에서 사용
})
export class UpbitModule {}