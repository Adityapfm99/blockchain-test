import { Module } from '@nestjs/common';
import { CryptoController } from './blokchain.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CryptoService } from './blokchain.service';

@Module({
  imports: [TypeOrmModule.forFeature([])],
  controllers: [CryptoController],
  providers: [CryptoService],
})
export class CryptoModule {}
