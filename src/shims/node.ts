import { Buffer } from 'buffer';
import http from 'http';
import https from 'https';

// Node.js Base64 encoding/decoding
export const base64Encode = (data: string): string => Buffer.from(data).toString('base64');
export const base64Decode = (data: string): string => Buffer.from(data, 'base64').toString('utf-8');

// Node.js HTTP request using native http/https
export const makeRequest = (options: any, body?: any): Promise<any> => {
  return new Promise((resolve, reject) => {
    const req = (options.protocol === 'https:' ? https : http).request(options, (res: any) => {
      let data = '';
      res.on('data', (chunk: any) => (data += chunk));
      res.on('end', () => resolve({ status: res.statusCode, body: data }));
    });
    req.on('error', reject);
    if (body) req.write(body);
    req.end();
  });
};
