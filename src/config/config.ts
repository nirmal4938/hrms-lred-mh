const ENV = process.env.REACT_APP_NODE_ENV;
const config = {
 apiUrl:
    ENV === 'production'
      ? process.env.REACT_APP_API_URL_PROD
      : process.env.REACT_APP_API_URL_DEV,
  port: process.env.PORT || 3000,
  host: process.env.HOST || '0.0.0.0',
};

export default config;