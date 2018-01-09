const ws = require('nodejs-websocket')
const port = 3000

/*
 * Create a WebSocket server
 */
 const server = ws.createServer(connection => {

    console.log('New connection')

    // Receive data
    connection.on('text', dmxData => {
      dmxData = JSON.parse(dmxData)

      server.connections.forEach(con => {

        if (con.path === '/visionLord') {
          console.log(dmxData)
          con.sendText(JSON.stringify(dmxData))
        }
      })
    })

    connection.on('close', (code, reason) => {
      console.log('Connection closed:', reason)
    })

    connection.on('error', error => {
      if (error.code !== 'ECONNRESET') {
        // Ignore ECONNRESET and re throw anything else
        throw error
      }
    })
}).listen(port)
