(function() {
  'use strict';

  document.addEventListener('DOMContentLoaded', event => {
    let connectButton = document.querySelector("#connect");
    let statusDisplay = document.querySelector('#status');
    let redSlider = document.querySelector('#red');
    let greenSlider = document.querySelector('#green');
    let blueSlider = document.querySelector('#blue');
    let uvSlider = document.querySelector('#uv');
    let dimmerSlider = document.querySelector('#dimmer');
    let strobeSlider = document.querySelector('#strobe');
    window.port = null;


    function connect() {
      window.port.connect().then(() => {
        statusDisplay.textContent = '';
        connectButton.textContent = 'Disconnect';

        window.port.onReceive = data => {
          let textDecoder = new TextDecoder();
          console.log(textDecoder.decode(data));
        }
        window.port.onReceiveError = error => {
          console.error(error);
        };
      }, error => {
        statusDisplay.textContent = error;
      });
    }

    function onUpdate() {

      if (!window.port) {
        return;
      }

      let view = new Uint8Array(512);
      view.fill(0);
      view[0] = parseInt(redSlider.value);
      view[1] = parseInt(greenSlider.value);
      view[2] = parseInt(blueSlider.value);
      view[3] = parseInt(uvSlider.value);
      view[4] = parseInt(dimmerSlider.value);
      view[5] = parseInt(strobeSlider.value);
      window.port.send(view);

      console.log(view);
    };

    redSlider.addEventListener('input', onUpdate);
    greenSlider.addEventListener('input', onUpdate);
    blueSlider.addEventListener('input', onUpdate);
    uvSlider.addEventListener('input', onUpdate);
    dimmerSlider.addEventListener('input', onUpdate);
    strobeSlider.addEventListener('input', onUpdate);

    connectButton.addEventListener('click', function() {
      if (window.port) {
        window.port.disconnect();
        connectButton.textContent = 'Connect';
        statusDisplay.textContent = '';
        window.port = null;
      } else {
        serial.requestPort().then(selectedPort => {
          window.port = selectedPort;
          connect();
        }).catch(error => {
          statusDisplay.textContent = error;
        });
      }
    });

    serial.getPorts().then(ports => {
      if (ports.length == 0) {
        statusDisplay.textContent = 'No device found.';
      } else {
        statusDisplay.textContent = 'Connecting...';
        window.port = ports[0];
        connect();
      }
    });
  });
})();
