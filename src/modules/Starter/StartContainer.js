import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import Dropdown from '../test/DropDown'
import i18n from '../../translations/index'
import Slider from '@react-native-community/slider'
import DatePicker from './DatePicker'
import { get, set, remove, clear } from '../../utils/storage'
import { withReducer, withState } from 'recompose'
import { createStackNavigator } from '@react-navigation/stack' 
import MyWebScreen from './MyWeb'
import FastImage from 'react-native-fast-image';
import PDF from './PDF'
import DragGrid from './DragGrid'
import { StatePractice, EffectPractice, RefPractice, CallbackPractice, DebounceHooks } from './MyHooks'
import UAnimated from './Animated'
import Upload from './Upload'
import ContextReducer from './ContextReducer'
import ScollViewDemo from './ScollViewDemo'
import MemoUse from './MemoUse'

const MyImage = () => (
    <FastImage
        style={{ width: 100, height: 100 }}
        source={{
            uri: 'https://unsplash.it/400/400?image=1',
            headers: { Authorization: 'someAuthToken' },
            priority: FastImage.priority.normal,
        }}
        resizeMode={FastImage.resizeMode.contain}
    />
)
const enhances = withState('counter', 'setCounter', 0)
const MyCount = enhances(({counter, setCounter})=>{
    return (
        <>
            <Text>Count: {counter}</Text>
            <View style={[styles.flexRow]}>
                <TouchableOpacity onPress={()=>{setCounter((counter)=>counter+1)}}>
                    <Text>+1</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{setCounter((counter)=>counter-1)}}>
                    <Text style={[{marginLeft: 12}]}>-1</Text>
                </TouchableOpacity>
            </View>
        </>
    )
})

const StartContainer = ({navigation}) => {
    const options = [
        { value: 'zh-CN', label: 'CN' },
        { value: 'zh-HK', label: 'HK' },
        { value: 'en', label: 'EN' },
    ];
    
    const [selectedOption, setSelectedOption] = useState(null);

    const handleSelect = (option) => {
        setSelectedOption(option);
        i18n.locale = option.value;
    };
    const [value, setValue] = useState(0)
    const handleValueChange = (e) => {
        setValue(e)
    }
    return (
        <React.Fragment>
          <View style={[styles.flexRow]}>
            <MyImage />
          </View>
          <Text>Starter</Text>
          <TouchableOpacity onPress={()=>{navigation.navigate('Web')}}>
            <Text>Webview</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>{navigation.navigate('PDF')}}>
            <Text>PDF</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>{navigation.navigate('Drag')}}>
            <Text>Drag</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>{navigation.navigate('MyHooks')}}>
            <Text>MyHooks</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>{navigation.navigate('UAnimated')}}>
            <Text>UAnimated</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>{navigation.navigate('Upload')}}>
            <Text>Upload</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>{navigation.navigate('ToContextReducer')}}>
            <Text>ContextReducer</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>{navigation.navigate('ScollViewDemo')}}>
            <Text>ScollViewDemo</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>{navigation.navigate('MemoUse')}}>
            <Text>MemoUse</Text>
          </TouchableOpacity>
          <MyCount />
          {/* <Counter /> */}
          <View style={[styles.flexRow]}>
            <Text>切换语言</Text>
            <Dropdown options={options} onSelect={handleSelect} />
            <Text>{i18n.t('greeting')}</Text>
            <Text style={{marginLeft: 20}}>{i18n.t('edit')}</Text>
          </View>
          <View style={[styles.flexRow, {justifyContent: 'center'}]}>
                <Text>进度: {value}%</Text>
                <Slider
                    style={{width: 200, height: 40}}
                    minimumValue={0}
                    maximumValue={100}
                    minimumTrackTintColor="#FFFFFF"
                    maximumTrackTintColor="#000000"
                    step={1}
                    onValueChange={handleValueChange}
                />
            </View>
            <Text>Storage</Text>
            <View style={[styles.flexRow,{width: 200, justifyContent: 'space-between'}]}>
                <TouchableOpacity onPress={
                    () => { set("user", {name: 'a', age: 23}) }
                }>
                    <Text>设置</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={
                    async() => { const user = await get("user"); console.log(user) }
                }>
                    <Text>获取</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={
                    () => { remove("user") }
                }>
                    <Text>移除</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={
                    () => { clear() }
                }>
                    <Text>清空</Text>
                </TouchableOpacity>
            </View>
            <Text>日期时间选择器</Text>
            <View style={[styles.flexRow]}>
                <DatePicker/>
            </View>
          <View>

          </View>
        </React.Fragment>
    )
}

const WebScreen = () => {
    return (
        <MyWebScreen />
    )
}
const PDFScreen = () => {
    return (
        <PDF />
    )
}
const DragScreen = () => {
    return (
        <DragGrid />
    )
}
const MemoUseScreen = () => {
    return (
        <MemoUse />
    )
}
const HooksScreen = () => {
    return (
        <React.Fragment>
            <StatePractice />
            <EffectPractice />
            <RefPractice />
            <CallbackPractice />
            <DebounceHooks />
        </React.Fragment>
    )
}
const AnimatedScreen = () => {
    return (
        <UAnimated />
    )
}
const UploadScreen = () => {
    return (
        <Upload />
    )
}
const ContextReducerScreen = () => {
    return (
        <ContextReducer />
    )
}
const ScollViewDemoScreen = () => {
    return (
        <ScollViewDemo />
    )
}

const Stack = createStackNavigator()

const Starter = () => {
    return (
        <Stack.Navigator initialRouteName='Start'>
            <Stack.Screen name="Start" component={StartContainer} />
            <Stack.Screen name="Web" component={WebScreen} />
            <Stack.Screen name="PDF" component={PDFScreen} />
            <Stack.Screen name="Drag" component={DragScreen} />
            <Stack.Screen name="MyHooks" component={HooksScreen} />
            <Stack.Screen name="UAnimated" component={AnimatedScreen} />
            <Stack.Screen name="Upload" component={UploadScreen} />
            <Stack.Screen name="ToContextReducer" component={ContextReducerScreen} />
            <Stack.Screen name="ScollViewDemo" component={ScollViewDemoScreen} />
            <Stack.Screen name="MemoUse" component={MemoUseScreen} />
        </Stack.Navigator>
    )
}

const styles = StyleSheet.create({
    flexRow: {
        flexDirection: 'row',
        alignItems: 'center'
    }
})

export default Starter