const ws = require('nodejs-websocket')
const [, , _port] = process.argv
const port = _port || 3001

console.log('dekk-integration', '|', 'WebSocket server on port', port)

/*
 * Create a WebSocket server
 *
 * Based on where the connection is coming from the path should be:
 * /dekk = from Dekk
 * /visionLord = from VisionLord
 */
 const server = ws.createServer(connection => {

    console.log('dekk-integration', '|', 'New connection by', connection.path)

    // Receive data
    connection.on('text', data => {
      data = JSON.parse(data)

      // Broadcast to all connected clients
      server.connections.forEach(con => {

        // The client connection came from VisionLord
        if (con.path === '/visionLord') {
          con.sendText(JSON.stringify(data))
        }
      })
    })

    /*
     * WebSocket Close Codes: https://www.iana.org/assignments/websocket/websocket.xml#close-code-number
     */
    connection.on('close', code => {
      console.log('dekk-integration', '|', 'Connection closed by', connection.path, 'with code', code)
    })

    connection.on('error', error => {
      if (error.code !== 'ECONNRESET') {
        // Ignore ECONNRESET and re throw anything else
        throw error
      }
    })
}).listen(port)
