import { Injectable } from '@nestjs/common';
import moment = require('moment');
const csv = require('csv-parser');
import path = require('path');
const fs = require('fs');
import axios from 'axios';
import { jsonFromLineDto } from './dto/blokchain';
const { parse } = require('csv-parse');

@Injectable()
export class CryptoService {
  constructor() {}

  static async getUSDValues() {
    const cryptoURL =
      'https://min-api.cryptocompare.com/data/pricemulti?fsyms=ETH,DASH&tsyms=BTC,USD,EUR&api_key=3789ea397be622354552b3ab2a826e4379b5da952de997d3cff964ed4f0786ee';

    const getUSD = await axios({
      method: 'GET',
      url: cryptoURL,
    });
    return getUSD.data;
  }

  async getLatestValPerTokenInUSD() {
    return new Promise(function (resolve) {
      let output = [];
      let usdValues;
      let btcOutputArr = { token: 'BTC', amount: 0, timestamp: 0 };
      let ethOutputArr = { token: 'ETH', amount: 0, timestamp: 0 };
      let xrpOutputArr = { token: 'XRP', amount: 0, timestamp: 0 };
      console.log('nasuk---------------------------');

      const lineReader = fs
        .createReadStream(
          '/transactions.csv',
        )
        .on('error', () => {
          // handle error
        })
        .pipe(csv())
        .on('data', (chunk) => {
          const jsonFromLine = new jsonFromLineDto();
          let lineSplit = chunk;
   
          jsonFromLine.timestamp = lineSplit.timestamp;
          jsonFromLine.transaction_type = lineSplit.transaction_type;
          jsonFromLine.token = lineSplit.token;
          jsonFromLine.amount = lineSplit.amount;
          if (jsonFromLine.token === 'ETH') {
            if (jsonFromLine.timestamp > ethOutputArr.timestamp) {
              ethOutputArr.amount = jsonFromLine.amount;
              ethOutputArr.timestamp = jsonFromLine.timestamp;
            }
          } else if (jsonFromLine.token === 'BTC') {
            if (jsonFromLine.timestamp > btcOutputArr.timestamp) {
              btcOutputArr.amount = jsonFromLine.amount;
              btcOutputArr.timestamp = jsonFromLine.timestamp;
            }
          } else if (jsonFromLine.token === 'XRP') {
            if (jsonFromLine.timestamp > xrpOutputArr.timestamp) {
              xrpOutputArr.amount = jsonFromLine.amount;
              xrpOutputArr.timestamp = jsonFromLine.timestamp;
            }
          }
        })

        .on('end', () => {
          // handle end of CSV
          let cryptoCompare = CryptoService.getUSDValues();
    
          cryptoCompare.then(
            function (result) {
              let usdValues = result;
              ethOutputArr.amount = ethOutputArr.amount * usdValues.ETH.USD;
              btcOutputArr.amount = btcOutputArr.amount * usdValues.ETH.USD;
              xrpOutputArr.amount = xrpOutputArr.amount * usdValues.ETH.USD;

              output.push(ethOutputArr);
              output.push(btcOutputArr);
              output.push(xrpOutputArr);

              console.log('aaaaaaa', output);
              resolve(output);
              return output;
            },
            function (err) {
              console.log(err);
            },
          );
          return output;
        });

      lineReader.on('close', function (chunk) {
        let cryptoCompare = CryptoService.getUSDValues();

        cryptoCompare.then(
          function (result) {
            let usdValues = result;
            ethOutputArr.amount = ethOutputArr.amount * usdValues.ETH.USD;
            btcOutputArr.amount = btcOutputArr.amount * usdValues.ETH.USD;
            xrpOutputArr.amount = xrpOutputArr.amount * usdValues.ETH.USD;

            output.push(ethOutputArr);
            output.push(btcOutputArr);
            output.push(xrpOutputArr);

            console.log('aaaaaaa', output);
            return output;
          },
          function (err) {
            console.log(err);
          },
        );
        return output;
      });
    });
  }
}
