/**
  Helper method for enforcing expectations about arguments to methods.

  @param {object} argValue The value that will have an expectation made against it.
  @param {string} argName The name of the value to be used in the message of a thrown exception.
  @param {object} options An object literal of options for the expecation. Currently only supports 'type'.
  @access private
*/
var expect = function(argValue, argName, options){
  if(!options || !options.type){
    throw {
      name:        "ArgumentTypeError",
      message:     "Expected options to contain a 'type' property but it didn't.",
      toString:    function(){return this.name + ": " + this.message}
    }
  }

  var actualType = (typeof argValue),
      expectedType = options.type;

  if(actualType !== expectedType){
    throw {
      name:        "ArgumentTypeError",
      message:     "Expected " + argName + " to be a " + expectedType + ", but it was: " + argValue + " ("  + actualType + ")",
      toString:    function(){return this.name + ": " + this.message}
    }
  }
};

/**
  Helper method to make an expectation around an argument being a function.

  @param {object} argValue The value that will have an expectation made against it.
  @param {string} argName The name of the value to be used in the message of a thrown exception.
  @access private
*/
var expectArgIsFunction = function(argValue, argName){
  expect(argValue, argName, { type: (typeof new Function) });
};

/**
  Helper method to make an expectation around an argument being a number.

  @param {object} argValue The value that will have an expectation made against it.
  @param {string} argName The name of the value to be used in the message of a thrown exception.
  @access private
*/
var expectArgIsNumber = function(argValue, argName){
  expect(argValue, argName, { type: (typeof 1) });
};

/** @module GeLoCordovaPlugin */
var exports = {};

/*
  The set of currently supported events recognized by the GeLoBeaconManager.
*/
exports.Events = {
  GeLoNearestBeaconExpired: "GeLoNearestBeaconExpired",
  GeLoNearestBeaconChanged: "GeLoNearestBeaconChanged",
  GeLoBeaconExpired: "GeLoBeaconExpired",
  GeLoBeaconFound: "GeLoBeaconFound",
  GeLoBeaconAgedGracefully: "GeLoBeaconAgedGracefully",
  GeLoBTLEStateUnknown: "GeLoBTLEStateUnknown",
  GeLoBTLEPoweredOff: "GeLoBTLEPoweredOff",
  GeLoBTLEPoweredOn: "GeLoBTLEPoweredOn",
  GeLoBTLEUnsupported: "GeLoBTLEUnsupported",
  GeLoScanningStarted: "GeLoScanningStarted",
  GeLoScanningStopped: "GeLoScanningStopped"
};

/**
  Creates an instance of a GeLoBeacon.
 
  @constructor
  @param {object} beacon Information about a GeLo beacon.
    Expects beacon to have properties: beaconId, signalStrength, receivedRSSI, timeToLive, and txPower.
*/
exports.GeLoBeacon = function(beacon) {
  this.beaconId = beacon.beaconId;
  this.signalStrength = beacon.signalStrength;
  this.receivedRSSI = beacon.receivedRSSI;
  this.timeToLive = beacon.timeToLive;
  this.txPower = beacon.txPower;
};

/**
  Registers for a notification sent by the GeLoBeaconManager. The GeLoBeaconManager communicates beacon events through
    these notifications.

  @param {string} sdkConstant The constant used to register for a notification. Use a constant provided by the plugin.
  @param {function} successCallback Required callback function that gets executed when the registered event fires successfully.
  @param {function} failureCallback Optional callback function that gets executed when the registered event fires unsuccessfully.
*/
exports.on = function(sdkConstant, successCallback, failureCallback){
  failureCallback = failureCallback || function(){};

  expectArgIsFunction(successCallback, "successCallback");
  expectArgIsFunction(failureCallback, "failureCallback");

  return cordova.exec(
    function(message){
      var jsonObj = $.parseJSON(message);
      successCallback(jsonObj);
    },
    function(){
      failureCallback.apply(this, arguments);
    },
    "GeLoCordovaPlugin",
    "on",
    [sdkConstant, successCallback]
  );
};

/**
  Notifies the beacon manager to start scanning for beacons. If you are interested in knowing when
  scanning has actually started then listen for the GeLoScanningStarted event.

  @param {number} delayInMilliseconds An optional argument. If an arguement is given it will be the
    number of milliseconds to delay before starting the scan.
*/
exports.startScanningForBeacons = function(delayInMilliseconds){
  if(!delayInMilliseconds) delayInMilliseconds = 0;

  expectArgIsNumber(delayInMilliseconds, "delayInMilliseconds");

  var _startScanning = function(){
    var result = cordova.exec(
      function(message){},
      function(){
        console.log("Fail");
      },
      "GeLoCordovaPlugin",
      "startScanningForBeacons",
      []
    );
    return result;
  };

  setTimeout(_startScanning, delayInMilliseconds);
};

/**
  Notifies the beacon manager to stop scanning for beacons. If you are interested in knowing when
  scanning has actually stopped then listen for the GeLoScanningStopped event.
*/
exports.stopScanningForBeacons = function(){
  return cordova.exec(
    function(message){},
    function(){
      console.log("Fail");
    },
    "GeLoCordovaPlugin",
    "stopScanningForBeacons",
    []
  );
};

/**
  Returns whether the beacon manager is currently scanning.

  @callback callback
  @returns {boolean} Scanning status.
*/
exports.isScanning = function(callback){
  expectArgIsFunction(callback, "callback");

  return cordova.exec(
    function(message){
      var jsonObj = $.parseJSON(message);
      callback(jsonObj);
    },
    function(){
      console.log("Fail");
    },
    "GeLoCordovaPlugin",
    "isScanning",
    []
  );
};

/**
  Sets the time limit for the beacon manager to maintain a reference to a known beacon. If the beacon
  hasn't been seen in the given number of seconds then the beacon manager will expire the beacon
  and will forget about it. If you are interested in this event listen for the GeLoBeaconExpired event.

  @param {number} seconds The time in seconds that the timer starts at.
*/
exports.setDefaultTimeToLive = function(seconds){
  expectArgIsNumber(seconds, "seconds");

  return cordova.exec(
    function(message){},
    function(){
      console.log("Fail");
    },
    "GeLoCordovaPlugin",
    "setDefaultTimeToLive",
    [seconds]
  );
};


/**
  Sets the minimum signal strength threshold for beacon recognition. If a beacon's signal is weaker than
  this then the beacon manager will pretend to not have seen it.

  @param {number} signalStrength The signal strength of a beacon. The value must be negative, and within a range
    of -60 to -100 RSSI. The closer the value is to 0, the stronger the expected signal strength.
*/
exports.setDefaultFalloff = function(signalStrength){
  expectArgIsNumber(signalStrength, "signalStrength");

  return cordova.exec(
    function(message){},
    function(){
      console.log("Fail");
    },
    "GeLoCordovaPlugin",
    "setDefaultFalloff",
    [signalStrength]
  );
};

/**
  Sets the maximum signal strength threshold for beacon recognition.

  @param {number} signalStrength The signal strength of a beacon. The value must be negative, and within a range
    of -60 to -100 RSSI. The closer the value is to 0, the stronger the expected signal strength.
*/
exports.setDefaultSignalCeiling = function(signalStrength){
  expectArgIsNumber(signalStrength, "signalStrength");

  return cordova.exec(
    function(message){},
    function(){
      console.log("Fail");
    },
    "GeLoCordovaPlugin",
    "setDefaultSignalCeiling",
    [signalStrength]
  );
};

/**
  Retrieves the current list of known beacons.

  @callback callback
  @returns {array} An array that contains GeLoBeacon objects recorded by the beacon manager.
*/
exports.knownBeacons = function(callback){
  expectArgIsFunction(callback, "callback");

  return cordova.exec(
    function(beacons){
      var jsonObj = $.parseJSON(beacons),
          beaconArray = [];
      $.each(jsonObj, function(idx, beacon) {
        beaconArray.push(new exports.GeLoBeacon(beacon));
      })
      callback(beaconArray);
    },
    function(){
      callback([]);
    },
    "GeLoCordovaPlugin",
    "knownBeacons",
    []
  );
};

/**
  Retrieves the current nearest beacon. If you are interested in being notified of
  when the nearest beacon changes then listen for the GeLoNearestBeaconChanged event.

  @callback callback
  @returns {object} The nearest GeLoBeacon.
*/
exports.nearestBeacon = function(callback){
  expectArgIsFunction(callback, "callback");

  return cordova.exec(
    function(beacon){
      var jsonObj = $.parseJSON(beacon);
      callback(new exports.GeLoBeacon(jsonObj));
    },
    function(){
      callback({});
    },
    "GeLoCordovaPlugin",
    "nearestBeacon",
    []
  );
};

/**
  Unsets the nearest beacon so that the beacon manager is forced to find the nearest beacon again.
*/
exports.unsetNearestBeacon = function(){
  return cordova.exec(
    function(message){},
    function(){
      console.log("Fail");
    },
    "GeLoCordovaPlugin",
    "unsetNearestBeacon",
    []
  );
};

module.exports = exports;
