#import <Foundation/Foundation.h>
#import <GeLoSDK/GeLoSDK.h>

@interface MyPluginJavaScriptExpression : NSObject

@property (readonly) NSNotification *notification;
@property (readonly) NSString *callback;
@property (readonly) GeLoBeacon *beacon;
@property (readonly) NSArray *beaconArray;

+(NSString *) jsExpressionForNotification:(NSNotification *) notification
                              andCallback:(NSString *) callback;
+(NSString *) javascriptForGeLoBeacon:(GeLoBeacon *)beacon;
+(NSString *) javascriptForGeLoBeaconArray:(NSArray *)beacons;

-(id) initWithNotification:(NSNotification *) notification 
      andCallback:(NSString *) callback;
-(id) initWithGeLoBeacon:(GeLoBeacon *) beacon;

-(NSString *) jsExpression;
-(NSString *) javascriptForBeacon:(GeLoBeacon *)beacon;
-(NSString *) javascriptForBeaconArray;

@end
