#import "MyPlugin.h"
#import <GeLoSDK/GeLoSoftwareBeaconManager.h>
#import <GeLoSDK/GeLoSDK.h>


@implementation MyPlugin

-(void)on:(CDVInvokedUrlCommand*)command;
{
    if (!_callbacks)
        _callbacks = [NSMutableDictionary dictionary];

    if (!_constants) {
        NSString *plistPath = [[NSBundle mainBundle] pathForResource:@"constants" ofType:@"plist"];
        _constants = [NSMutableDictionary dictionary];
        _constants = [NSDictionary dictionaryWithContentsOfFile:plistPath];
    }
    
    NSString *arg = [command.arguments objectAtIndex:0];
    NSString *callback = [command.arguments objectAtIndex:1];

    [_callbacks setObject:callback forKey:arg];

    [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(event:) name:arg object:nil];
    [[GeLoBeaconManager sharedInstance] startScanningForBeacons];
}

-(void)event:(NSNotification *)notification {
    NSString *eventName = notification.name;
    NSData *json;

    json = [self getUserinfoJson:notification.userInfo withEventName:eventName];

    if (!json) {
        NSString *callback = [_callbacks objectForKey:notification.name];
        NSString *jsCallBack = [NSString stringWithFormat:@"%@();", callback];
        [self.webView stringByEvaluatingJavaScriptFromString:jsCallBack];
    }else{
        NSString *jsonBeaconString = [[NSString alloc] initWithData:json encoding:NSUTF8StringEncoding];
        NSString *callback = [_callbacks objectForKey:notification.name];
        NSString *jsCallBack = [NSString stringWithFormat:@"%@(new MyPlugin.GeLoBeacon(%@));", callback,jsonBeaconString];
        [self.webView stringByEvaluatingJavaScriptFromString:jsCallBack];
    }
}

-(NSData *)getUserinfoJson:(NSDictionary *)userInfo withEventName:(NSString *)eventName {
    NSString *type;
    NSData *json;
    NSError *error;

    type = [_constants objectForKey:eventName];

    if ([type isEqualToString:@"GeLoBeacon"]) {
        GeLoBeacon *beacon = userInfo[@"beacon"];
        json = [NSJSONSerialization dataWithJSONObject:[beacon dictionary]options:NSJSONWritingPrettyPrinted error:&error];
    }

    return json;
}

@end