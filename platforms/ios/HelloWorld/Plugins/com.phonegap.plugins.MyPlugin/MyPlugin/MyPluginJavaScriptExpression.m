#import "MyPluginJavaScriptExpression.h"

@implementation MyPluginJavaScriptExpression

+(NSString *) jsExpressionForNotification:(NSNotification *) notification andCallback:(NSString *) callback {
  MyPluginJavaScriptExpression *expression = [[MyPluginJavaScriptExpression alloc] 
                                              initWithNotification: notification
                                              andCallback:callback];
  return [expression jsExpression];
}

+(NSString *) javascriptForGeLoBeacon:(GeLoBeacon *)beacon {
    MyPluginJavaScriptExpression *expression = [[MyPluginJavaScriptExpression alloc]
                                                initWithGeLoBeacon:beacon];
    return [expression javascriptForBeacon:beacon];
}

+(NSString *) javascriptForGeLoBeaconArray:(NSArray *)beacons {
    MyPluginJavaScriptExpression *expression = [[MyPluginJavaScriptExpression alloc]
                                                initWithGeLoBeaconArray:beacons];

    return [expression javascriptForBeaconArray];
}

-(id) initWithNotification:(NSNotification *) notification andCallback:(NSString *) callback {
  self = [super init];
  if(self){
    _notification = notification;
    _callback     = callback;
  }
  return self;
}

-(id) initWithGeLoBeacon:(GeLoBeacon *) beacon {
    self = [super init];
    if(self){
        _beacon = beacon;
    }
    return self;
}

-(id) initWithGeLoBeaconArray:(NSArray *) beaconArray {
    self = [super init];
    if(self){
        _beaconArray = beaconArray;
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

-(NSString *) onGeLoScanningStarted{
    return [self buildBeaconlessJSExpression];
}

-(NSString *) onGeLoScanningStopped {
    return [self buildBeaconlessJSExpression];
}

-(NSString *) javascriptForBeacon:(GeLoBeacon *)beacon {
    NSError *error;
    NSData *json = [NSJSONSerialization dataWithJSONObject:[beacon dictionary] options:NSJSONWritingPrettyPrinted error:&error];

    if(error){
        [NSException raise:@"JSONSerializationError" format:@"Error serializing JSON for %@. Error was: %@", beacon.class, error];
    }

    NSString *beaconJSON = [[NSString alloc] initWithData:json encoding:NSUTF8StringEncoding];

    return beaconJSON;
}

-(NSString *) javascriptForBeaconArray {
    NSString *jsBeacons = [NSString stringWithFormat:@"["];

    for (int i = 0; i < [_beaconArray count]; i++) {
        GeLoBeacon *beacon = _beaconArray[i];
        NSString *beaconJSON = [self javascriptForBeacon:beacon];

        if (i == [_beaconArray count] - 1) {
            beaconJSON = [beaconJSON stringByAppendingString:@"]"];
        }else{
            beaconJSON = [beaconJSON stringByAppendingString:@", "];
        }

        jsBeacons = [jsBeacons stringByAppendingString:beaconJSON];
    }

    return jsBeacons;
}

# pragma mark Private Helpers

- (NSString *) buildBeaconlessJSExpression {
    NSString *jsExpression = [NSString stringWithFormat:@"%@();", self.callback];
    return jsExpression;
}

- (NSString *) buildBeaconJSExpression {
    _beacon = self.notification.userInfo[@"beacon"];
    
    if(!_beacon){
      [NSException raise:@"MissingBeacon" format:@"Expected beacon in NSNotification but found none."];
    }

    NSString *beaconJSON = [self javascriptForBeacon:_beacon];
    NSString *expression = [NSString stringWithFormat:@"%@(new MyPlugin.GeLoBeacon(%@));", self.callback, beaconJSON];

    return expression;
}

@end