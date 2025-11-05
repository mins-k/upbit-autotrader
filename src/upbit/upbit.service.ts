import * as jwt from 'jsonwebtoken';
import * as crypto from 'crypto';
import axios from 'axios';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UpbitService {
  private readonly server = 'https://api.upbit.com';

  private authHeaders(params?: Record<string, any>) {
    const access = process.env.UPBIT_ACCESS_KEY || '';
    const secret = process.env.UPBIT_SECRET_KEY || '';
    const payload: any = { access_key: access, nonce: crypto.randomUUID() };

    if (params) {
      const query = Object.entries(params).map(([k, v]) => `${k}=${v}`).join('&');
      const hash = crypto.createHash('sha512').update(query).digest('hex');
      payload.query_hash = hash;
      payload.query_hash_alg = 'SHA512';
    }
    const token = jwt.sign(payload, secret, { algorithm: 'HS256' });
    return { Authorization: `Bearer ${token}` };
  }

  async accounts() {
    // 주문/잔고 조회 (live에서 사용)
    const { data } = await axios.get(`${this.server}/v1/accounts`, {
      headers: this.authHeaders(),
      timeout: 10_000,
    });
    return data;
  }

  async orderMarketBuyKRW(market: string, krw: number) {
    const params = { market, side: 'bid', ord_type: 'price', price: String(krw) };
    const { data } = await axios.post(`${this.server}/v1/orders`, null, {
      params, headers: this.authHeaders(params), timeout: 10_000,
    });
    return data;
  }

  async orderMarketSell(market: string, volume: number) {
    const params = { market, side: 'ask', ord_type: 'market', volume: String(volume) };
    const { data } = await axios.post(`${this.server}/v1/orders`, null, {
      params, headers: this.authHeaders(params), timeout: 10_000,
    });
    return data;
  }
}   