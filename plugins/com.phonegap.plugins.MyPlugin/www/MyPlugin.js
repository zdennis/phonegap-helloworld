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
    GeLoBTLEUnsupported: "GeLoBTLEUnsupported",
    GeLoScanningStarted: "GeLoScanningStarted",
    GeLoScanningStopped: "GeLoScanningStopped"
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
        var jsonObj = $.parseJSON(message);
        callback(jsonObj);
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
  },

  isScanning: function(callback){
    return cordova.exec(
      function(message){
        var jsonObj = $.parseJSON(message);
        callback(jsonObj);
      },
      function(){
        console.log("Fail");
      },
      "MyPlugin",
      "isScanning",
      []
    );
  },

  setDefaultTimeToLive: function(arg){
    return cordova.exec(
      function(message){},
      function(){
        console.log("Fail");
      },
      "MyPlugin",
      "setDefaultTimeToLive",
      [arg]
    );
  },

  setDefaultFalloff: function(arg){
    return cordova.exec(
      function(message){},
      function(){
        console.log("Fail");
      },
      "MyPlugin",
      "setDefaultFalloff",
      [arg]
    );
  },

  setDefaultSignalCeiling: function(arg){
    return cordova.exec(
      function(message){},
      function(){
        console.log("Fail");
      },
      "MyPlugin",
      "setDefaultSignalCeiling",
      [arg]
    );
  },

  knownBeacons: function(callback){
    return cordova.exec(
      function(beacons){
        var jsonObj = $.parseJSON(beacons);
        var beaconArray = [];
        $.each(jsonObj, function(idx, beacon) {
          beaconArray.push(new MyPlugin.GeLoBeacon(beacon));
        })
        callback(beaconArray);
      },
      function(){
        callback([]);
      },
      "MyPlugin",
      "knownBeacons",
      []
    );
  },

  nearestBeacon: function(callback){
    return cordova.exec(
      function(beacon){
        var jsonObj = $.parseJSON(beacon);
        callback(new MyPlugin.GeLoBeacon(jsonObj));
      },
      function(){
        callback({});
      },
      "MyPlugin",
      "nearestBeacon",
      []
    );
  },

  unsetNearestBeacon: function(){
    return cordova.exec(
      function(message){},
      function(){
        console.log("Fail");
      },
      "MyPlugin",
      "unsetNearestBeacon",
      []
    );
  }
};

module.exports = MyPlugin;