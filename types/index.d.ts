export = CORE;
/**
 * @module CORE
 */
/**
 * Class representing the core functionality of the application, specifically for managing Socket.IO.
 */
declare class CORE {
    /**
     * The Socket.IO server instance.
     * @private
     * @type {Server|null}
     */
    private static _socket;
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
    static io(server: http.Server, config?: any): Server;
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
    static on(path: string, ...middlewares: Function[]): void;
}
import http = require("http");
import { Server } from "socket.io";
