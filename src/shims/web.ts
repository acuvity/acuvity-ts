// Browser Base64 encoding/decoding
export const base64Encode = (data: string): string => btoa(data);
export const base64Decode = (data: string): string => atob(data);

// Browser fetch-based HTTP request
export const makeRequest = async (options: any, body?: any): Promise<any> => {
  const response = await fetch(options.url, {
    method: options.method,
    headers: options.headers,
    body,
  });
  const data = await response.text();
  return { status: response.status, body: data };
};
