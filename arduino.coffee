module.exports = class Arduino

  constructor: ->
    @five = require("johnny-five")
    @board = new @five.Board()

  createAccelSensor: (pin, axis) ->

    # Create a new `sensor` hardware instance.
    sensor = new @five.Sensor(
      pin: pin
      freq: 750
    )

    # Inject the `sensor` hardware into
    # the Repl instance's context;
    # allows direct command line access
    @board.repl.inject sensor: sensor

    sensor.scale([0, 100]).on("read", ->
      console.log axis, @normalized, @scaled
    ).on "change", ->
      #console.log "changed this", @
      #console.log "changed args", arguments

  createLightSensor: (pin) ->

    # Create a new `sensor` hardware instance.
    sensor = new @five.Sensor(
      pin: pin
      freq: 250
    )

    # Inject the `sensor` hardware into
    # the Repl instance's context;
    # allows direct command line access
    @board.repl.inject sensor: sensor

    sensor.scale([0, 100]).on("read", ->
      console.log "light", @normalized, @scaled

      if @normalized < 50
        console.log "turn off"

      else
        console.log "turn on"
      
    ).on "change", ->
      #console.log "changed this", @
      #console.log "changed args", arguments

  start: ->
    @board.on "ready", =>

      @createAccel("I0", "X")
      @createAccel("I1", "Y")
      @createLightSensor("I5")
