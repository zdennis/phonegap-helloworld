#import "MyPlugin.h"
#import "MyPluginJavaScriptExpression.h"
#import <GeLoSDK/GeLoSDK.h>


@implementation MyPlugin

-(void)startScanningForBeacons:(CDVInvokedUrlCommand*)command {
    [[GeLoBeaconManager sharedInstance] startScanningForBeacons];
}

-(void)stopScanningForBeacons:(CDVInvokedUrlCommand*)command {
    [[GeLoBeaconManager sharedInstance] stopScanningForBeacons];
}

-(void)isScanning:(CDVInvokedUrlCommand*)command {
    NSString *jsResult = nil;
    CDVPluginResult *result = nil;
    BOOL scanningStatus = [[GeLoBeaconManager sharedInstance] isScanning];
    result = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsBool:scanningStatus];
    jsResult = [result toSuccessCallbackString:command.callbackId];

    [self writeJavascript:jsResult];
}

-(void)setDefaultTimeToLive:(CDVInvokedUrlCommand*)command {
    NSNumber *ttl = [command.arguments objectAtIndex:0];
    [[GeLoBeaconManager sharedInstance] setDefaultTimeToLive:[ttl integerValue]];
}

-(void)setDefaultFalloff:(CDVInvokedUrlCommand*)command {
    NSNumber *falloff = [command.arguments objectAtIndex:0];
    [[GeLoBeaconManager sharedInstance] setDefaultFalloff:[falloff integerValue]];
}

-(void)setDefaultSignalCeiling:(CDVInvokedUrlCommand*)command {
    NSNumber *signalCeiling = [command.arguments objectAtIndex:0];
    [[GeLoBeaconManager sharedInstance] setDefaultSignalCeiling:[signalCeiling integerValue]];
}

-(void)knownBeacons:(CDVInvokedUrlCommand*)command {
    NSString *jsResult = nil;
    CDVPluginResult *result = nil;
    NSArray *beacons = [[GeLoBeaconManager sharedInstance] knownBeacons];

    if ([beacons count]) {
        NSString *jsonArray = [MyPluginJavaScriptExpression javascriptForGeLoBeaconArray:beacons];
        result = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:jsonArray];
        jsResult = [result toSuccessCallbackString:command.callbackId];
    }else{
        result = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR];
        jsResult = [result toErrorCallbackString:command.callbackId];
    }

    [self writeJavascript:jsResult];
}

-(void)nearestBeacon:(CDVInvokedUrlCommand*)command {
    NSString *jsResult = nil;
    CDVPluginResult *result = nil;

    GeLoBeacon *beacon = [[GeLoBeaconManager sharedInstance] nearestBeacon];
    if (beacon) {
        NSString *jsObject = [MyPluginJavaScriptExpression javascriptForGeLoBeacon:beacon];
        result = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:jsObject];
        jsResult = [result toSuccessCallbackString:command.callbackId];
    }else{
        result = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR];
        jsResult = [result toErrorCallbackString:command.callbackId];
    }

    [self writeJavascript:jsResult];
}


-(void)unsetNearestBeacon:(CDVInvokedUrlCommand*)command {
    [[GeLoBeaconManager sharedInstance] unsetNearestBeacon];
}

-(void)on:(CDVInvokedUrlCommand*)command {
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