import { Server } from 'socket.io';

/**
 * Class representing the core functionality of the application.
 */
export default class CORE {
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
		for (let i = 0; i < middlewares.length; i++) {
			if (middlewares.length - 1 === i) {
				try {
					CORE._socket.of(path).on('connection', (socket) => {
						// Log connection details
						console.log("ip: " + socket.request.connection.remoteAddress);
						console.log("user-agent: " + socket.request.headers['user-agent']);
						console.log('user connected');

						// Execute the last middleware function
						middlewares[i](CORE._socket, socket);

						// Listen for disconnect event
						socket.on('disconnect', () => {
							// Log disconnection details
							console.log("ip: " + socket.request.connection.remoteAddress);
							console.log("user-agent: " + socket.request.headers['user-agent']);
							console.log('user disconnected');
						});
					});
				} catch (error) {
					console.error('Error attaching middleware to namespace:', error);
					throw error;
				}

				return;
			}

			// Apply middlewares to the specified namespace
			try {
				CORE._socket.of(path).use(middlewares[i]);
			} catch (error) {
				console.error('Error applying middleware to namespace:', error);
				throw error;
			}
		}
	}
}
