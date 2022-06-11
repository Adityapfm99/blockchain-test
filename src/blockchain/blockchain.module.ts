import { Module } from '@nestjs/common';
import { CryptoController } from './blockchain.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CryptoService } from './blockchain.service';

@Module({
  imports: [TypeOrmModule.forFeature([])],
  controllers: [CryptoController],
  providers: [CryptoService],
})
export class CryptoModule {}
