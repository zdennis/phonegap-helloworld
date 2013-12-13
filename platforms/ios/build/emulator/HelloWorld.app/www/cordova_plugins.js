cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/com.phonegap.plugins.MyPlugin/www/MyPlugin.js",
        "id": "com.phonegap.plugins.MyPlugin.MyPlugin",
        "clobbers": [
            "MyPlugin"
        ]
    }
]
});