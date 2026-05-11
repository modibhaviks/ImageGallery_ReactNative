import Foundation
import UIKit
import React

@objc(DeviceDetails)
class DeviceDetails: NSObject {

  @objc
  func getDeviceInfo(
    _ resolve: @escaping RCTPromiseResolveBlock,
    rejecter reject: @escaping RCTPromiseRejectBlock
  ) {

    let deviceInfo: [String: Any] = [
      "name": UIDevice.current.name,
      "model": UIDevice.current.model,
      "systemName": UIDevice.current.systemName,
      "systemVersion": UIDevice.current.systemVersion
    ]

    resolve(deviceInfo)
  }

  @objc
  static func requiresMainQueueSetup() -> Bool {
    return false
  }
}
