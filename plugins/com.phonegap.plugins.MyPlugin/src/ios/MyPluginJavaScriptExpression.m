#import "MyPluginJavaScriptExpression.h"
#import <GeLoSDK/GeLoSDK.h>

@implementation MyPluginJavaScriptExpression

+(NSString *) jsExpressionForNotification:(NSNotification *) notification andCallback:(NSString *) callback {
  MyPluginJavaScriptExpression *expression = [[MyPluginJavaScriptExpression alloc] 
      initWithNotification: notification 
      andCallback:callback];
  return [expression jsExpression];
}

-(id) initWithNotification:(NSNotification *) notification andCallback:(NSString *) callback {
  self = [super init];
  if(self){
    _notification = notification;
    _callback     = callback;
  }
  return self;
}

-(NSString *) jsExpression {
  NSString *eventName = self.notification.name;
  NSString *eventHandlerAsString = [NSString stringWithFormat: @"on%@", eventName];
  SEL eventHandler = NSSelectorFromString(eventHandlerAsString);

  if(![self respondsToSelector: eventHandler]){
    [NSException raise:@"UnknownNotificationOrEvent" format:@"%@ tried to call unknown event handler %@", self.class, eventHandlerAsString];
  }

  NSString *expression = [self performSelector: eventHandler];
  return expression;
}

# pragma mark Private Supported GeLo Notifications

-(NSString *) onGeLoBeaconFound {
    return [self buildBeaconJSExpression];
}

-(NSString *) onGeLoBeaconExpired {
  return [self buildBeaconJSExpression];
}

-(NSString *) onGeLoNearestBeaconChanged {
    return [self buildBeaconJSExpression];
}

-(NSString *) onGeLoNearestBeaconExpired {
  return [self buildBeaconJSExpression];
}

-(NSString *) onGeLoBeaconAgedGracefully {
  return [self buildBeaconlessJSExpression];
}

-(NSString *) onGeLoBTLEPoweredOn {
  return [self buildBeaconlessJSExpression];
}

-(NSString *) onGeLoBTLEPoweredOff {
  return [self buildBeaconlessJSExpression];
}

-(NSString *) onGeLoBTLEStateUnknown {
  return [self buildBeaconlessJSExpression];
}


# pragma mark Private Helpers

- (NSString *) buildBeaconlessJSExpression {
  NSString *jsExpression = [NSString stringWithFormat:@"%@();", self.callback];
  return jsExpression;
}

- (NSString *) buildBeaconJSExpression {
  GeLoBeacon *beacon = self.notification.userInfo[@"beacon"];
  if(!beacon){
    [NSException raise:@"MissingBeacon" format:@"Expected beacon in NSNotification but found none."];
  }

  NSError *error;
  NSData *json = [NSJSONSerialization dataWithJSONObject:beacon.dictionary options:NSJSONWritingPrettyPrinted error:&error];

  if(error){
    [NSException raise:@"JSONSerializationError" format:@"Error serializing JSON for %@. Error was: %@", beacon.class, error];
  }

  NSString *beaconJSON = [[NSString alloc] initWithData:json encoding:NSUTF8StringEncoding];
  NSString *expression = [NSString stringWithFormat:@"%@(new MyPlugin.GeLoBeacon(%@));", self.callback, beaconJSON];

  return expression;
}

@end
