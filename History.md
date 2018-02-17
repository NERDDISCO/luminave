
0.2.0 / 2018-02-17
==================

  * feat(timeline): Start playback with space
  * refactor(config): Added latest scenes & animations
  * refactor: Port configurable and improved comments
  * fix(midi): Handle MIDI connect in every situation
  * fix(webusb): Set initial data to 0
  * feat(keytime): Interpolate MultiRangeParam
  * refactor(timeline): Use selectors
  * fix(scene): Reset fixture when removing animation
  * refactor(dashboard): Switched positions
  * feat(storage): Print the current storage
  * style(browser): Improved styling
  * refactor(fixture): Renamed stupidStrobe
  * refactor(dependency): Keytime & buffer
  * refactor(keytime): Added browser-version of keytime & added improvements
  * feat(buffer): Added browser-version of buffer
  * refactor(config): More fixtures, scenes & animations
  * fix(state): Set correct fixture properties
  * docs(contributor): Added Kevin Gimbel
  * Merge pull request #31 from kevingimbel/patch-3/makePortConfigurable
  * misc(go-fmt): Format code with 'go fmt'
  * fix(server): Fix port definition to be ':1337' by default
  * feat(server): Make server port configurable
  * refactor(todo): Moved TODOs into GitHub
  * feat(timeline): Reset universe and fixtures
  * refactor(style): Improved layout
  * refactor(reselect): Use selectors
  * refactor(action): Renamed getAllFixtures into getFixtures
  * build(reselect): Added reselect
  * refactor(action): Added remove & run
  * feat(animation): Set animation name
  * refactor(style): Added grid layout
  * feat(animation): Set name of animation
  * fix(keyframe): Use Math.round
  * feat(scene): Set name of scene
  * refactor(style): Show components in flexbox
  * feat(config): Added config-manager
  * feat(universe): Reset universe
  * fix(timeline): Reset timeline for animation
  * feat(scene): Add multiple fixtures
  * fix(fixture): Attempt to fix #11
  * refactor(animation): Don't reset the form
  * feat(fixture): Add / reset fixtures
  * feat(redux): Added selectors
  * feat(timeline): Remove scene + fixtures from timeline
  * feat(state): Added redux-thunk
  * refactor(fixture): Send universe to fivetwelve
  * Merge pull request #25 from NERDDISCO/feat/redux
  * feat(fixture): Reset fixture properties
  * fix(timeline): Don't trigger another loop
  * refactor(usb): Clean up
  * feat(fixture): Added UV property
  * feat(fivetwelve): Send universe to fivetwelve
  * docs(fivetwelve): Fixed typo
  * docs(badge): Added badges
  * feat(modv): Connect to modV
  * docs(howto): Added features and howto use modV
  * docs(modv): Added comments & log messages
  * refactor(fixture): Set fixture properties
  * feat(fixture): Check for integer
  * docs(timeline): Explain the loop
  * refactor(config): Backup with all fixtures
  * fix(fixture): Set property
  * Merge branch 'feat/reduxFUCKINGBROKEN' into feat/redux
  * perf(fixture): Set all fixture properties at once
  * perf(modv): modV in global object
  * refactor(fixture): Clean up
  * fix(config): Clean & working
  * refactor(style): Added flex layout
  * fix(config): Working config
  * fix(everything): Fixed everything with batches
  * fix(timeline): Moved progress into animation
  * refactor(bullshit): bullshit
  * refactor(everything): super broken
  * fix(fixture): Initialize fixture in live mode
  * feat(live): Added live mode
  * feat(midi): Visualize active MIDI button
  * feat(timeline): Remove scenes from timeline
  * feat(midi): Add scene to timeline
  * feat(timeline): Play scenes in a loop
  * refactor(animation): Code cleanup
  * feat(fixture): Set fixture properties
  * chore(core): Removed old code
  * docs(bluetooth): Added bluetoothManager idea
  * feat(animation): Convert keyframes to keytime
  * chore(eslint): Disabled dot-location
  * docs(timeline): Handle keyframes
  * feat(timeline): Handle scenes in a timeline
  * style(scene): Optimized code
  * feat(scene): Show list of animations
  * feat(scene): Show list of fixtures
  * feat(midi): Show list of scenes
  * feat(midi): Add scene to MIDI
  * feat(midi): Change background while learning
  * docs(config): Added nanoPAD2 configuration
  * docs(midi): Fixed comment
  * feat(midi): Learn midi & midi-grid
  * chore(eslint): Disabled guard-for-in
  * style(universe): Added headlines
  * feat(midi): Added midi-controller
  * feat(midi): Added midi-manager
  * feat(keyframe): Select property from FIXTURE_PROPERTIES
  * feat(constant): Moved global lists into constants
  * refactor(fixture): Simplified addFixture
  * feat(fixture): Added labels to addFixture
  * feat(keyframe): Add keyframe to state
  * chore(eslint): Set max-params to 5
  * feat(config): VisionLordConfig example
  * feat(animation): animation-bee and addKeyframe
  * feat(scene): Set name & duration
  * refactor(scene): Improved style
  * docs(animation): Reference data model
  * refactor(keyframe): Optimization
  * feat(scene): Added scene-bee component
  * feat(fixture): Added id
  * style(dashboard): Seperate the components
  * feat(animation): Headline
  * refactor(fixture-manager): Simpliefied fixture creation
  * feat(fixture): Set name
  * refactor(data): Changed data model
  * feat(keyframes): Add and show keyframes
  * feat(uuid): Generate real UUID v1
  * refactor(cleanup): Remove unused classes
  * docs(animation): How does Keytime work
  * feat(storage): Download storage
  * feat(animations): Added animation-manager
  * feat(scenes): Added run button
  * fix(fixture): Renamed CameoFlatPar1RGBW
  * fix(localStorage): Unique identifier
  * feat(flex): Added style
  * feat(fixture): Transformed into VisionLord style
  * feat(storage): Added storage-manager
  * refactor(fixtures): Use spread operator
  * perf(fixtures): Improved performance
  * Merge branch 'feat/redux' of github.com:NERDDISCO/VisionLord into feat/redux
  * Merged.
  * Merged.
  * feat(fixtures): Added dmx fixtures
  * feat(fixtures): Added dmx fixtures
  * refactor(dashboard): Renamed my-view into visionlord-dashboard
  * docs(development): How to add a component
  * feat(fixture-manager): Create a Fixture Manager
  * refactor(usb): Cleaned up usb-dmx-manager
  * feat(usb-manager): Moved USB classes to usb-manager
  * docs(bpm): Added comment for dispatch
  * refactor(bpm): Renamed bpm to value
  * style(linter): Syntax cleaning
  * feat(state): New version of polymer-redux
  * refactor: Clean up
  * refactor(usb): Renamed usb to usb-manager
  * refactor(state): Clean up code
  * fix(channel-grid): Removed ducktape code
  * refactor(dependencies): added newer fork of immutability-helper
  * refactor: use immutability helper
  * fix(state): set channels on universes
  * feat(scenes): Added scenes
  * fix(property): Fixed type
  * feat(universe): Set channel for universe
  * feat(universe): Set channel for universe
  * docs: Basic description
  * refactor(redux-mixin): Remove unused actions
  * docs(universe): TODO: Set the channel for a specific universe
  * refactor(data-binding): One-way data binding
  * refactor(app): Renamed my-app to visionlord-master
  * docs(state): How does Redux work
  * refactor(state): Introduce managers
  * feat(universe): Add & remove universes
  * feat(connections): Test usb & bluetooth connect buttons
  * refactor: Simplified prototype
  * feat(state): Integrate old components
  * feat(state): polymer-redux state example
  * Merge branch 'master' of github.com:NERDDISCO/VisionLord into feat/redux
  * build(devDependencies): Removed redux-devtools
  * Merge branch 'master' into feat/redux
  * Added redux.

0.1.0 / 2018-01-20
==================

  * feat(history): Added history
  * Initial version
  * Initial version
  * refactor(data-model): ideas for redux model
  * More defaults for testing.
  * Added example animation for every possible type of property animation.
  * Round float to Integer.
  * Changed strobe range to 215.
  * Added DMX device: Involight Status 700.
  * Added "tilt".
  * Make it small.
  * Added DMX device: Involight Stratus 700.
  * Merge branch 'master' of github.com:NERDDISCO/VisionLord
  * Stuff from last night.
  * feat(timeline): add labels on keyframes
  * Improvements.
  * Merged.
  * Improvements.
  * fix(state): fix activate loop
  * Merge branch 'master' of github.com:NERDDISCO/VisionLord
  * Added URL to device.
  * Removed "left_1" scene.
  * refactor(state): update state on config
  * Stuff.
  * Added MIDI to control a scene.
  * feat(activity): scenes can be active
  * Added config restore.
  * Add new property to animation.
  * Add new animation / layer into config.
  * Minor issues.
  * Added more awesome features.
  * Merge branch 'master' of github.com:NERDDISCO/VisionLord
  * Added "restart-button".
  * refactor(animation):
  * Merge branch 'master' of github.com:NERDDISCO/VisionLord
  * Improved more.
  * feat(animations): add animation to layer
  * Merge branch 'master' of github.com:NERDDISCO/VisionLord
  * Added more scenes.
  * feat(timeline): add play button
  * Fixed everything.
  * :D
  * SHIT
  * Merge.
  * GO GO GO.
  * refactor(timeline): data as object
  * Fixed bug.
  * Merge branch 'master' of github.com:NERDDISCO/VisionLord
  * asdf
  * refactor(timeline): add example log
  * Getting even more there
  * fix(timeline): fix local duration
  * fixing.
  * Removed all scenes.
  * refactor(timeline): add method for runner
  * More
  * Merge branch 'master' of github.com:NERDDISCO/VisionLord
  * Stuff again.
  * feat(timeline): return values of animation
  * Merge.
  * Added BluetoothManager to handle simple Bluetooth devices (configured for a pebble 2).
  * feat(timeloop): added simple timeloop
  * refactor(state handling): add a simple state object in app
  * Merge.
  * Stuff.
  * refactor(component logic): changed logic of connect button
  * feat(timeline): added simple progress
  * Merged stuff.
  * A lot of different things.
  * feat(animations): added animations from config
  * Fixed promises.
  * fix(error-handling): promise resolving
  * Merge branch 'master' of github.com:NERDDISCO/VisionLord
  * Dev, dev, dev!
  * fix(error-handling): stable promise construct
  * feat(app): added timeline
  * feat(components): added timeline item
  * refactor(channels & devices): channel-grid and devices are separated
  * More improvements.
  * HOT STUFF 🔥.
  * Added Stairville Bowl Beam 604 LED COB Moving Head.
  * A LOT OF SIMPLE STUFF.
  * Improvements.
  * Improvements.
  * Improved "Tools + IDE".
  * Improved "Tools + IDE".
  * Added server in 64bit for Windows, macOS and Linux.
  * Custom names for server snapshot.
  * Custom names for server snapshot.
  * Changed description for the server.
  * Added "snapshot".
  * Moved server into it's own folder.
  * Improved code readability.
  * Changed from "nBytes" to "channels".
  * Back to better version.
  * - Improved Leonardo ETH sketch - Fixed fivetwelve and keytime - Improved WebMIDI & WebUSB handling
  * Many things
  * Fixed formatting.
  * Fixed URL to device-log.
  * Fixed URL to device-log.
  * Added comments and in the process of understanding the code :D.
  * Improved this AGAIN.
  * Added logging.
  * Changed port to 1337.
  * More stuff for Arduino.
  * Improved documentation around Arduino.
  * Improvements.
  * Improved documentation.
  * Improved documentation.
  * Added more info about Arduino.
  * Added badges and more infos.
  * Deactivated "array-element-newline"
  * Enforce eslint rules.
  * Deactivated "no-console".
  * Fixed config so it will not break arrays.
  * Removed src/config.js
  * Added a description on how these components should work.
  * Merge branch 'master' of github.com:NERDDISCO/VisionLord
  * Stuff.
  * feat(client): styling
  * Get data out of me.
  * MIDI is working again.
  * Clean up.
  * Added a very basic description on how sending the DMX512 data works."
  * Clean up and comments.
  * Removed unused packages.
  * Remove certs.
  * Added "WebUSB" and "Conceptinetics" as libraries for Arduino.
  * Fixed logical dependencies between DMXOutput and ArduinoLeonardoETHDriver.
  * Added resources for arduino including the sketch for Leonardo ETH.
  * Stuff.
  * Way tooo much stuff for just a "update to ES6".
  * Added rxjs and other thingies.
  * Merge branch 'master' of github.com:NERDDISCO/VisionLord
  * Converted into es6.
  * feat(config): config loader
  * Merge branch 'master' of github.com:NERDDISCO/VisionLord
  * Ported every dmx device to es6
  * feat(components): channel-grid config
  * Removed more from server and fixed a HUGE merge CONFLICT 😱
  * Merge.
  * Merge.
  * MORE
  * feat(components): channel-grid IDs
  * Merged with my stuff, yo
  * Tried to use channel-grid
  * feat(components): grid component event handler
  * Merge branch 'master' of github.com:NERDDISCO/VisionLord
  * a bit
  * feat(components): added inputs
  * build(yarn): added yarn lock
  * refactor(components): self defined components
  * feat(components): channel-grid
  * Super much (es6 port of fivetwelve)
  * Removed unused stuff.
  * Merge branch 'master' of github.com:NERDDISCO/VisionLord
  * Clean up & more new things.
  * feat(components): added connect button
  * More support.
  * Added @TODO.
  * refactor(source): components folder
  * Improvements.
  * Manage data in localStorage.
  * Merge pull request #1 from NERDDISCO/feature/frontend
  * Merge branch 'master' into feature/frontend
  * Added eslint.
  * style(source): format
  * ci(eslint): added config
  * Things.
  * Added USB* related things!
  * Removed unused code
  * fix(port): use correct port
  * feat(client): added polymer
  * Convert to new architecture based on go and WebUSB
  * Added more cool things.
  * Support for WebUSB * Send bytes to Arduino Leonardo ETH to control a DMX512 shield

0.1.0 / 2018-01-20
==================

  * Initial version
  * Initial version
  * refactor(data-model): ideas for redux model
  * More defaults for testing.
  * Added example animation for every possible type of property animation.
  * Round float to Integer.
  * Changed strobe range to 215.
  * Added DMX device: Involight Status 700.
  * Added "tilt".
  * Make it small.
  * Added DMX device: Involight Stratus 700.
  * Merge branch 'master' of github.com:NERDDISCO/VisionLord
  * Stuff from last night.
  * feat(timeline): add labels on keyframes
  * Improvements.
  * Merged.
  * Improvements.
  * fix(state): fix activate loop
  * Merge branch 'master' of github.com:NERDDISCO/VisionLord
  * Added URL to device.
  * Removed "left_1" scene.
  * refactor(state): update state on config
  * Stuff.
  * Added MIDI to control a scene.
  * feat(activity): scenes can be active
  * Added config restore.
  * Add new property to animation.
  * Add new animation / layer into config.
  * Minor issues.
  * Added more awesome features.
  * Merge branch 'master' of github.com:NERDDISCO/VisionLord
  * Added "restart-button".
  * refactor(animation):
  * Merge branch 'master' of github.com:NERDDISCO/VisionLord
  * Improved more.
  * feat(animations): add animation to layer
  * Merge branch 'master' of github.com:NERDDISCO/VisionLord
  * Added more scenes.
  * feat(timeline): add play button
  * Fixed everything.
  * :D
  * SHIT
  * Merge.
  * GO GO GO.
  * refactor(timeline): data as object
  * Fixed bug.
  * Merge branch 'master' of github.com:NERDDISCO/VisionLord
  * asdf
  * refactor(timeline): add example log
  * Getting even more there
  * fix(timeline): fix local duration
  * fixing.
  * Removed all scenes.
  * refactor(timeline): add method for runner
  * More
  * Merge branch 'master' of github.com:NERDDISCO/VisionLord
  * Stuff again.
  * feat(timeline): return values of animation
  * Merge.
  * Added BluetoothManager to handle simple Bluetooth devices (configured for a pebble 2).
  * feat(timeloop): added simple timeloop
  * refactor(state handling): add a simple state object in app
  * Merge.
  * Stuff.
  * refactor(component logic): changed logic of connect button
  * feat(timeline): added simple progress
  * Merged stuff.
  * A lot of different things.
  * feat(animations): added animations from config
  * Fixed promises.
  * fix(error-handling): promise resolving
  * Merge branch 'master' of github.com:NERDDISCO/VisionLord
  * Dev, dev, dev!
  * fix(error-handling): stable promise construct
  * feat(app): added timeline
  * feat(components): added timeline item
  * refactor(channels & devices): channel-grid and devices are separated
  * More improvements.
  * HOT STUFF 🔥.
  * Added Stairville Bowl Beam 604 LED COB Moving Head.
  * A LOT OF SIMPLE STUFF.
  * Improvements.
  * Improvements.
  * Improved "Tools + IDE".
  * Improved "Tools + IDE".
  * Added server in 64bit for Windows, macOS and Linux.
  * Custom names for server snapshot.
  * Custom names for server snapshot.
  * Changed description for the server.
  * Added "snapshot".
  * Moved server into it's own folder.
  * Improved code readability.
  * Changed from "nBytes" to "channels".
  * Back to better version.
  * - Improved Leonardo ETH sketch - Fixed fivetwelve and keytime - Improved WebMIDI & WebUSB handling
  * Many things
  * Fixed formatting.
  * Fixed URL to device-log.
  * Fixed URL to device-log.
  * Added comments and in the process of understanding the code :D.
  * Improved this AGAIN.
  * Added logging.
  * Changed port to 1337.
  * More stuff for Arduino.
  * Improved documentation around Arduino.
  * Improvements.
  * Improved documentation.
  * Improved documentation.
  * Added more info about Arduino.
  * Added badges and more infos.
  * Deactivated "array-element-newline"
  * Enforce eslint rules.
  * Deactivated "no-console".
  * Fixed config so it will not break arrays.
  * Removed src/config.js
  * Added a description on how these components should work.
  * Merge branch 'master' of github.com:NERDDISCO/VisionLord
  * Stuff.
  * feat(client): styling
  * Get data out of me.
  * MIDI is working again.
  * Clean up.
  * Added a very basic description on how sending the DMX512 data works."
  * Clean up and comments.
  * Removed unused packages.
  * Remove certs.
  * Added "WebUSB" and "Conceptinetics" as libraries for Arduino.
  * Fixed logical dependencies between DMXOutput and ArduinoLeonardoETHDriver.
  * Added resources for arduino including the sketch for Leonardo ETH.
  * Stuff.
  * Way tooo much stuff for just a "update to ES6".
  * Added rxjs and other thingies.
  * Merge branch 'master' of github.com:NERDDISCO/VisionLord
  * Converted into es6.
  * feat(config): config loader
  * Merge branch 'master' of github.com:NERDDISCO/VisionLord
  * Ported every dmx device to es6
  * feat(components): channel-grid config
  * Removed more from server and fixed a HUGE merge CONFLICT 😱
  * Merge.
  * Merge.
  * MORE
  * feat(components): channel-grid IDs
  * Merged with my stuff, yo
  * Tried to use channel-grid
  * feat(components): grid component event handler
  * Merge branch 'master' of github.com:NERDDISCO/VisionLord
  * a bit
  * feat(components): added inputs
  * build(yarn): added yarn lock
  * refactor(components): self defined components
  * feat(components): channel-grid
  * Super much (es6 port of fivetwelve)
  * Removed unused stuff.
  * Merge branch 'master' of github.com:NERDDISCO/VisionLord
  * Clean up & more new things.
  * feat(components): added connect button
  * More support.
  * Added @TODO.
  * refactor(source): components folder
  * Improvements.
  * Manage data in localStorage.
  * Merge pull request #1 from NERDDISCO/feature/frontend
  * Merge branch 'master' into feature/frontend
  * Added eslint.
  * style(source): format
  * ci(eslint): added config
  * Things.
  * Added USB* related things!
  * Removed unused code
  * fix(port): use correct port
  * feat(client): added polymer
  * Convert to new architecture based on go and WebUSB
  * Added more cool things.
  * Support for WebUSB * Send bytes to Arduino Leonardo ETH to control a DMX512 shield
