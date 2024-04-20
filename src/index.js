const { Server } = require('socket.io');

/**
 * 
 */
class CORE {
	/**
	 * @var { Server} _socket
	 */
	static _socket = null;
	static channels = null;
	/**
	 * 
	 * @param {*} server 
	 * @param {*} config 
	 * @returns 
	 */
	static io(server, config) {
		if (!CORE._socket) {
			CORE._socket = new Server(server, config)
		}

		return CORE._socket
	}

	static on(path, ...middlewares) {
		for (let i = 0; i < middlewares.length; i ++) {
			if (middlewares.length - 1 === i) {
				CORE._socket.of(path).on('connection', (socket) => {
					console.log("ip: " + socket.request.connection.remoteAddress);
					console.log("user-agent: " + socket.request.headers['user-agent']);
					console.log('user connected');

					middlewares[i](CORE._socket, socket);

					socket.on('disconnect', () => {
						console.log("ip: " + socket.request.connection.remoteAddress);
						console.log("user-agent: " + socket.request.headers['user-agent']);
						console.log('user disconnected');
					});
				})

				return
			}

			CORE._socket.of(path).use(middlewares[i])

			
		}
	}
}

module.exports = CORE