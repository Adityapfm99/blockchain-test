import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Put } from '@nestjs/common';
import {ApiTags} from '@nestjs/swagger';
import { CryptoService } from './blockchain.service';

@ApiTags('Blockchain')
@Controller('v1')
export class CryptoController {
  constructor(private readonly cryptoService: CryptoService) {}

  @Get('latest-portfolio')
  @HttpCode(HttpStatus.OK)
  public async getLatestValPerTokenInUSD() {
    return this.cryptoService.getLatestValPerTokenInUSD();
  }

  // @Get('getUSD')
  // @HttpCode(HttpStatus.OK)
  // public async getUsd() {
  //   return CryptoService.getUSDValues();
  // }
  // @Get('/:awbNumber')
  // @ApiBearerAuth()
  // @HttpCode(HttpStatus.OK)
  // public async getAwb(@Param('awbNumber') awbNumber: string) {
  //   return this.awbService.getAwb(awbNumber);
  // }
  @Get('latest-portfolio-token:/token')
  @HttpCode(HttpStatus.OK)
  public async getLatestPortofolioToken(@Param('token') token: string) {
    return this.cryptoService.getLatestValPerTokenInUSD();
  }

  @Get('latest-portfolio-date:/date')
  @HttpCode(HttpStatus.OK)
  public async getLatestPortofolioDate(@Param('date') date: string) {
    return this.cryptoService.getLatestValPerTokenInUSD();
  }

  @Get('latest-portfolio-date/:date/:token')
  @HttpCode(HttpStatus.OK)
  public async getLatestPortofolioDateToken(
    @Param('date') date: string,
    @Param('token') token: string
    ) {
    return this.cryptoService.getLatestValPerTokenInUSD();
  }

}
