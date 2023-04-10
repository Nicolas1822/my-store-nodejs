const jwt = require('jsonwebtoken');
const { config } = require('./config/config');

const secret = config.jwtSecret;
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjcsImlhdCI6MTY4MDY0NjMwOX0.Yz4e56Sps4Ot0Bq8Kd7-xszvlGub_2AnPSer_PrfvCc';

function verifyToken(token, secret) {
  return jwt.verify(token, secret);
}

const payload = verifyToken(token, secret);
console.log(payload);
