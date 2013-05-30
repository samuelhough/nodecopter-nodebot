five = require("johnny-five")

board = new five.Board()

createServo = (pin) ->

  # Create a new `servo` hardware instance.
  servo = new five.Servo(
    center: true
    pin: pin
    
    # `type` defaults to standard servo.
    # For continuous rotation servos, override the default
    # by setting the `type` here
    type: "continuous"
  )

  # Inject the `servo` hardware into
  # the Repl instance's context;
  # allows direct command line access
  board.repl.inject({servo: servo})

  # Continuous Rotation Servo API

  # move( speed )
  # Set the speed at which the continuous rotation
  # servo will rotate at.
  servo.move 180

createSensor = (pin) ->

  # Create a new `sensor` hardware instance.
  sensor = new five.Sensor(
    pin: pin
    freq: 250
  )

  # Inject the `sensor` hardware into
  # the Repl instance's context;
  # allows direct command line access
  board.repl.inject sensor: sensor

  sensor.scale([0, 100]).on("read", ->
    console.log @normalized, @scaled
  ).on "change", ->
    console.log "changed this", @
    console.log "changed args", arguments

createLightSensor = (pin) ->

  # Create a new `sensor` hardware instance.
  sensor = new five.Sensor(
    pin: pin
    freq: 250
  )

  # Inject the `sensor` hardware into
  # the Repl instance's context;
  # allows direct command line access
  board.repl.inject sensor: sensor

  sensor.scale([0, 100]).on("read", ->
    console.log "light", @normalized, @scaled

    if @normalized < 50
      console.log "turn off"

    else
      console.log "turn on"
    
  ).on "change", ->
    #console.log "changed this", @
    #console.log "changed args", arguments

createAccel = (pin, axis) ->

  # Create a new `sensor` hardware instance.
  sensor = new five.Sensor(
    pin: pin
    freq: 750
  )

  # Inject the `sensor` hardware into
  # the Repl instance's context;
  # allows direct command line access
  board.repl.inject sensor: sensor

  sensor.scale([0, 100]).on("read", ->
    console.log axis, @normalized, @scaled
  ).on "change", ->
    #console.log "changed this", @
    #console.log "changed args", arguments

board.on "ready", ->
  
  #createServo("O0")
  #createServo("O1")
  createAccel("I0", "X")
  createAccel("I1", "Y")
  createLightSensor("I5")
