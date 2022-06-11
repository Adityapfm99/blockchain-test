
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BlockchainoModule } from './blockchain/blockchain.module';

@Module({
  imports: [ BlockchainoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
