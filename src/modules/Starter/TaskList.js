import { useState } from "react";
import { View, Text, StyleSheet, FlatList, TextInput, StatusBar, SafeAreaView, TouchableOpacity } from "react-native";
import { useTasks, useTasksDispatch } from "./TasksContext";

export default function TaskList(){
    const tasks = useTasks();

    return(
        <SafeAreaView style={styles.container}>
            <FlatList
                data={tasks}
                renderItem={({item}) => <Task task={item} title={item.text} />}
                keyExtractor={item => item.id}
            />
        </SafeAreaView>
    )
}
function Task({task}) {
    const [isEditing, setIsEditing] = useState(false)
    const dispatch = useTasksDispatch()
    let taskContent
    if(isEditing){
        taskContent = (
            <>
                <View style={[styles.flexRow]}>
                    <TextInput
                        value={task.text}
                        onChangeText={e => dispatch({type: 'update', task: {...task, text: e}})}
                    />
                    <TouchableOpacity onPress={()=>{setIsEditing(false)}}>
                        <Text style={[{color: '#000', marginLeft: 12}]}>Save</Text>
                    </TouchableOpacity>
                </View>

            </>
        )
    } else {
        taskContent = (
            <>
                <Text>{task.text}</Text>
                <TouchableOpacity onPress={()=>{setIsEditing(true)}}>
                    <Text style={[{color: '#000', marginLeft: 12}]}>Edit</Text>
                </TouchableOpacity>
            </>
        )
    }
    return (
        <>
            <View style={[styles.flexRow]}>
                {taskContent}
                <TouchableOpacity onPress={()=>{dispatch({type: 'remove', task: {...task, id: task.id}})}}>
                    <Text style={[{color: '#000', marginLeft: 12}]}>Delete</Text>
                </TouchableOpacity>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: StatusBar.currentHeight || 0,
    },
    flexRow: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    item: {
      padding: 10,
      marginVertical: 5,
      marginHorizontal: 8,
    },
    title: {
      fontSize: 16,
    },
  });