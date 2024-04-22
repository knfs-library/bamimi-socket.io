<p align="center">
  <img width="250" src="https://github.com/knfs-jsc/bamimi-socket.io/blob/master/docs/images/logo-background.png?raw=true">
  <br>
	<a href="https://app.fossa.com/projects/git%2Bgithub.com%2Fknfs-jsc%2Fbamimi-socket.io?ref=badge_shield&issueType=license" alt="FOSSA Status"><img src="https://app.fossa.com/api/projects/git%2Bgithub.com%2Fknfs-jsc%2Fbamimi-socket.io.svg?type=shield&issueType=license"/></a>
	<a href="https://app.fossa.com/projects/git%2Bgithub.com%2Fknfs-jsc%2Fbamimi-socket.io?ref=badge_shield&issueType=security" alt="FOSSA Status"><img src="https://app.fossa.com/api/projects/git%2Bgithub.com%2Fknfs-jsc%2Fbamimi-socket.io.svg?type=shield&issueType=security"/></a>
	<img src="https://scrutinizer-ci.com/g/knfs-jsc/bamimi-socket.io/badges/build.png?b=master" alt="Build Status" />
</p>

<h1> <span style="color:#013C4D;">About</span> <span style="color:#2B7F84;">Bamimi socket.io</span></h1>


This package was developed to make using sockets easier because:
 * Using router-like implementation in Express makes it easy for you to develop
 * Can write functions as functions or divide into Controllers / Services
 
---

## Install
```bash
npm i @knfs-tech/bamimi-socket.io
#or
yarn add @knfs-tech/bamimi-socket.io
```

## Usage

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
const express = require("express");
const app = express();
const server = createServer(app);

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

server.listen(3001, () => {
	console.log(`server running at http://localhost:3001`);
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

## Author
* [Kent Phung](https://github.com/khapu9260)
  
## Owner
* [Knfs.,jsc](https://github.com/knfs-jsc)


## License

Bamimi is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).