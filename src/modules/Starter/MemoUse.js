import { useState, useMemo, useEffect, useCallback } from 'react'
import { View, Text, Switch, FlatList, StyleSheet, Button, TouchableOpacity } from 'react-native'

export default function MemoUse() {
    const data1 = [
        {name: '买菜', type: '食', amount: 32, id: 1},
        {name: '衣服', type: '衣', amount: 232, id: 2},
        {name: '租房', type: '住', amount: 1432, id: 3},
        {name: '地铁', type: '行', amount: 320, id: 4},
        {name: '零食', type: '食', amount: 92, id: 5},
        {name: '奶茶', type: '食', amount: 32, id: 6}
    ]
    const data2 = [
        {name: '买菜', type: '食', amount: 132, id: 1},
        {name: '夏装', type: '衣', amount: 92, id: 2},
        {name: '租房', type: '住', amount: 1432, id: 3},
        {name: '地铁', type: '行', amount: 320, id: 4},
        {name: '零食', type: '食', amount: 92, id: 5},
        {name: '奶茶', type: '食', amount: 32, id: 6}
    ]

    renderItem = ({item, index}) => {
        return (
            <View style={styles.itemView}>
                <Text style={{flex: 1}}>{item.name}</Text>
                {isSwitch&&<Text style={{flex: 0.5}}>{item.type}</Text>}
                <Text style={{flex: 0.5}}>{item.amount}</Text>
            </View>
        )
    }

    const [data, setData] = useState([])
    const [isSwitch, setIsSwitch] = useState(false)
    useEffect(() => {
        setData(data1)
    }, [])
    const calculateTotal = useMemo(
        () => {
            console.log('calculateTotal')
            return data.length && data.reduce((total, item) => total + item.amount, 0)
        }, [data]
    )
    // const calculateTotal = () => {
    //         console.log('calculateTotal')
    //         return data.length && data.reduce((total, item) => total + item.amount, 0)
    // }
    const rowPress = useCallback((item) => {
        console.log(item+'rowPress')
    }, [])

    return (
        <View style={styles.root}>
            <View style={styles.titleView}>
                <Text>MemoUse</Text>
                <Button title="按钮" onPress={() => {
                    setData(isSwitch ? data1 : data2)
                }} />
                <Switch 
                    value={isSwitch}
                    onValueChange={() => {
                        setIsSwitch(!isSwitch)
                        rowPress('--')
                    }}
                />
            </View>
            <FlatList contentContainerStyle={styles.listContent} data={data} renderItem={renderItem} />
            <Text>总计：{calculateTotal}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    root: {
        width: '100%',
        height: '100%',
        backgroundColor: '#f5f5f5'
    },
    titleView: {
        width: '100%',
        height: '42',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff'
    },
    itemView: {
        width: '100%',
        height: '42',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    listContent: {
        width: '100%',
        height: '100%',
        padding: 10
    }
})