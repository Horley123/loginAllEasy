package com.loguinalleasy.MyDevice

import android.os.Build
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Callback
import org.json.JSONObject

class MyDeviceInfoPackage(private val reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String {
        return "MyDeviceInfoPackage"
    }

    @ReactMethod
    fun getDeviceInfo( callback: Callback) {
        val platform = " ${Build.VERSION.RELEASE}"
        val sdkVersion = " ${Build.VERSION.SDK_INT}"
        val manufacturer = "${Build.MANUFACTURER}"
        val model = " ${Build.MODEL}"

        val deviceInfo = JSONObject().apply {
            put("platform", platform)
            put("sdkVersion", sdkVersion)
            put("manufacturer", manufacturer)
            put("model", model)
        }

        callback.invoke(deviceInfo.toString())
    }
}
