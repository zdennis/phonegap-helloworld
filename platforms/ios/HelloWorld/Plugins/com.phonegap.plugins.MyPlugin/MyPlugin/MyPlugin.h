#import <Foundation/Foundation.h>
#import <Cordova/CDV.h>
#import <Cordova/CDVPlugin.h>

@interface MyPlugin : CDVPlugin

@property (nonatomic) NSMutableDictionary *callbacks;

-(void)on:(CDVInvokedUrlCommand*)command;

@end
