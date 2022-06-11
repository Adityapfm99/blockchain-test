import { Injectable } from '@nestjs/common';

export class AppService {
  healthyCheck(): string {
    const data = {
      uptime: process.uptime(),
      message: 'Ok',
      date: new Date()
    }
    return JSON.stringify(data);
  }
}
