cordova.define("com.phonegap.plugins.MyPlugin.MyPlugin", function(require, exports, module) {var MyPlugin = {
  retrieveGreeting: function(){
    return cordova.exec(
      function(message){
        alert(message);
      },
      function(){
        alert("FAIL");
      },
      "MyPlugin",
      "retrieveGreeting",
      ["Thomas"]
    )
  }
};

module.exports = MyPlugin;
});
