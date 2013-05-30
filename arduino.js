var Arduino, Emitter,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Emitter = require('events').EventEmitter;

module.exports = Arduino = (function(_super) {

  __extends(Arduino, _super);

  function Arduino() {}

  Arduino.prototype.createAccelSensor = function(pin, axis) {
    var sensor;
    sensor = new this.five.Sensor({
      pin: pin,
      freq: 750
    });
    this.board.repl.inject({
      sensor: sensor
    });
    return sensor.scale([0, 100]).on("read", function() {
      return console.log(axis, this.normalized, this.scaled);
    }).on("change", function() {});
  };

  Arduino.prototype.createAccelSensorArm = function(pin, axis) {

    var sensor;
    _this = this;

    sensor = new this.five.Sensor({
      pin: pin,
      freq: 250
    });
    this.board.repl.inject({
      sensor: sensor
    });
    return sensor.scale([0, 100]).on("read", function() {
      return console.log(axis, "args", arguments);
      return console.log("arm", axis, this.normalized, this.scaled);

      data = {};
      data.direction = null
      data[axis] = axis

      if(axis == "x") {

      }

      if(axis == "y") {
        if(this.normalized >= 140) {

        }
      }
      
    });
  };

  Arduino.prototype.createAccelSensorChest = function(pin, axis) {

    var sensor;
    _this = this;

    sensor = new this.five.Sensor({
      pin: pin,
      freq: 250
    });

    this.board.repl.inject({
      sensor: sensor
    });

    return sensor.scale([0, 100]).on("read", function() {
      return console.log("chest", axis, this.normalized, this.scaled);

      data = {};
      data.direction = null
      data[axis] = axis

      if(axis == "x") {

      }

      if(axis == "y") {
        if(this.normalized >= 140) {

        }
      }
      
    });
  };

  Arduino.prototype.createLightSensor = function(pin) {
    var sensor, _this;
    _this = this;
    sensor = new this.five.Sensor({
      pin: pin,
      freq: 250
    });
    this.board.repl.inject({
      sensor: sensor
    });
    return sensor.scale([0, 100]).on("read", function() {
      console.log("light", this.normalized, this.scaled);
      if (this.normalized < 50) {
        return _this.emit("nodebot", {light: 0});
      } else {
        return _this.emit("nodebot", {light: 1});
      }
    }).on("change", function() {});
  };

  Arduino.prototype.start = function() {
    var _this = this;
    this.five = require("johnny-five");
    this.board = new this.five.Board();
    return this.board.on("ready", function() {
      _this.setupArm();
      //return _this.createLightSensor("I5");
    });
  };

  Arduino.prototype.setupArm = function() {
    this.createAccelSensorChest("I0", "upper X");
    this.createAccelSensorChest("I1", "upper Y");

    this.createAccelSensorChest("I3", "lower X");
    this.createAccelSensorChest("I4", "lower Y");
  };

  return Arduino;

})(Emitter);
