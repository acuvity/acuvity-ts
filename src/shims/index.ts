let runtime: any;

if (typeof window !== 'undefined') {
  runtime = require('./web'); // Browser environment
} else if (typeof process !== 'undefined' && process.versions && process.versions.node) {
  runtime = require('./node'); // Node.js environment
} else {
  throw new Error('Unsupported runtime environment');
}

export const { base64Encode, base64Decode, makeRequest } = runtime;
