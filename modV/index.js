const ws = require('nodejs-websocket')
const port = 3000

console.log('Create a WebSocket server on port', port)

/*
 * Create a WebSocket server
 */
 const server = ws.createServer(connection => {

    console.log('New connection')

    // Receive data
    connection.on('text', dmxData => {
      dmxData = JSON.parse(dmxData)

      // Broadcast to all connected clients
      server.connections.forEach(con => {

        // The client connection came from VisionLord
        if (con.path === '/visionLord') {
          con.sendText(JSON.stringify(dmxData))
        }
      })
    })

    connection.on('close', (code, reason) => {
      console.log('Connection closed:', code, reason)
    })

    connection.on('error', error => {
      if (error.code !== 'ECONNRESET') {
        // Ignore ECONNRESET and re throw anything else
        throw error
      }
    })
}).listen(port)
