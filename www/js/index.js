/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

var Map = function(){
  var body = $(window),
      width = body.width(),
      height = body.height();

  this.nearestBeacon = {};
  this.beacons = [];

  var mapElement = $('#map');
  this.el = mapElement;
  this.el.width(width);
  this.el.height(height);

  _.forEach(this.things(), function(datas){
    var relativeX = datas[0],
        relativeY = datas[1],
        beaconId  = datas[2];
    var el = $("<div class='thing' data-beacon-id='" + beaconId + "'></div>");
    elWidth = 30;
    elHeight = 30;
    el.css({
      position: "absolute",
      width: elWidth + "px",
      height: elHeight +"px",
      backgroundColor: "blue",
      top: (relativeY * height) - (elHeight / 2.0),
      left: (relativeX * width) - (elWidth / 2.0)
    });
    mapElement.append(el);
  });
  return this;
};

Map.prototype.onGeLoNearestBeaconChanged = function(beacon){
  if (this.nearestBeacon !== {}) {
    if (beacon.beaconId !== this.nearestBeacon.beaconId) {
      $("[data-beacon-id='" + this.nearestBeacon.beaconId + "']").removeClass("noBlink");

      for (var i = 0; i < this.beacons.length; i++) {
        if (this.beacons[i].beaconId === this.nearestBeacon.beaconId) {
          $("[data-beacon-id='" + this.nearestBeacon.beaconId + "']").addClass("blink");
          break;
        }
      }

      $("[data-beacon-id='" + beacon.beaconId + "']").removeClass("blink");
      $("[data-beacon-id='" + beacon.beaconId + "']").addClass("noBlink");
      this.nearestBeacon = beacon;
    }
  }else {
    $("[data-beacon-id='" + beacon.beaconId + "']").removeClass("blink");
    $("[data-beacon-id='" + beacon.beaconId + "']").addClass("noBlink");
    this.nearestBeacon = beacon;
  }
};

Map.prototype.onGeLoBeaconFound = function(beacon){
  var found;
  for (var i = 0; i < this.beacons.length; i++) {
    if (this.beacons[i].beaconId === beacon.beaconId) {
      found = true;
      break;
    }
  }

  if (beacon.beaconId !== this.nearestBeacon.beaconId){
    $("[data-beacon-id='" + beacon.beaconId + "']").addClass("blink");
  }

  if (found !== true){
    this.beacons.push(beacon);
  }
};

Map.prototype.onGeLoBeaconExpired = function(beacon){
  var index;

  for (var i = 0; i < this.beacons.length; i++) {
    if (this.beacons[i].beaconId === beacon.beaconId) {
      index = i;
      break;
    }
  }

  if (index !== undefined) {
    this.beacons.splice(index, 1);
  }

  $("[data-beacon-id='" + beacon.beaconId + "']").removeClass("noBlink");
  $("[data-beacon-id='" + beacon.beaconId + "']").removeClass("blink");
};

Map.prototype.onGeLoScanningStarted = function(){
  alert("Scanning Started");
}

Map.prototype.things = function(){
  return [
    // relativeX          relativeY             beaconId
    [0.8844953173777316,  0.2954898911353033,   1], // Start
    [0.1841831425598335,  0.24883359253499224,  2], // Heart
    [0.3850156087408949,  0.1368584758942457,   3], // Clover
    [0.6170655567117586,  0.20217729393468117,  4], // Skunk
    [0.3610822060353798,  0.35303265940902023,  5], // Duck
    [0.5962539021852237,  0.4276827371695179,   6], // Football
    [0.7148803329864725,  0.46500777604976673,  7], // Apple
    [0.21123829344432882, 0.49144634525660963,  8], // Snowflake
    [0.4599375650364204,  0.6003110419906688,   9], // Pumpkin
    [0.10926118626430802, 0.687402799377916,   10], // Ladybug
    [0.32049947970863685, 0.6920684292379471,  11], // Leaf
    [0.5359001040582726,  0.7107309486780715,  12], // Bumble
    [0.6992715920915713,  0.7076205287713841,  243], // Star
    [0.8616024973985432,  0.5940902021772939,  259], // Sun
    [0.6555671175858481,  0.8709175738724728,  354]  // Treasure
  ];
};


var app = {
  // Application Constructor

  initialize: function() {
    this.bindEvents();
  },
  // Bind Event Listeners
  //
  // Bind any events that are required on startup. Common events are:
  // 'load', 'deviceready', 'offline', and 'online'.
  bindEvents: function() {
    document.addEventListener('deviceready', app.onDeviceReady, false);
  },

  onDeviceReady: function(){
    window.map = new Map();

    var K = MyPlugin.Constants;

    // window.map.onGeLoNearestBeaconChanged(new MyPlugin.Beacon(beaconData));
    MyPlugin.on(K.GeLoNearestBeaconChanged, "window.map.onGeLoNearestBeaconChanged");
    MyPlugin.on(K.GeLoBeaconFound, "window.map.onGeLoBeaconFound");
    MyPlugin.on(K.GeLoBeaconExpired, "window.map.onGeLoBeaconExpired");
    MyPlugin.on(K.GeLoScanningStarted, "window.map.onGeLoScanningStarted");


    $("button").on("click", function(){
      var el = $(this);
      if($(el).hasClass("started")){
        MyPlugin.stopScanningForBeacons();
        $(el).removeClass("started");
        $(el).addClass("stopped").html("Start");
      } else {
        $(el).removeClass("stopped").html("Stop");
        $(el).addClass("started");
        MyPlugin.startScanningForBeacons();
      }
    });
  }
};