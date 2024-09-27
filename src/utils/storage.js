import AsyncStorage from '@react-native-async-storage/async-storage'

const set = async (key, data) => {
    try { 
        const jsonData = JSON.stringify({data})
        await AsyncStorage.setItem(key, jsonData)
    } catch (e) {
        console.log('error', e)
    }
}

const get = async (key) => {
    try {
        const data = await AsyncStorage.getItem(key)
        return JSON.parse(data)
    } catch (e) {
        console.log('error', e)
    }
}

const remove = async (key) => {
    try {
        await AsyncStorage.removeItem(key)
    } catch (e) {
        console.log('error', e)
    }
}

const clear = async () => {
    try {
        await AsyncStorage.clear()
    } catch (e) {
        console.log('error', e)
    }
}

export {
    set,
    get,
    remove,
    clear
}