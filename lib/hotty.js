const socketIO = require('socket.io');
const fs = require('fs');

let io;

exports.watch = (server, files) => {
  io = socketIO(server);
  let hotty = io.of('/hotty');

  let watcher = fs.watch(files);
  watcher.on('change', (filename) => hotty.emit('change', filename));

  return watcher;
};
