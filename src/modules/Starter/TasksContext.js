
import { createContext, useContext, useReducer } from 'react'

const TasksContext = createContext(null)
const TasksDispatchContext = createContext(null)

export function TasksProvider ({children}) {
    const [tasks, dispatch] = useReducer(tasksReducer, initialTasks)
    return (
        <TasksContext.Provider value={tasks}>
            <TasksDispatchContext.Provider value={dispatch}>
                {children}
            </TasksDispatchContext.Provider>
        </TasksContext.Provider>
    )
}

export function useTasks() {
    return useContext(TasksContext)
}
export function useTasksDispatch() {
    return useContext(TasksDispatchContext)
}

function tasksReducer(tasks, action) {
    switch (action.type) {
        case 'add':
            return [...tasks, action.task]
        case 'remove':
            return tasks.filter(task => task.id !== action.task.id)
        case 'update':
            return tasks.map(task => task.id === action.task.id ? action.task : task)
        default:
            throw new Error(`Unhandled action type: ${action.type}`)
    }
}

const initialTasks = [
    { id: 0, text: 'Philosopher’s Path', done: true },
    { id: 1, text: 'Visit the temple', done: false },
    { id: 2, text: 'Drink matcha', done: false }
];