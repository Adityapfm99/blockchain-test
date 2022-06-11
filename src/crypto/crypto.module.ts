import { Module } from '@nestjs/common';
import { CryptoController } from './crypto.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CryptoService } from './crypto.service';

@Module({
  imports: [TypeOrmModule.forFeature([])],
  controllers: [CryptoController],
  providers: [CryptoService],
})
export class CryptoModule {}
