import { useEffect, memo, useRef } from 'react'
import { StyleSheet, View, Text, Button, Alert, Dimensions, Platform, Linking, PixelRatio, BackHandler, PermissionsAndroid, TextInput, Keyboard, TouchableOpacity } from 'react-native'
import { useBackHandler } from '@react-native-community/hooks'
import { createStackNavigator } from '@react-navigation/stack'
import MoveAnimation  from './Animated'
import ForwardRef from './ForwardRef'
// import callNativeMethod from './callNativeMethod'

function ApiContainer (navigation) {
    const btns = [
        {text: '取消', onPress: () => {console.error('%c取消','color:red; fonst-size: x-large')}},
        {text: '确认', onPress: () => {console.warn('%c确认','color:green; fonst-size: x-small')}},
        {text: '忽略', onPress: () => {console.table(users)}},
    ]
    const {width, height, scale, fontScale} = Dimensions.get('window')
    console.log(width, height, scale, fontScale)
    const testAlert = () => {
        Keyboard.dismiss()
        Alert.alert(
            '提示',
            '测试',
             btns
        )
    }
    const users = [
        {name: '张三', age: 18},
        {name: '李四', age: 20}
    ]
    // Platform
    console.log(Platform.OS)
    console.log(Platform.Version)
    console.log(Platform.isTV)
    console.log(Platform.constants)
    // StyleSheet
    console.log(StyleSheet.hairlineWidth)
    console.log(StyleSheet.absoluteFill)
    console.log(StyleSheet.compose([{color: 'red', fontSize: 20}, {color: 'blue', fontSize: 18}]))
    // Linking
    const skipTo = (url) => {
        // console.log(PixelRatio.get())
        // console.log(PixelRatio.getFontScale())

        if(Linking.canOpenURL(url)){
            Linking.openURL(url)
            // Linking.openSettings()
        }else{
            console.error('无法跳转')
        }
    }

    useEffect(()=>{
        console.log('useEffect...')
        BackHandler.addEventListener('hardwareBackPress', returnForAndroid)
        const showKeyboardListener = Keyboard.addListener('keyboardDidShow', showKeyboard)
        const hideKeyboardListener = Keyboard.addListener('keyboardDidHide', hideKeyboard)
        return () => {
            BackHandler.removeEventListener('hardwareBackPress', returnForAndroid)
            showKeyboardListener.remove()
            hideKeyboardListener.remove()
        }
    }, [])
    const returnForAndroid = () => {
        BackHandler.exitApp()
        return false
    }
    const showKeyboard = () => {
        console.log('键盘出现了')
    }
    const hideKeyboard = () => {
        console.log('键盘隐藏了')
    }

    useBackHandler(()=>{
        return false
    })

    const checkPermission = () => {
        // console.log(PermissionsAndroid.PERMISSIONS)
        if(Platform.OS === 'android'){
            PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE).then((result)=>{
                if(!result) {
                    PermissionsAndroid.request(
                        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
                        {
                            title: '权限申请',
                            message: '请求权限'
                        }
                    ).then((status)=>{
                        console.log(status)
                    })
                }
            })
            
        }
    }

    const Stack = createStackNavigator()

    const AnimateScreen = () => {
        return (
            <MoveAnimation />
        )
    }

    const inputRef = useRef(null)
    const switchRef = useRef(null)
    
    return (
        <>
            <View>
                <Text>常用Api</Text>
                <Button title='按钮' onPress={testAlert}/>
                <Button title='跳转' onPress={()=>{skipTo('mailto: 10086@qq.com')}}/>
                <Button title='权限' onPress={checkPermission} />
                {/* <View style={styles.transformed}></View>
                <TextInput style={{width: 200, height: 40, backgroundColor: '#ddd'}} placeholder='输入'/> */}
                {/* <TouchableOpacity onPress={()=>{navigation.navigate('ScollViewDemo')}}>
                    <Text>移动动画</Text>
                </TouchableOpacity> */}
                <TouchableOpacity onPress={()=>{
                    console.log('render...');
                    // callNativeMethod()
                }}>
                    <Text>测试</Text>
                </TouchableOpacity>
                <Text>移动动画</Text>
            </View>

            {/* <Stack.Navigator initialRouteName='Start'>
                <Stack.Screen name="Animated" component={AnimateScreen} />
            </Stack.Navigator> */}
            <MoveAnimation name='xiao' />

            <Button title='ForwardRef' onPress={()=>{
                inputRef.current.focus()
            }} />
            <ForwardRef ref={inputRef} />

        </>
    )
}

const styles = StyleSheet.create({
    root: {
        width: '100%',
        height: '100%',
        backgroundColor: '#f5f5f5',
        paddingTop: Platform.select({
            android: 20,
            ios: 0,
            default: 0
        })
    },
    transformed: {
        width: 100,
        height: 100,
        backgroundColor: 'red',
        transform: [{rotate: '45deg'}, {translateX: 40}]
    }
})

export default ApiContainer