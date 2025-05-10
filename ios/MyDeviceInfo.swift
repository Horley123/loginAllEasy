//
//  MyDeviceInfo.swift
//  loguinAllEasy
//
//  Created by Horley Leitão Monteiro on 09/05/25.
//

import Foundation
import React

@objc(MyDeviceInfo)
class MyDeviceInfo: NSObject {
  
  @objc
  func getDeviceInfo(_ resolver: @escaping RCTPromiseResolveBlock, rejecter: @escaping RCTPromiseRejectBlock) {
    do {
  
      let deviceInfo = [
        "model": UIDevice.current.model,
        "name": UIDevice.current.name,
        "iosVersion": UIDevice.current.systemVersion,
      ]
      
     
      resolver(deviceInfo)
      
    } catch let error {

      rejecter("DEVICE_INFO_ERROR", "Failed to get device info", error)
    }
  }
}
