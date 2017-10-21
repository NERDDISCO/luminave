export default class BluetoothManager {

/*  constructor() {
    this.device = null
  }

  request() {
    // const options = { 'acceptAllDevices': true }
    const options = { filters: [{ services: ['fhzjm6FHFSR0NwQY8gy/CQ=='] }] }

    return navigator.bluetooth.requestDevice(options).
        then(device => {
          this.device = device
          this.device.addEventListener('gattserverdisconnected', this.onDisconnected)

          this.connect()
        })
  }

  connect() {
    if (!this.device) {
      return Promise.reject(new Error('Device is not connected.'))
    }

    return this.device.gatt.connect()
  }

  disconnect() {
    if (!this.device) {
      return Promise.reject(new Error('Device is not connected.'))
    }

    return this.device.gatt.disconnect()
  }

  onDisconnected(event) {
    console.log('Device is disconnected.', event)
  }

  enable() {
    this.request()
  }*/

  enable() {
    console.log('Requesting any Bluetooth Device...')
    // return this.enableDebug()

    navigator.bluetooth.requestDevice({
      // filters: [{ services: [ 'device_information' ] }],
      optionalServices : [ 'device_information' ],
      acceptAllDevices : true
    })
    .then(device => device.gatt.connect())
    .then(server => {
      return server.getPrimaryService('device_information')
    })
    .then(service => {
      // Getting Battery Level Characteristic...
      return Promise.all([
        service.getCharacteristic('00002a28-0000-1000-8000-00805f9b34fb'),
        service.getCharacteristic('00002a26-0000-1000-8000-00805f9b34fb'),
        service.getCharacteristic('00002a24-0000-1000-8000-00805f9b34fb'),
        service.getCharacteristic('00002a29-0000-1000-8000-00805f9b34fb')
      ])
    })
    .then(characteristic => {
      const [one, two, three, four] = characteristic

      return Promise.all([
        one.readValue(),
        two.readValue(),
        three.readValue(),
        four.readValue()
      ])
    })
    .then(values => {
      values.forEach(value => {
          console.log(value.getUint8(0))
      })
    })
  }








  enableDebug() {
    // console.log(BluetoothUUID.getService('device_information'))

    console.log('Requesting any Bluetooth Device...')
    navigator.bluetooth.requestDevice({
     // filters: [...] <- Prefer filters to save energy & show relevant devices.
        // filters: [{ services : ['0000180a-0000-1000-8000-00805f9b34fb'] }],
        optionalServices: ['device_information'],
        acceptAllDevices: true
}).
    then(device => {
      console.log('Connecting to GATT Server...')

return device.gatt.connect()
    }).
    then(server => {
      // Note that we could also get all services that match a specific UUID by
      // passing it to getPrimaryServices().
      console.log('Getting Services...')

return server.getPrimaryServices()
    }).
    then(services => {
      console.log('Getting Characteristics...')
      let queue = Promise.resolve()
      services.forEach(service => {
        queue = queue.then(_ => service.getCharacteristics().then(characteristics => {
          console.log(`> Service: ${service.uuid}`)
          characteristics.forEach(characteristic => {
            console.log(`>> Characteristic: ${characteristic.uuid} ${
                this.getSupportedProperties(characteristic)}`)
          })
        }))
      })

return queue
    }).
    catch(error => {
      console.log(`Argh! ${error}`)
    })
  }


  getSupportedProperties(characteristic) {
    const supportedProperties = []
    for (const p in characteristic.properties) {
      if (characteristic.properties[p] === true) {
        supportedProperties.push(p.toUpperCase())
      }
    }

return `[${supportedProperties.join(', ')}]`
  }

}
