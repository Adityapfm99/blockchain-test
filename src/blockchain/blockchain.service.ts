import { Injectable } from "@nestjs/common";
import moment = require("moment");
const csv = require("csv-parser");
import path = require("path");
const fs = require("fs");
import axios from "axios";
import { jsonFromLineDto } from "./dto/blokchain";
import { json } from "stream/consumers";
import { skip } from "rxjs";
const { parse } = require("csv-parse");

@Injectable()
export class BlockchainService {
  constructor() {}

  static async getUSDValues() {
    const cryptoURL =
      "https://min-api.cryptocompare.com/data/pricemulti?fsyms=ETH,DASH&tsyms=BTC,USD,EUR&api_key=3789ea397be622354552b3ab2a826e4379b5da952de997d3cff964ed4f0786ee";

    const getUSD = await axios({
      method: "GET",
      url: cryptoURL,
    });
    return getUSD.data;
  }
  static async filterByProperty(array, prop, value) {
    let filtered = [];
    for (let i = 0; i < array.length; i++) {
      let obj = array[i];

      for (var key in obj) {
        if (typeof (obj[key] == "object")) {
          var item = obj[key];
          if (item[prop] == value) {
            filtered.push(item);
          }
        }
      }
    }

    return filtered;
  }

  static async getLatestValPerTokenInUSD() {
    return new Promise(function (resolve) {
      let output = [];
      let usdValues;
      let date;
      let ethWitResult = [];
      let ethDepResult = [];
      let btcOutputArr = {
        token: "BTC",
        amount: 0,
        timestamp: 0,
        realDate: date,
      };
      let ethOutputArrDep = {
        token: "ETH",
        amount: 0,
        timestamp: 0,
        realDate: date,
      };

      let xrpOutputArr = {
        token: "XRP",
        amount: 0,
        timestamp: 0,
        realDate: date,
      };
      let countETH = 0;
      

      const lineReader = fs
        .createReadStream(
          "/Users/aditya/crypto/blockchain/src/blockchain/transactions.csv",{ start: 0, end: 1000 },
        )
        .on("error", () => {
          // handle error
          console.log("FILE NOT FOUND");
        })
        .pipe(csv())
        .on("data", (chunk) => {
          const jsonFromLine = new jsonFromLineDto();
          let lineSplit = chunk;
          jsonFromLine.timestamp = lineSplit.timestamp;
          jsonFromLine.transaction_type = lineSplit.transaction_type;
          jsonFromLine.token = lineSplit.token;
          jsonFromLine.amount = lineSplit.amount;
          let d = new Date(lineSplit.timestamp * 1000);

          let dateFromCSV =
            d.getFullYear() +
            "-" +
            (d.getMonth() + 1) +
            "-" +
            d.getDate() +
            " " +
            d.getHours() +
            ":" +
            d.getMinutes() +
            ":" +
            d.getSeconds();
            countETH++;

            console.log(countETH)

          if (jsonFromLine.token === "ETH" ) {
            if (jsonFromLine.timestamp > ethOutputArrDep.timestamp) {
              ethOutputArrDep.amount = jsonFromLine.amount;
              ethOutputArrDep.timestamp = jsonFromLine.timestamp;
              ethOutputArrDep.realDate = dateFromCSV;
            }
    
          } else if (jsonFromLine.token === "XRP") {
            if (jsonFromLine.timestamp > xrpOutputArr.timestamp) {
              xrpOutputArr.amount = jsonFromLine.amount;
              xrpOutputArr.timestamp = jsonFromLine.timestamp;
              xrpOutputArr.realDate = dateFromCSV;
            }
            } else if (jsonFromLine.token === "BTC") {
              if (jsonFromLine.timestamp > btcOutputArr.timestamp) {
                btcOutputArr.amount = jsonFromLine.amount;
                btcOutputArr.timestamp = jsonFromLine.timestamp;
                btcOutputArr.realDate = dateFromCSV;
              }
          }
        })

        .on("end", () => {
          // handle end of CSV
          let cryptoCompare = BlockchainService.getUSDValues();
          cryptoCompare.then(
            function (result) {
              let usdValues = result;
              ethOutputArrDep.amount =  ethOutputArrDep.amount * usdValues.ETH.USD;;
              btcOutputArr.amount = btcOutputArr.amount * usdValues.ETH.USD;
              xrpOutputArr.amount = xrpOutputArr.amount * usdValues.ETH.USD;

              output.push(ethOutputArrDep);
              output.push(btcOutputArr);
              output.push(xrpOutputArr);

              resolve(output);
              return output;
            },
            function (err) {
              console.log(err);
            }
          );
          return output;
        });

      lineReader.on("close", function (chunk) {
        let cryptoCompare = BlockchainService.getUSDValues();
        lineReader.destroy();
        // cryptoCompare.then(
        //   function (result) {
        //     let usdValues = result;
        //     ethOutputArrDep.amount = ethOutputArrDep.amount * usdValues.ETH.USD;
        //     ethOutputArrWIt.amount = ethOutputArrWIt.amount * usdValues.ETH.USD;
        //     btcOutputArr.amount = btcOutputArr.amount * usdValues.ETH.USD;
        //     xrpOutputArr.amount = xrpOutputArr.amount * usdValues.ETH.USD;

        //     output.push(ethOutputArrDep);
        //     output.push(ethOutputArrWIt);
        //     output.push(xrpOutputArr);

        //     return output;
        //   },
        //   function (err) {
        //     console.log(err);
        //   }
        // );
        return output;
      });
    });
  }

  static async valuePerTokenUsd(date: Date) {
    return new Promise(function (resolve) {
      let output = [];
      let valueBtc = [];
      let valueEth = [];
      let valueXrp = [];
      let usdValues;
      let btcOutputArr = { token: "BTC", amount: 0, timestamp: 0, date: date };
      let ethOutputArr = { token: "ETH", amount: 0, timestamp: 0, date: date };
      let xrpOutputArr = { token: "XRP", amount: 0, timestamp: 0, date: date };

      const lineReader = fs
        .createReadStream(
          "transactions.csv"
        )
        .on("error", () => {
          // handle error
          console.log("FILE NOT FOUND");
        })
        .pipe(csv())
        .on("data", (chunk) => {
          const jsonFromLine = new jsonFromLineDto();
          let lineSplit = chunk;
          jsonFromLine.timestamp = lineSplit.timestamp;
          jsonFromLine.transaction_type = lineSplit.transaction_type;
          jsonFromLine.token = lineSplit.token;
          jsonFromLine.amount = lineSplit.amount;
          let d = new Date(lineSplit.timestamp * 1000);
          let dateFromCSV =
            d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();

          if (jsonFromLine.token === "ETH") {
            if (date.toString() === dateFromCSV) {
              ethOutputArr.amount = jsonFromLine.amount;
              ethOutputArr.timestamp = jsonFromLine.timestamp;
              valueEth.push(Number(jsonFromLine.amount));
            }
          } else if (jsonFromLine.token === "BTC") {
            if (date.toString() === dateFromCSV) {
              btcOutputArr.amount = jsonFromLine.amount;
              btcOutputArr.timestamp = jsonFromLine.timestamp;
              valueBtc.push(Number(jsonFromLine.amount));
            }
          } else if (jsonFromLine.token === "XRP") {
            if (date.toString() === dateFromCSV) {
              xrpOutputArr.amount = jsonFromLine.amount;
              xrpOutputArr.timestamp = jsonFromLine.timestamp;
              valueXrp.push(Number(jsonFromLine.amount));
            }
          }
        })

        .on("end", () => {
          // handle end of CSV
          let cryptoCompare = BlockchainService.getUSDValues();

          cryptoCompare.then(
            function (result) {
              let usdValues = result;
              let amtBtc = 0;
              let amtXrp = 0;
              let amtEth = 0;

              valueBtc.forEach((line) => {
                amtBtc += line;
              });
              valueEth.forEach((line) => {
                amtEth += line;
              });
              valueXrp.forEach((line) => {
                amtXrp += line;
              });
              ethOutputArr.amount = amtEth * usdValues.ETH.USD;
              btcOutputArr.amount = amtBtc * usdValues.ETH.USD;
              xrpOutputArr.amount = amtXrp * usdValues.ETH.USD;

              output.push(ethOutputArr);
              output.push(btcOutputArr);
              output.push(xrpOutputArr);

              resolve(output);
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

  static async getPortfolioValPerDate(date: Date) {
    return new Promise(function (resolve) {
      console.log("masuk date");
      let output = [];
      let usdValues;
      let btcOutputArr = [];
      let ethOutputArr = [];
      let xrpOutputArr = [];
      let cryptoCompare = BlockchainService.getUSDValues();

      const lineReader = fs
        .createReadStream(
          "transactions.csv"
        )
        .on("error", (err) => {
          // handle error
          console.log("FILE NOT FOUND");
        })
        .pipe(csv())
        .on(
          "data",
          (chunk) => {
            const jsonFromLine = new jsonFromLineDto();
            let lineSplit = chunk;
            jsonFromLine.timestamp = lineSplit.timestamp;
            jsonFromLine.transaction_type = lineSplit.transaction_type;
            jsonFromLine.token = lineSplit.token;
            jsonFromLine.amount = lineSplit.amount;

            //converting date from timestamp
            let d = new Date(lineSplit.timestamp * 1000);
            let dateFromCSV =
              d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
            cryptoCompare.then(
              function (result) {
                let usdValues = result;
                if (jsonFromLine.token === "ETH") {
                  if (date.toString() === dateFromCSV) {
                    ethOutputArr.push({
                      token: jsonFromLine.token,
                      amount: jsonFromLine.amount * usdValues.ETH.USD,
                    });
                  }
                } else if (jsonFromLine.token === "BTC") {
                  if (date.toString() === dateFromCSV) {
                    btcOutputArr.push({
                      token: jsonFromLine.token,
                      amount: jsonFromLine.amount * usdValues.ETH.USD,
                    });
                  }
                } else if (jsonFromLine.token === "XRP") {
                  if (date.toString() === dateFromCSV) {
                    xrpOutputArr.push({
                      token: jsonFromLine.token,
                      amount: jsonFromLine.amount * usdValues.ETH.USD,
                    });
                  }
                }

                output.push(ethOutputArr);
                output.push(btcOutputArr);
                output.push(xrpOutputArr);
                resolve(output);
                return output;
              },
              function (err) {
                console.log(err);
              }
            );
          } //
        );
      lineReader.on("close", function (line) {
        output.push(ethOutputArr);
        output.push(btcOutputArr);
        output.push(xrpOutputArr);
        resolve(output);
        return output;
      });
    });
  }

  static async getPortfolioToken(token: string) {
    return new Promise(function (resolve, reject) {
      let output = [];
      let sum = 0;
      let usdValues;
      let btcOutputArr = [];
      let resOutputArr = [];
      let xrpOutputArr = [];
      let cryptoCompare = BlockchainService.getUSDValues();

      const lineReader = fs
        .createReadStream(
          "transactions.csv"
        )
        .on("error", (err) => {
          // handle error
          reject({ message: err.message });
        })
        .pipe(csv())
        .on(
          "data",
          (chunk) => {
            const jsonFromLine = new jsonFromLineDto();
            let lineSplit = chunk;
            jsonFromLine.timestamp = lineSplit.timestamp;
            jsonFromLine.transaction_type = lineSplit.transaction_type;
            jsonFromLine.token = lineSplit.token;
            jsonFromLine.amount = lineSplit.amount;

            cryptoCompare.then(
              function (result) {
                let usdValues = result;

                if (jsonFromLine.token === token) {
                  resOutputArr.push({
                    amount: jsonFromLine.amount * usdValues.ETH.USD,
                  });
                }

                output.push(resOutputArr);
                resolve(output[0]);
                return output[0];
              },
              function (err) {
                console.log(err);
              }
            );
          } // end loop
        );

      lineReader.on("close", function (line) {
        output.push(resOutputArr);
        resolve(output);
      });
    });
  }

  static async resToken(token: string) {
    let a = [];
    let sum = 0;
    let result = {
      token: token,
      amountInUsd: 0,
    };
    const res = await this.getPortfolioToken(token);
    a.push(res);
    for (const data of a[0]) {
      sum += Number(data.amount);
    }
    result.amountInUsd = sum;

    return result;
  }

  static async resDate(date: Date) {
    const res = await this.valuePerTokenUsd(date);
    return res;
  }

  static async resDateToken(date: Date, token: string) {
    const res = await this.getPortfolioValPerDateToken(date, token);

    return res;
  }

  static async getPortfolioValPerDateToken(date: Date, token: string) {
    return new Promise(function (resolve) {
      let output = [];
      let valueBtc = [];
      let valueEth = [];
      let valueXrp = [];
      let usdValues;
      let btcOutputArr = { token: token, amount: 0, timestamp: 0, date: date };

      const lineReader = fs
        .createReadStream(
          "transactions.csv"
        )
        .on("error", () => {
          // handle error
          console.log("FILE NOT FOUND");
        })
        .pipe(csv())
        .on("data", (chunk) => {
          const jsonFromLine = new jsonFromLineDto();
          let lineSplit = chunk;
          jsonFromLine.timestamp = lineSplit.timestamp;
          jsonFromLine.transaction_type = lineSplit.transaction_type;
          jsonFromLine.token = lineSplit.token;
          jsonFromLine.amount = lineSplit.amount;
          let d = new Date(lineSplit.timestamp * 1000);
          let dateFromCSV =
            d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();

          if (jsonFromLine.token === token) {
            if (date.toString() === dateFromCSV) {
              btcOutputArr.amount = jsonFromLine.amount;
              btcOutputArr.timestamp = jsonFromLine.timestamp;
              valueBtc.push(Number(jsonFromLine.amount));
            }
          }
        })

        .on("end", () => {
          // handle end of CSV
          let cryptoCompare = BlockchainService.getUSDValues();

          cryptoCompare.then(
            function (result) {
              let usdValues = result;
              let amtBtc = 0;

              valueBtc.forEach((line) => {
                amtBtc += line;
              });

              btcOutputArr.amount = amtBtc * usdValues.ETH.USD;

              output.push(btcOutputArr);

              resolve(output);
              return output;
            },
            function (err) {
              console.log(err);
            }
          );
          return output;
        });
    });
  }
}
