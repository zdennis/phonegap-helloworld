var MyPlugin = {
  Constants: {
    GeLoNearestBeaconChanged: "GeLoNearestBeaconChanged",
    GeLoBeaconExpired: "GeLoBeaconExpired"
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
