#import <Foundation/Foundation.h>
#import <Cordova/CDV.h>
#import <Cordova/CDVPlugin.h>

@interface MyPlugin : CDVPlugin

@property (nonatomic) NSMutableDictionary *callbackDictionary;

-(void)on:(CDVInvokedUrlCommand*)command;

@end
