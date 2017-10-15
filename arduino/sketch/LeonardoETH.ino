#include <WebUSB.h>
#include <Conceptinetics.h>

// @TODO: Add a description
WebUSB WebUSBSerial(1, "localhost:1337");
#define Serial WebUSBSerial

// Amount of DMX channels
#define channels 512

// dmx_master(channels , pin);
// channels: Amount of DMX channels
// pin: Pin to do read / write operations on the DMX shield
// https://sourceforge.net/p/dmxlibraryforar/wiki/DMX%20Master/
DMX_Master dmx_master(channels , 2);


// Run once on startup
void setup() {
  // Wait until WebUSB connection is established
  while (!Serial) {
    ;
  }
  // @TODO: Why can I use everything without this?
  // Data rate in bits per second
  // https://www.arduino.cc/en/Serial/Begin
  // nBytes (per message) * fps * bit (byte into bit conversion)
  //Serial.begin(nBytes * 30 * 8);
  //Serial.begin(9600);

  // Write binary data to WebUSB
  // https://www.arduino.cc/en/Serial/Write
  Serial.write("WebUSB connection is ready 😎");

  // Waits until transmission to WebUSB is complete
  // https://www.arduino.cc/en/Serial/Flush
  Serial.flush();

  // Start DMXMaster & transmission to DMXShield
  dmx_master.enable();
}



// Run over and over again
void loop() {

  // Amount of incoming bytes via WebUSB
  // Array of bytes
  byte incoming[channels];

  // WebUSB is available
  if (Serial.available() > 0) {

    // Read bytes (the # channels) from WebUSB and save them into incoming
    Serial.readBytes(incoming, channels);

    // Iterate over all channels
    for (int i = 0; i < channels; i++) {
      // Set the value for each channel
      dmx_master.setChannelValue(i + 1, incoming[i]);
    }

    // Write back to WebUSB
    Serial.print("channels: ");
    Serial.print(channels);
    Serial.flush();
  }
}
