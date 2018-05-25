const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('hello world!');
});

app.get('/api/courses', (req, res) => {
  res.send('api course.');
});

app.listen(3000, () => {
  console.log('Listening on port 3000..');
});