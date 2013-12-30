#import "MyPlugin.h"
#import <GeLoSDK/GeLoSoftwareBeaconManager.h>
#import <GeLoSDK/GeLoSDK.h>


@implementation MyPlugin

-(void)on:(CDVInvokedUrlCommand*)command;
{
    if (!_callbackDictionary)
        _callbackDictionary = [NSMutableDictionary dictionary];

    NSString *arg = [command.arguments objectAtIndex:0];
    NSString *callback = [command.arguments objectAtIndex:1];

    [_callbackDictionary setObject:callback forKey:arg];

    [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(event:) name:arg object:nil];
    [[GeLoBeaconManager sharedInstance] startScanningForBeacons];
}

-(void)event:(NSNotification *)notification {
    NSString *eventName = notification.name;
    NSData *beaconJson;
    NSError *error;

    if ([eventName isEqualToString:@"GeLoNearestBeaconChanged"]) {
        GeLoBeacon *beacon = notification.userInfo[@"beacon"];
        beaconJson = [NSJSONSerialization dataWithJSONObject:[beacon dictionary] options:NSJSONWritingPrettyPrinted error:&error];
    }

    if ([eventName isEqualToString:@"GeLoBeaconExpired"]) {
        GeLoBeacon *beacon = notification.userInfo[@"beacon"];
        beaconJson = [NSJSONSerialization dataWithJSONObject:[beacon dictionary]options:NSJSONWritingPrettyPrinted error:&error];
    }

    if (!beaconJson) {
        NSLog(@"%@", error);
    }else{
        NSString *jsonBeaconString = [[NSString alloc] initWithData:beaconJson encoding:NSUTF8StringEncoding];
        NSString *callback = [_callbackDictionary objectForKey:notification.name];
        NSString *jsCallBack = [NSString stringWithFormat:@"%@(%@);", callback,jsonBeaconString];
        [self.webView stringByEvaluatingJavaScriptFromString:jsCallBack];
    }
}

@end