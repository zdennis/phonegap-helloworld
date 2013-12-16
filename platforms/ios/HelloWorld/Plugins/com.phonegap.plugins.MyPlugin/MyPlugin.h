#import <Foundation/Foundation.h>
#import <Cordova/CDV.h>
#import <Cordova/CDVPlugin.h>

@interface MyPlugin : CDVPlugin
{
	NSString *callback;
	NSString *callbackId;
}

-(void)retrieveGreeting:(CDVInvokedUrlCommand*)command;
-(void)registerForBeaconFound:(CDVInvokedUrlCommand*)command;

@end
