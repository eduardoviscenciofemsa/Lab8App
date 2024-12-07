//
//  EventEmitterModule.m
//  Lab8App
//
//  Created by Jesus Eduardo Oliva Viscencio on 06/12/24.
//

#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(EventEmitterModule, NSObject)

RCT_EXTERN_METHOD(sendEventToJavaScript)

@end
