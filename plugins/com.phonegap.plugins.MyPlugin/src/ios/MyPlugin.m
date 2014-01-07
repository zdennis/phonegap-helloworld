#import "MyPlugin.h"
#import "MyPluginJavaScriptExpression.h"
#import <GeLoSDK/GeLoSoftwareBeaconManager.h>
#import <GeLoSDK/GeLoSDK.h>


@implementation MyPlugin

-(void)startScanningForBeacons:(CDVInvokedUrlCommand*)command
{
    [[GeLoBeaconManager sharedInstance] startScanningForBeacons];
}

-(void)stopScanningForBeacons:(CDVInvokedUrlCommand*)command
{
    [[GeLoBeaconManager sharedInstance] stopScanningForBeacons];
}

-(void)on:(CDVInvokedUrlCommand*)command
{
    if (!_callbacks)
        _callbacks = [NSMutableDictionary dictionary];

    NSString *notificationName = [command.arguments objectAtIndex:0];
    NSString *callback = [command.arguments objectAtIndex:1];

    [_callbacks setObject:callback forKey:notificationName];

    [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(event:) name:notificationName object:nil];
}

-(void)event:(NSNotification *)notification {
    NSString *callback = [_callbacks objectForKey:notification.name];
    NSString *jsExpression = [MyPluginJavaScriptExpression jsExpressionForNotification:notification andCallback:callback];

    [self.webView stringByEvaluatingJavaScriptFromString:jsExpression];
}

@end
