#import "MyPlugin.h"
#import <GeLoSDK/GeLoSoftwareBeaconManager.h>
#import <GeLoSDK/GeLoSDK.h>


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

-(void)registerForBeaconFound:(CDVInvokedUrlCommand*)command;
{
	CDVPluginResult *pluginResult = nil;
	callbackId = command.callbackId;
	callback = @"onBeaconFound";
	[[NSNotificationCenter defaultCenter]addObserver:self selector:@selector(foundBeacon:) name:kGeLoBeaconFound object:nil];

	[[GeLoBeaconManager sharedInstance] startScanningForBeacons];
}

-(void)foundBeacon:(NSNotification*)sender {
	NSLog(@"BEACON FOUND");
	NSString *jsCallBack = [NSString stringWithFormat:@"%@();", callback];
	[self.webView stringByEvaluatingJavaScriptFromString:jsCallBack];
}

@end