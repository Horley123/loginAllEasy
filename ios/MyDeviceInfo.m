// MyDeviceInfo.m
#import <Foundation/Foundation.h>
#import "React/RCTBridgeModule.h"
#import "React/RCTEventEmitter.h"

@interface RCT_EXTERN_MODULE(MyDeviceInfo, RCTEventEmitter)

RCT_EXTERN_METHOD(getDeviceInfo:(RCTPromiseResolveBlock)resolver
                  rejecter:(RCTPromiseRejectBlock)rejecter)

@end
