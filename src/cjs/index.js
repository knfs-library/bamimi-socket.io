const { Server } = require('socket.io');

/**
 * Class representing the core functionality of the application.
 */
class CORE {
	// The Socket.IO server instance.
	static _socket = null;

	/**
	 * Initialize the Socket.IO server.
	 * 
	 * @param {http.Server} server - The HTTP server instance.
	 * @param {Object} config - The configuration object for Socket.IO.
	 *
	 * @returns {Server} The Socket.IO server instance.
	 */
	static io(server, config) {
		try {
			if (!CORE._socket) {
				CORE._socket = new Server(server, config);
			}
			return CORE._socket;
		} catch (error) {
			console.error('Error initializing Socket.IO server:', error);
			throw error;
		}
	}

	/**
	 * Attach middleware and event handlers to a specified namespace.
	 * 
	 * @param {string} path - The namespace path.
	 * @param {...function} middlewares - Middleware functions to be applied.
	 * 
	 * @returns {void}
	 */
	static on(path, ...middlewares) {
		try {
			for (let i = 0; i < middlewares.length; i++) {
				if (middlewares.length - 1 === i) {
					CORE._socket.of(path).on('connection', (socket) => {
						console.log("ip: " + socket.request.connection.remoteAddress);
						console.log("user-agent: " + socket.request.headers['user-agent']);
						console.log('user connected');

						try {
							middlewares[i](CORE._socket, socket);
						} catch (error) {
							console.error('Error executing middleware:', error);
						}

						socket.on('disconnect', () => {
							console.log("ip: " + socket.request.connection.remoteAddress);
							console.log("user-agent: " + socket.request.headers['user-agent']);
							console.log('user disconnected');
						});
					});

					return;
				}

				CORE._socket.of(path).use(middlewares[i]);
			}
		} catch (error) {
			console.error('Error attaching middleware:', error);
			throw error;
		}
	}
}

module.exports = CORE;
