import { NativeModules } from 'react-native';

const { MyNativeModule } = NativeModules;

const callNativeMethod = async () => {
  try {
    const result = await MyNativeModule.myMethod('World');
    console.log(result); // 应该输出 "Hello, World"
  } catch (e) {
    console.error(e);
  }
};

export default callNativeMethod;
