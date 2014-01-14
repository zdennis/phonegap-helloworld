var GeLoCordovaPlugin = {
  /*
    The set of currently supported constants recognized by the GeLoBeaconManager.
  */
  Constants: {
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
  },

  /*
    Creates an instance of a GeLoBeacon.

    @constructor
    @param {object} beacon Information about a GeLo beacon.
    @param {number} beacon.beaconId The id of a beacon.
    @param {number} beacon.signalStrength The signal strength used to dermine nearest beacon.
    @param {number} beacon.receievedRSSI The RSSI of a beacon.
    @param {number} beacon.timeToLive The current time before the beacon reference is destoyed if a new signal is not received.
    @param {number} beacon.txPower The transmission power of a beacon. 2: High 1: Medium 0: Low
  */
  GeLoBeacon: function(beacon) {
    this.beaconId = beacon.beaconId;
    this.signalStrength = beacon.signalStrength;
    this.receivedRSSI = beacon.receivedRSSI;
    this.timeToLive = beacon.timeToLive;
    this.txPower = beacon.txPower;
  },

  /*
    Registers for a notification sent by the GeLoBeaconManager

    @callback callback
    @param {string} sdkConstant The constant used to register for a notification. Use a constant provided by the plugin.
  */
  on: function(sdkConstant, callback){
    return cordova.exec(
      function(message){
        var jsonObj = $.parseJSON(message);
        callback(jsonObj);
      },
      function(){
        console.log("Fail");
      },
      "GeLoCordovaPlugin",
      "on",
      [sdkConstant, callback]
    );
  },

  /*
    Notifies the beacon manager to start scanning for beacons.

    @param {array} args An array of optional arguements. A single argument will signify a period to scan for.
      If a second arguement is supplied, it's expected to be a function that's called after the scanning period.
  */
  startScanningForBeacons: function(args){
    var delayMilliseconds = 0,
        fn = function(){};

    if(arguments.length === 1 && (typeof arguments[0] === "Number")){
      delayMilliseconds = arguments[0];
    } else if(arguments.length === 2){
      if(typeof argumenst[0] === "Function"){
        fn = arguments[0];
      }

      if(typeof arguments[1] === "Number"){
        delayMilliseconds = arguments[1];
      }
    }

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
      fn();
      return result;
    };

    setTimeout(_startScanning, delayMilliseconds)
  },

  /*
    Notifies the beacon manager to stop scanning for beacons.
  */
  stopScanningForBeacons: function(){
    return cordova.exec(
      function(message){},
      function(){
        console.log("Fail");
      },
      "GeLoCordovaPlugin",
      "stopScanningForBeacons",
      []
    );
  },

  /*
    Returns whether the beacon manager is currently scanning.

    @callback callback
    @returns {boolean} Scanning status.
  */
  isScanning: function(callback){
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
  },

  /*
    Sets the time limit for the beacon manager to maintain a reference to a known beacon.

    @param {number} arg The time in seconds that the timer starts at.
  */
  setDefaultTimeToLive: function(arg){
    return cordova.exec(
      function(message){},
      function(){
        console.log("Fail");
      },
      "GeLoCordovaPlugin",
      "setDefaultTimeToLive",
      [arg]
    );
  },


  /*
    Sets the minimum signal strength threshold for beacon recognition.

    @param {number} arg The signal strength, values are negative and the closer to zero the stronger the signal strenth.
  */
  setDefaultFalloff: function(arg){
    return cordova.exec(
      function(message){},
      function(){
        console.log("Fail");
      },
      "GeLoCordovaPlugin",
      "setDefaultFalloff",
      [arg]
    );
  },

  /*
    Sets the maximum signal strength threshold for beacon recognition.

    @param {number} arg The signal strengh, values are negative and the closer to zero the stronger the signal strength.
  */
  setDefaultSignalCeiling: function(arg){
    return cordova.exec(
      function(message){},
      function(){
        console.log("Fail");
      },
      "GeLoCordovaPlugin",
      "setDefaultSignalCeiling",
      [arg]
    );
  },

  /*
    Retrieves the current list of known beacons.

    @callback callback
    @returns {array} An array that contains GeLoBeacon objects recorded by the beacon manager.
  */
  knownBeacons: function(callback){
    return cordova.exec(
      function(beacons){
        var jsonObj = $.parseJSON(beacons);
        var beaconArray = [];
        $.each(jsonObj, function(idx, beacon) {
          beaconArray.push(new GeLoCordovaPlugin.GeLoBeacon(beacon));
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
  },

  /*
    Retrieves the current nearest beacon.

    @callback callback
    @returns {object} The nearest GeLoBeacon.
  */
  nearestBeacon: function(callback){
    return cordova.exec(
      function(beacon){
        var jsonObj = $.parseJSON(beacon);
        callback(new GeLoCordovaPlugin.GeLoBeacon(jsonObj));
      },
      function(){
        callback({});
      },
      "GeLoCordovaPlugin",
      "nearestBeacon",
      []
    );
  },

  /*
    Unsets the nearest beacon so that the beacon manager is forced to find the nearest beacon again.
  */
  unsetNearestBeacon: function(){
    return cordova.exec(
      function(message){},
      function(){
        console.log("Fail");
      },
      "GeLoCordovaPlugin",
      "unsetNearestBeacon",
      []
    );
  }
};

module.exports = GeLoCordovaPlugin;