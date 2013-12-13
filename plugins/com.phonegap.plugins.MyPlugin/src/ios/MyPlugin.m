#import "MyPlugin.h"
#import <GeLoSDK/GeLoSoftwareBeaconManager.h>


@implementation MyPlugin

-(void)retrieveGreeting:(CDVInvokedUrlCommand*)command;
{
  CDVPluginResult *pluginResult = nil;
  NSString *arg = [command.arguments objectAtIndex:0];

  NSArray *beacons = [GeLoSoftwareBeaconManager instance].beacons;
  GeLoSoftwareBeacon *beacon = [beacons objectAtIndex: 0];

  NSString *beaconString = [NSString stringWithFormat: @"Beacon %ld", (long) beacon.beaconId];

  pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:[NSString stringWithFormat:@"Hello %@. Your beacon is %@", arg, beaconString]];
  [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}
@end
