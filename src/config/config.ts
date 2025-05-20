const config = {
  apiUrl: process.env.REACT_APP_API_URL || 'http://localhost:5000',
  port: process.env.PORT || 3000,
  host: process.env.HOST || '0.0.0.0',
};

export default config;