![alt]("https://github.com/knfs-jsc/bamimi-socket.io/docs/images/logo-background.png")


---
# Introduction

This package was developed to make using sockets easier because:
 * Using router-like implementation in Express makes it easy for you to develop
 * Can write functions as functions or divide into Controllers / Services
 
---

# Install
```bash
npm i @knfs-tech/bamimi-socket.io
#or
yarn add @knfs-tech/bamimi-socket.io
```

# Usage

**Step 1**: Create file *config.js*
```js
module.exports = {
   cors: {
   	origin: "*",
   	transports: ['websocket', 'polling'],
   },
   transports: ['websocket', 'polling'],
   ...
};

```

*Note: You can see more information at* [socket.io](https://socket.io/docs/v4/)

**Step 2**: Create file *index.js*
```js
const { createServer } = require('node:http');
const config = require("/path/to/your-config")
const socket = require("@knfs-tech/bamimi-socket.io")
socket.io(server, config)

const connection = (io, socket) => {
	console.log("____Connection___")
}

socket.on(
	'/abc', 
	function (socket, next) {
		console.log("___Middleware 1 socket___")
		next()
	}, 
	function (socket, next) {
		console.log("___Middleware 2 socket___")
		next()
	}, 
	function (socket, next) {
		console.log("___Middleware 3 socket___-")
		next()
	}, 
	connection
)

//Case using Express
const express = require("express");
const app = express();
const server = createServer(app);

server.listen(config.server.port, () => {
	console.log(`server running at http://localhost:${config.server.port}`);
})
```
**Step 3**: Run file *index.js*
```bash
npm start
#or
node index.js
#or
yarn start
```

# Author
* [Khapu](https://github.com/khapu9260)
  
# Owner
* [Knfs.,jsc](https://github.com/knfs-jsc)
