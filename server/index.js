const argv = require('yargs').argv;
const cors = require('cors');
const express = require('express');
const path = require('path');

let server = null;
const app = express();

app.use(cors());
app.use(express.static(
	path.join(
		__dirname,
		'..'
	)
));
// test
app.get('/', (request, response) => {
  response.sendFile(path.join('index.html'));
});

app.set('port', process.env.PORT || argv.port || 8080);

server = app.listen(
  app.get('port'),
  () => {
    console.log(`server listening on port : ${app.get('port')}`);
  }
);

const shutdown = () => {
  console.info('\n\nKilling services...');

  server.close(() => {
    console.info('Shutting down server..');
    process.exit();
  });
};

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);
