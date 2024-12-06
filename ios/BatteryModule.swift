//
//  BatteryModule.swift
//  Lab8App
//
//  Created by Jesus Eduardo Oliva Viscencio on 05/12/24.
//

import Foundation
import React

@objc(BatteryModule)
class BatteryModule: NSObject {
    override init() {
        super.init()
        print("BatteryModule initialized")
    }
  
    @objc
    static func requiresMainQueueSetup() -> Bool {
        return false
    }

    @objc
    func getBatteryLevel(_ resolve: @escaping RCTPromiseResolveBlock,
                         reject: @escaping RCTPromiseRejectBlock) {
        UIDevice.current.isBatteryMonitoringEnabled = true
        let batteryLevel = UIDevice.current.batteryLevel
        if batteryLevel >= 0 {
            resolve(Int(batteryLevel * 100))
        } else {
            let error = NSError(domain: "", code: 200, userInfo: nil)
            reject("E_BATTERY_LEVEL", "Battery level unavailable", error)
        }
    }
}

