import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Put } from '@nestjs/common';
import {ApiTags} from '@nestjs/swagger';
import { BlockchainService } from './blockchain.service';

@ApiTags('Blockchain')
@Controller('v1')
export class BlockChainController {
  constructor() {}

  @Get('latest-portfolio')
  @HttpCode(HttpStatus.OK)
  public async getLatestValPerTokenInUSD() {
    return BlockchainService.getLatestValPerTokenInUSD();
  }

  @Get('latest-portfolio-date/:date')
  @HttpCode(HttpStatus.OK)
  public async getLatestPortofolioDate(@Param('date') date: Date) {
    return BlockchainService.getPortfolioValPerToken(date);
  }

  @Get('latest-portfolio-date/:date/:token')
  @HttpCode(HttpStatus.OK)
  public async getLatestPortofolioDateToken(
    @Param('date') date: string,
    @Param('token') token: string
    ) {
    return BlockchainService.getLatestValPerTokenInUSD();
  }

}
