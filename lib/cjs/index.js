const { Server } = require('socket.io');
const http = require('http'); // Import the http module

/**
 * @module CORE
 */

/**
 * Class representing the core functionality of the application, specifically for managing Socket.IO.
 */
class CORE {
	/**
	 * The Socket.IO server instance.
	 * @private
	 * @type {Server|null}
	 */
	static _socket = null;

	/**
	 * Initializes the Socket.IO server. If an instance already exists, it returns the existing instance.
	 *
	 * @param {http.Server} server - The HTTP server instance to attach Socket.IO to.
	 * @param {Object} [config] - The configuration object for Socket.IO.
	 * @returns {Server} The Socket.IO server instance.
	 * @throws {Error} If there is an error initializing the Socket.IO server.
	 *
	 * @example
	 * const httpServer = http.createServer(app);
	 * const io = CORE.io(httpServer, { cors: { origin: "*" } });
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
	 * Attaches middleware and event handlers to a specified namespace.  Middleware is executed in the order provided.  The last middleware provided is treated as the connection handler.
	 *
	 * @param {string} path - The namespace path (e.g., '/chat').
	 * @param {...function} middlewares - Middleware functions to be applied. The last function is the connection handler `(socket: Socket) => void`.
	 * @returns {void}
	 * @throws {Error} If there is an error attaching middleware.
	 *
	 * @example
	 * CORE.on('/chat', authMiddleware, (socket) => {
	 *   socket.on('message', (msg) => {
	 *     console.log('message: ' + msg);
	 *   });
	 * });
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

				// @ts-ignore
				CORE._socket.of(path).use(middlewares[i]);
			}
		} catch (error) {
			console.error('Error attaching middleware:', error);
			throw error;
		}
	}
}

module.exports = CORE;
