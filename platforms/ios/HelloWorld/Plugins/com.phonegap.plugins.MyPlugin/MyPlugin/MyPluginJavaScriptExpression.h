#import <Foundation/Foundation.h>

@interface MyPluginJavaScriptExpression : NSObject

+(NSString *) jsExpressionForNotification:(NSNotification *) notification
              andCallback:(NSString *) callback;

@property (readonly) NSNotification *notification;
@property (readonly) NSString *callback;

-(id) initWithNotification:(NSNotification *) notification 
      andCallback:(NSString *) callback;

-(NSString *) jsExpression;

@end
