import express from 'express';

const app = express();
const port = 8080;

console.log('server is running...');

app.get('/messages', (req, res) => {
  const requestSource = req.headers['x-id'];
  console.log(
    `${new Date().toISOString()}: EXECUTING /messages on backend from ${requestSource}`
  );
  res.json([
    { id: 1, text: 'Hello World' },
    { id: 2, text: 'Another message from the separate backend' },
  ]);
});

app.listen(port, () => {
  console.log('✅ Server is running...');
});
