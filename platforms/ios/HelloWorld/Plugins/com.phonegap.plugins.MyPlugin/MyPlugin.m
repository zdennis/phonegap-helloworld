#import "MyPlugin.h"
#import <GeLoSDK/GeLoSoftwareBeaconManager.h>
#import <GeLoSDK/GeLoSDK.h>


@implementation MyPlugin

-(void)on:(CDVInvokedUrlCommand*)command;
{
    NSString *arg = [command.arguments objectAtIndex:0];
    callback = [command.arguments objectAtIndex:1];

    [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(nearestBeaconChanged:) name:arg object:nil];
    [[GeLoBeaconManager sharedInstance] startScanningForBeacons];
}

-(void)nearestBeaconChanged:(NSNotification *)notification {
    GeLoBeacon *beacon = notification.userInfo[@"beacon"];
    NSError *error;
    NSData *beaconJson = [NSJSONSerialization dataWithJSONObject:[beacon dictionary] options:NSJSONWritingPrettyPrinted error:&error];
    if (!beaconJson) {
        NSLog(@"%@", error);
    }else{
        NSString *jsonBeaconString = [[NSString alloc] initWithData:beaconJson encoding:NSUTF8StringEncoding];
        NSString *jsCallBack = [NSString stringWithFormat:@"%@(%@);", callback,jsonBeaconString];
        [self.webView stringByEvaluatingJavaScriptFromString:jsCallBack];
    }
}

@end