import http from 'http';
import app from './src/app';

const PORT = 3000;

app.set('port', PORT);

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});
