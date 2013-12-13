#import <Foundation/Foundation.h>
#import <Cordova/CDV.h>
#import <Cordova/CDVPlugin.h>

@interface MyPlugin : CDVPlugin
{

}

-(void)retrieveGreeting:(CDVInvokedUrlCommand*)command;

@end
