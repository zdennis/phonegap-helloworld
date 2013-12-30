#import <Foundation/Foundation.h>
#import <Cordova/CDV.h>
#import <Cordova/CDVPlugin.h>

@interface MyPlugin : CDVPlugin

@property (nonatomic) NSMutableDictionary *callbacks;
@property (nonatomic) NSMutableDictionary *constants;

-(void)on:(CDVInvokedUrlCommand*)command;

@end
