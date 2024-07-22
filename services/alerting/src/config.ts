export const SERVICE_NAME = process.env.SERVICE_NAME ?? "alerting";
export const PORT = process.env.PORT ?? 3003;
export const SECRET_KEY = process.env.SECRET_KEY ?? "very-secret";
export const DATA_SERVICE_ENDPOINT = process.env.DATA_SERVICE_ENDPOINT ?? 'http://localhost:3004'
export const ALERTING_INTERVAL = process.env.ALERTING_INTERVAL ? parseInt(process.env.ALERTING_INTERVAL) : 5000;
