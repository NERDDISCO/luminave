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

        if (con.readyState !== con.OPEN) {
          return
        }

        // The client connection came from luminave
        if (con.path === '/luminave') {
          con.sendText(JSON.stringify(dmxData))
        }

        // The client connection came from cyberpunk goggles
        if (con.path === '/cyberpunk') {
          const colors = JSON.stringify(dmxData.colors.slice(12 * 3, 12 * 3 + 3))
          // console.log('send to cyberpunk', JSON.stringify(colors))
          con.sendText(colors) 
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
      console.log('modv-integration', '|', 'Error by', connection.path, 'with code', error.code)

      if (error.code === 'EHOSTDOWN' || error.code === 'ETIMEDOUT') {
        return
      }

      // Ignore ECONNRESET and re throw anything else
      if (error.code !== 'ECONNRESET') {
        throw error
      }
    })
}).listen(port, '0.0.0.0')
