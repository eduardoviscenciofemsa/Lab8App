//
//  EventEmitterModule.swift
//  Lab8App
//
//  Created by Jesus Eduardo Oliva Viscencio on 06/12/24.
//

import Foundation
import React
 
@objc(EventEmitterModule)
class EventEmitterModule: RCTEventEmitter {
 
    override static func requiresMainQueueSetup() -> Bool {
        return false
    }
 
    override func supportedEvents() -> [String]! {
        return ["onCustomEvent"]
    }
 
    @objc
    func sendEventToJavaScript() {
        sendEvent(withName: "onCustomEvent", body: ["message": "Hello from Swift!"])
    }
}
