const ws = require('nodejs-websocket')
const [, , _port] = process.argv
const port = _port || 3000

const shit = require('enttec-open-dmx-usb')

let device;

(async () => {
  device = new shit.EnttecOpenDMXUSBDevice(await shit.EnttecOpenDMXUSBDevice.getFirstAvailableDevice())
})()


var options = {
 host: '196.21.149.240',
// host: '196.21.149.231'
 // refresh: 1000 / 30
}
var artnet = require('artnet')(options);

console.log('artnet-integration', '|', 'WebSocket server on port', port)

/*
 * Create a WebSocket server
 */
 const server = ws.createServer(connection => {

  /*
universe, channel, array 
  */

    console.log('artnet-integration', '|', 'New connection by', connection.path)

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

          if (device) {
            // dmxData.forEach((o, i, a) => a[i] = a[i].toString(16))

            dmxData.forEach(function(part, index) {
              dmxData[index] = dmxData[index].toString(16);
            });

            
            // device.setChannels(dmxData)
          }


          // console.log(device)
          //console.log(dmxData)
          // artnet.set(0, 1, dmxData);
          // artnet.set(0, 1, 255)
        }
      })
    })

    /*
     * WebSocket Close Codes: https://www.iana.org/assignments/websocket/websocket.xml#close-code-number
     */
    connection.on('close', code => {
      console.log('artnet-integration', '|', 'Connection closed by', connection.path, 'with code', code)
    })

    connection.on('error', error => {
      console.log('artnet-integration', '|', 'Error by', connection.path, 'with code', error.code)

      if (error.code === 'EHOSTDOWN' || error.code === 'ETIMEDOUT' || error.code === 'EPIPE') {
        return
      }

      // Ignore ECONNRESET and re throw anything else
      if (error.code !== 'ECONNRESET') {
        throw error
      }
    })
}).listen(port, '0.0.0.0')
