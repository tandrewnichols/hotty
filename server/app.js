const fs = require('fs');
const http = require('http');
const path = require('path');
let template = `${ __dirname }/index.html`;
let script = `${ path.resolve(__dirname, '..') }/dist/client.hotty.js`;

const handler = (req, res) => {
  console.log(req.url);
  switch (req.url) {
    case '/':
      res.writeHead(200);
      res.end(fs.readFileSync(template, 'utf-8'));
      break;
    case '/dist/client.hotty.js':
      res.writeHead(200, { 'Content-Type': 'text/javascript' });
      res.end(fs.readFileSync(script, 'utf-8'));
      break;
    default:
      res.writeHead(404);
      res.end('Not Found');
      break;
  }
};

const server = http.createServer(handler);

let watcher = require('../lib/hotty').watch(server, template);

server.listen(3131, () => {
  console.log('App listening on port 3131');
});
