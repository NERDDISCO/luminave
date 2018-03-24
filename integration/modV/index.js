const ws = require('nodejs-websocket')
const [, , _port] = process.argv
const port = _port || 3000

console.log('modv-integration', '|', 'WebSocket server on port', port)

/*
 * Create a WebSocket server
 */
 const server = ws.createServer(connection => {

    console.log('modv-integration', '|', 'New connection by', connection.path)

    // Receive data
    connection.on('text', dmxData => {
      dmxData = JSON.parse(dmxData)

      // Broadcast to all connected clients
      server.connections.forEach(con => {

        // The client connection came from luminave
        if (con.path === '/luminave') {
          con.sendText(JSON.stringify(dmxData))
        }
      })
    })

    /*
     * WebSocket Close Codes: https://www.iana.org/assignments/websocket/websocket.xml#close-code-number
     */
    connection.on('close', code => {
      console.log('modv-integration', '|', 'Connection closed by', connection.path, 'with code', code)
    })

    connection.on('error', error => {
      if (error.code !== 'ECONNRESET') {
        // Ignore ECONNRESET and re throw anything else
        throw error
      }
    })
}).listen(port)
