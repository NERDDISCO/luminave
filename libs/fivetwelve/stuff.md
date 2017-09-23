# dmx-library

Connects my application with a dmx-bus using an arduino and rs485-transceiver.

tests are there documentation will follow sometime.


# Testing with MA 3D

_MA 3D_ is the only acceptable pre-show visualization software i found that can be used for free without limitations (such software usually costs around 300 to several thousand euros). While it is not intended to be used this way, it can be configured to accept DMX-Input via Art-Net from this library if used together with _grandma on PC_ (both downloadable from [the MA-Lighting website][malighting]).

The Software is Windows only and required up-to-date graphics drivers and while I couldn't get a virtualbox windows to run it, I have been able to get it up and running in a Windows10 VM using Parallels 11. Linux users might be out of luck here.

[malighting]: http://www.malighting.com/en/support-downloads/software.html

## Setup steps

### a) open grandma on pc and MA3D

simply open both applications

### b) establish the MA-Net connection between the two
   - in grandma on pc:
     - Setup -> Network Control
        * Enter Session-Name (right click on field)
        * press Create Session

     - Setup -> Network Configuration -> 3D
        * Add -> select the MA3d instance and add it
        * Right click on "Session member column"

     - Setup -> Network Protocols -> Art-Net
        * Add
        * Right click "mode"-column of the new entry and set to input
        * click "Artnet input active" on the right hand side

   - in MA3D we now see the green heart showing an active MA-Net connection
   - the System should now be ready to accept external Art-Net input

### c) Add your Fixtures
   - in grandma on PC:
     1. Setup -> Patch and fixture Schedule
     2. All patching is done in Layers to group the fixtures, so you first need
        to enter a name for the layer.
     3. Find and select the fixture from the library
     4. When done adding stuff, exit and save
   - in MA3d the fixtures should be added to the scene

### d) Prepare a DMX-Monitor and reset default-values
   - in grandma on PC:
     1. switch to an external screen
     2. click into the empty space and select Sheets > DMX

 - make sure that there is no output coming from the
   default-values from the grandma (as these do override the artnet-inputs)
   - check the dmx-monitor when idle for channel-values != 0
   - select all relevant fixtures and manually set the values to 0
   - create a preset to store these values.
