package com.lab8app

import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import android.content.IntentFilter
import android.os.BatteryManager
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.modules.core.DeviceEventManagerModule

class BatteryModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    private val batteryLevelReceiver = object : BroadcastReceiver() {
        override fun onReceive(context: Context, intent: Intent) {
            val level = intent.getIntExtra(BatteryManager.EXTRA_LEVEL, -1)
            emitBatteryLevel(level)
        }
    }

    override fun getName(): String {
        return "BatteryModule"
    }

    private fun emitBatteryLevel(level: Int) {
        reactApplicationContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
                .emit("batteryLevelChanged", level)
    }

    @ReactMethod
    fun getBatteryLevel(promise: Promise) {
        try {
            val ifilter = IntentFilter(Intent.ACTION_BATTERY_CHANGED)
            val batteryStatus = reactApplicationContext.registerReceiver(batteryLevelReceiver, ifilter)
            val level = batteryStatus?.getIntExtra(BatteryManager.EXTRA_LEVEL, -1) ?: -1
            val scale = batteryStatus?.getIntExtra(BatteryManager.EXTRA_SCALE, -1) ?: -1
            val batteryLevel = level / scale.toDouble() * 100
            promise.resolve(batteryLevel.toInt())
        } catch (e: Exception) {
            promise.reject("E_BATTERY_LEVEL", "Battery level unavailable", e)
        }
    }

    @ReactMethod
    fun getBatteryLevelAsync(promise: Promise) {
        Thread(Runnable {
            try {
                val ifilter = IntentFilter(Intent.ACTION_BATTERY_CHANGED)
                val batteryStatus = reactApplicationContext.registerReceiver(batteryLevelReceiver, ifilter)
                val level = batteryStatus?.getIntExtra(BatteryManager.EXTRA_LEVEL, -1) ?: -1
                val scale = batteryStatus?.getIntExtra(BatteryManager.EXTRA_SCALE, -1) ?: -1
                val batteryLevel = level / scale.toDouble() * 100
                promise.resolve(batteryLevel.toInt())
            } catch (e: Exception) {
                promise.reject("E_BATTERY_LEVEL", "Battery level unavailable", e)
            }
        }).start()
    }
}
