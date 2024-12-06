package com.lab8app

import com.facebook.react.bridge.*
import com.facebook.react.modules.core.DeviceEventManagerModule

class EventEmitterModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String {
        return "EventEmitterModule"
    }

    @ReactMethod
    fun sendEventToJavaScript() {
        val params = Arguments.createMap().apply {
            putString("message", "Hello from Kotlin!")
        }
        reactApplicationContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
                .emit("onCustomEvent", params)
    }
}
