import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native'
import AddTask from './AddTask'
import TaskList from './TaskList'
import { TasksProvider } from './TasksContext'

const ContextReducer = () => {
    return (
        <>
            <Text style={[styles.title]}>使用context和reducer进行扩展</Text>
            <TasksProvider>
                <AddTask />
                <TaskList />
            </TasksProvider>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold'
    }
})
export default ContextReducer;