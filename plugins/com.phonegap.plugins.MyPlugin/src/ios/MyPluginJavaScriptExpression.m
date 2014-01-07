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

# pragma mark Private Helpers

-(NSString *) onGeLoBeaconFound {
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

-(NSString *) onGeLoNearestBeaconChanged {
  return @"";
}


-(NSString *) onGeLoBeaconExpired {
  return @"";
}

    // MyPlugin.on(K.GeLoNearestBeaconChanged, "window.map.onGeLoNearestBeaconChanged");
    // MyPlugin.on(K.GeLoBeaconFound, "window.map.onGeLoBeaconFound");
    // MyPlugin.on(K.GeLoBeaconExpired, "window.map.onGeLoBeaconExpired");

  // <key>GeLoBeaconExpired</key>
  // <string>GeLoBeacon</string>
  // <key>GeLoNearestBeaconChanged</key>
  // <string>GeLoBeacon</string>
  // <key>GeLoNearestBeaconExpired</key>
  // <string>GeLoBeacon</string>
  // <key>GeLoBeaconAgedGracefully</key>
  // <string>nil</string>
  // <key>GeLoBTLEPoweredOn</key>
  // <string>nil</string>
  // <key>GeLoBTLEPoweredOff</key>
  // <string>nil</string>
  // <key>GeLoBTLEStateUnknown</key>
  // <string>nil</string>


    // GeLoNearestBeaconExpired: "GeLoNearestBeaconExpired",
    // GeLoNearestBeaconChanged: "GeLoNearestBeaconChanged",
    // GeLoBeaconExpired: "GeLoBeaconExpired",

    // GeLoBeaconAgedGracefully: "GeLoBeaconAgedGracefully",
    // GeLoBTLEStateUnknown: "GeLoBTLEStateUnknown",
    // GeLoBTLEPoweredOff: "GeLoBTLEPoweredOff",
    // GeLoBTLEPoweredOn: "GeLoBTLEPoweredOn",
    // GeLoBTLEUnsupported: "GeLoBTLEUnsupported"





@end
