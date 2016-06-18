import Server from 'socket.io';

module.exports = function startServer(store) {
  const io = Server().attach(8080);

  store.subscribe(
    () => io.emit('state'), store.getState().toJS()
  );

  io.on('connection', (socket) => {
    socket.emit('state', store.getState().toJS());
    socket.on('action', store.dispatch.bind(store));
  });
}
