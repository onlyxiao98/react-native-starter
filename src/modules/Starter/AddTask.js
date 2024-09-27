import { useState, useContext } from 'react'
import { TextInput, Text, TouchableOpacity, View, StyleSheet } from 'react-native'
import { useTasks, useTasksDispatch } from './TasksContext'


export default function AddTask() {
    let nextId = 3
    const [text, setText] = useState('')
    const dispatch = useTasksDispatch()
    const tasks = useTasks()

    return (
        <>
            <View style={[styles.flexRow]}>
                <TextInput
                    placeholder='Add task'
                    onChangeText={(e)=>setText(e)}
                    value={text}
                    style={{marginRight: 20}}
                />
                <TouchableOpacity onPress={()=>{
                    dispatch({type:'add', task: {text, id: nextId++, done: false}})
                    setText('')
                }}>
                    <Text>Add</Text>
                </TouchableOpacity>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    flexRow: {
        flexDirection: 'row',
        alignItems: 'center'
    }
})