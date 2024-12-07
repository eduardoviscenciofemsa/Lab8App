import Foundation
import React

@objc(BatteryModule)
class BatteryModule: RCTEventEmitter {
    override init() {
        super.init()
        UIDevice.current.isBatteryMonitoringEnabled = true
    }

    deinit {
        NotificationCenter.default.removeObserver(self,
                                                  name: UIDevice.batteryLevelDidChangeNotification,
                                                  object: nil)
    }

    override static func requiresMainQueueSetup() -> Bool {
        return false
    }

    override func supportedEvents() -> [String]! {
        return ["batteryLevelChanged"]
    }

    override func startObserving() {
        NotificationCenter.default.addObserver(self,
                                               selector: #selector(batteryLevelDidChange),
                                               name: UIDevice.batteryLevelDidChangeNotification,
                                               object: nil)

        batteryLevelDidChange() // Send an initial event to test the subscription
    }

    override func stopObserving() {
        NotificationCenter.default.removeObserver(self,
                                                  name: UIDevice.batteryLevelDidChangeNotification,
                                                  object: nil)
    }

    @objc
    func getBatteryLevel(_ resolve: @escaping RCTPromiseResolveBlock,
                         reject: @escaping RCTPromiseRejectBlock) {
        let batteryLevel = UIDevice.current.batteryLevel
        if batteryLevel >= 0 {
            resolve(Int(batteryLevel * 100))
        } else {
            let error = NSError(domain: "", code: 200, userInfo: nil)
            reject("E_BATTERY_LEVEL", "Battery level unavailable", error)
        }
    }

    @objc
    func getBatteryLevelAsync(_ resolve: @escaping RCTPromiseResolveBlock,
                              reject: @escaping RCTPromiseRejectBlock) {
        DispatchQueue.global(qos: .background).async {
            let batteryLevel = UIDevice.current.batteryLevel

            DispatchQueue.main.async {
                if batteryLevel >= 0 {
                    resolve(Int(batteryLevel * 100))
                } else {
                    let error = NSError(domain: "", code: 200, userInfo: nil)
                    reject("E_BATTERY_LEVEL", "Battery level unavailable", error)
                }
            }
        }
    }

    @objc
    func batteryLevelDidChange() {
        let batteryLevel = UIDevice.current.batteryLevel

        // This condition was commented out to allow the event to be sent even if the battery level is not available.
        // if batteryLevel >= 0 {
            sendEvent(withName: "batteryLevelChanged", body: Int(batteryLevel * 100))
        // }
    }
}
