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

    function onUpdate() {

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
