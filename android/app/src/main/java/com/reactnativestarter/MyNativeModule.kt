package com.reactnativestarter

import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

class MyNativeModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String {
        return "MyNativeModule"
    }

    @ReactMethod
    fun myMethod(message: String, promise: Promise) {
        try {
            // 处理逻辑
            val result = "Hello, $message"
            promise.resolve(result)
        } catch (e: Exception) {
            promise.reject("Error", e)
        }
    }
}
