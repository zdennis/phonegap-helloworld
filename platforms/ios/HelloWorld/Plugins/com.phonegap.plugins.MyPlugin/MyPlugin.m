#import "MyPlugin.h"


@implementation MyPlugin

-(void)retrieveGreeting:(CDVInvokedUrlCommand*)command;
{
  CDVPluginResult *pluginResult = nil;
  NSString *arg = [command.arguments objectAtIndex:0];
  
  
  pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:[NSString stringWithFormat:@"Hello %@", arg]];
  [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}
@end
