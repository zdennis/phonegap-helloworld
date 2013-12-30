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
    )
  }
};

module.exports = MyPlugin;
