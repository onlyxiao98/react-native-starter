import React, { useEffect, useState } from 'react';
import { Text, Alert, View, StyleSheet, Dimensions, Button, TouchableOpacity, TextInput } from 'react-native';
import TestView from './TestView'
import TestAnimated from './TestAnimated'
import TestModal from './TestModal'
import TestPhoto from './TestPhoto'
import TestLinking from './TestLinking'
import Dropdown from './DropDown'
import Switch from './Switch'
import Slider from '@react-native-community/slider'

function TestContainer({ route, navigation }) {
  const [modal, setModal] = useState(false)
  const [toDoList, setToDoList] = useState([
    {name: '刷牙', status: 'todo', id: 0}
  ])
  const [index, setIndex] = useState(0)
  const [value, onChangeText] = React.useState('Useless Placeholder');

  const options = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
  ];

  const [selectedOption, setSelectedOption] = useState(null);

  const handleSelect = (option) => {
    setSelectedOption(option);
  };

  useEffect(()=>{
    Alert.alert('route: ', route.name, [
        {
            text: "Return",
            onPress: ()=>{
                navigation.goBack()
            },
            style: 'confirm'
        },
        { 
            text: "OK", 
            onPress: () => console.log("OK Pressed")
        }
    ])
  },[])

  handleDataFromChild = (data) => {
    setModal(data)
  }
  removeTask = (task) => {
    setToDoList(toDoList.filter((item)=>{
      return item.id !== task.id
    }))
  }
  addTask = () => {
    let curIndex = index + 1
    setIndex(curIndex)
    setToDoList(
      [
        ...toDoList,
        {name: value, status: 'todo', id: curIndex} 
      ]
    )
  }
  editTask = (task) => {
    console.log('task', task)
  }
  const [isOpen, setIsOpen] = useState(false)
  const handleChildOpen = (bool) => {
    setIsOpen(bool)
  }

  const [progress, setProgress] = useState(0);

  const handlePress = () => {
    setProgress(progress + 10 > 100 ? 0 : progress + 10);
  };

  return (
    <>
        {modal ? <TestModal modalVisible={modal} modalContent={'yes or not'} modalButton={'是否'} sendData={this.handleDataFromChild}></TestModal> : <View style={[styles.container]}>
          <Text>TestContainer</Text>
          <View style={{flexDirection: 'row', width: 210, height: 22}}>
            <Slider
              style={{width: 200, height: 20}}
              minimumValue={0}
              maximumValue={1}
              minimumTrackTintColor="#FFFFFF"
              maximumTrackTintColor="#000000"
            />
          </View>
          <TestView/>
          <TestLinking/>
          <TestPhoto/>
          <Switch open={isOpen} setOpen={handleChildOpen} label={'开关'} bgColor={isOpen ? '#edf' : '#ccc'} color={isOpen ? '#efd' : '#f5f5f5'} />
          <Dropdown options={options} onSelect={handleSelect} />
          <View>
            <View style={[{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}]}>
              <Text>待办事项：</Text>
              <TextInput
                style={{ height: 36, borderColor: 'gray', borderWidth: 1, marginRight: 12 }}
                onChangeText={text => onChangeText(text)}
                value={value}
              />
              <TouchableOpacity onPress={addTask}>
                <Text>添加</Text>
              </TouchableOpacity>
            </View>
            {toDoList && toDoList.length>0 && toDoList.map((item, index) => {
              return(
                <View key={index} style={[{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginVertical: 6}]}>
                    <Text style={[item['status']==='todo'?styles.todo:styles.done]}>{item.name}</Text>
                    <TouchableOpacity 
                    onPress={()=>{
                      removeTask(item)
                    }}
                    onLongPress={()=>{editTask(item)}}
                    >
                      <Text style={{marginLeft: 12, textDecorationLine: "underline"}}>删除</Text>
                    </TouchableOpacity>
                </View>
              )
            })}
          </View>
          <Text>reanimated</Text>
          <Button title="Modal组件" onPress={()=>{setModal(true)}}></Button>
          {/* <TestAnimated/> */}
        </View>}
    </>
  )
}

export default TestContainer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  },
  todo: {
    color: '#333'
  },
  done: {
    color: '#999'
  }
})