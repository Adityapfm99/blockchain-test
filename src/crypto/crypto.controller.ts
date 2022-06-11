import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Put } from '@nestjs/common';
import {ApiTags} from '@nestjs/swagger';
import { CryptoService } from './crypto.service';

@ApiTags('Crypto')
@Controller('v1')
export class CryptoController {
  constructor(private readonly cryptoService: CryptoService) {}

  @Get('getLatestUSD')
  @HttpCode(HttpStatus.OK)
  public async getLatestValPerTokenInUSD() {
    return this.cryptoService.getLatestValPerTokenInUSD();
  }

  @Get('getUSD')
  @HttpCode(HttpStatus.OK)
  public async getUsd() {
    return CryptoService.getUSDValues();
  }
}
