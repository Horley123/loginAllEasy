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
  func getDeviceInfo(_ message: String, resolver: @escaping RCTPromiseResolveBlock, rejecter: @escaping RCTPromiseRejectBlock) {
    do {
      // Get the device info
      let deviceInfo = [
        "model": UIDevice.current.model,
        "name": UIDevice.current.name,
        "iosVersion": UIDevice.current.systemVersion,
      ]
      
      // Return the device info
      resolver(deviceInfo)
      
    } catch let error {
      // If any error occurs, reject the promise with the error
      rejecter("DEVICE_INFO_ERROR", "Failed to get device info", error)
    }
  }
}
