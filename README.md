<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->
## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.
 
## Installation 

```bash
$ yarn install
```
or

```bash
npm install
```

## Running the app

```bash
$ yarn start
```
or

```bash
npm start
```

## Documentation Swagger

```bash
$ http://localhost:3000/docs
```
![Alt text](/screenshoot/swagger.png?raw=true "Swagger API Contract")

## Health Check Endpoint

```bash
$ http://localhost:3000/check
```
![Alt text](/screenshoot/health.png?raw=true "For health chek API")
## Propine exam

Given no parameters, return the latest portfolio value per token in USD --> http://localhost:3000/v1/latest-portfolio
```bash
ex: [GET] http://localhost:3000/v1/latest-portfolio
```
![Alt text](/screenshoot/latest-portfolio.png?raw=true "Given no parameters, return the latest portfolio value per token in USD")

Given a token, return the latest portfolio value for that token in USD --> http://localhost:3000/v1/latest-portfolio-token:/token
```bash
ex: [GET] http://localhost:3000/v1/latest-portfolio-token/ETH
```
![Alt text](/screenshoot/latest-portfolio-token.png?raw=true "Given a token, return the latest portfolio value for that token in USD ")
Given a date, return the portfolio value per token in USD on that date --> http://localhost:3000/v1/latest-portfolio-date:/date

```bash
ex: [GET] http://localhost:3000/v1/latest-portfolio-date/2019-10-25
```
![Alt text](/screenshoot/latest-portfolio-date.png?raw=true "Given a date, return the portfolio value per token in USD on that date ")

Given a date and a token, return the portfolio value of that token in USD on that date --> http://localhost:3000/v1/latest-portfolio-date-token:/date/:token
```bash
ex: [GET] http://localhost:3000/v1/latest-portfolio-token/2019-10-25/BTC
```
![Alt text](/screenshoot/latest-portfolio-date-token.png?raw=true "Given a date and a token, return the portfolio value of that token in USD on that date")
