import { Module } from '@nestjs/common';
import { BlockChainController } from './blockchain.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlockchainService } from './blockchain.service';

@Module({
  imports: [TypeOrmModule.forFeature([])],
  controllers: [BlockChainController],
  providers: [BlockchainService],
})
export class BlockchainoModule {}
