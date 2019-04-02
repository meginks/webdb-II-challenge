const express = require('express');
const helmet = require('helmet');
const zooRouter = require('../zoo/zoo-router.js')
const server = express();

server.use(express.json());
server.use(helmet());

// endpoints here

server.use('/api/zoos', zooRouter)

const port = process.env.PORT || 5005;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
