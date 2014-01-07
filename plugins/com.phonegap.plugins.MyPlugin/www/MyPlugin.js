var MyPlugin = {
  Constants: {
    GeLoNearestBeaconExpired: "GeLoNearestBeaconExpired",
    GeLoNearestBeaconChanged: "GeLoNearestBeaconChanged",
    GeLoBeaconExpired: "GeLoBeaconExpired",
    GeLoBeaconFound: "GeLoBeaconFound",
    GeLoBeaconAgedGracefully: "GeLoBeaconAgedGracefully",
    GeLoBTLEStateUnknown: "GeLoBTLEStateUnknown",
    GeLoBTLEPoweredOff: "GeLoBTLEPoweredOff",
    GeLoBTLEPoweredOn: "GeLoBTLEPoweredOn",
    GeLoBTLEUnsupported: "GeLoBTLEUnsupported"
  },

  GeLoBeacon: function(beacon) {
    this.beaconId = beacon.beaconId;
    this.signalStrength = beacon.signalStrength;
    this.receivedRSSI = beacon.receivedRSSI;
    this.timeToLive = beacon.timeToLive;
    this.txPower = beacon.txPower;
  },

  on: function(sdkConstant, callback){
    return cordova.exec(
      function(message){
        console.log("Success");
      },
      function(){
        console.log("Fail");
      },
      "MyPlugin",
      "on",
      [sdkConstant, callback]
    );
  },


    // MyPlugin.startScanning();
    // MyPlugin.stopScanning();

    // MyPlugin.startScanning(3000); //ms to run, then stop?

    // MyPlugin.startScanning(function(){
    //   // do thing
    // }, 3000); //ms to run, then stop?

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
        "MyPlugin",
        "startScanningForBeacons",
        []
      );
      fn();
      return result;
    };

    setTimeout(_startScanning, delayMilliseconds)
  },

  stopScanningForBeacons: function(){
    return cordova.exec(
      function(message){},
      function(){
        console.log("Fail");
      },
      "MyPlugin",
      "stopScanningForBeacons",
      []
    );
  }
};

module.exports = MyPlugin;
