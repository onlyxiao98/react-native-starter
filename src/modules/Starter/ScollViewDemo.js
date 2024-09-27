import { useState, useEffect, useRef } from 'react'
import { View, ScrollView, StyleSheet, Button, Text, TextInput, FlatList, SectionList, RefreshControl, Modal, Image, TouchableOpacity, StatusBar, Switch, Animated } from 'react-native'
import logo from '../../../assets/images/twitter.png'

export default () => {
    // let data = [
    //     1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30
    // ]
    const records = [
        {type: 'A', data: ['阿珍', '阿强', '阿龙', '阿俊']},
        {type: 'B', data: ['毕十三', '毕业', '闭祖哼', '边伯贤']},
        {type: 'C', data: ['陈道明', '陈小芳', '成嘉琪', '陈芳']},
        {type: 'D', data: ['大师', '大大', '大庆', '迪飞声']},
        {type: 'E', data: ['二货', '二小']},
        {type: 'F', data: ['风云', '风肖', '凤清河']},
        {type: 'G', data: ['阁下', '关谷']},
        {type: 'H', data: ['黄飞鸿', '黄继光']},
        {type: 'I', data: ['爱思', '艾斯']},
        {type: 'J', data: ['Jimi', '杰杰', '杰伦']},
        {type: 'K', data: ['King', '康立江']}
    ]
    // const renderView = () => {
    //     let list = []
    //     for (let i = 0; i < 30; i++) {
    //         list.push(<Text style={styles.textItem} key={i}>{i + 1}</Text>)
    //     }
    //     return list
    // }
    const renderName = ({item}) => {
        return <Text style={styles.nameItem}>{item}</Text>
    }
    // const ListEmptyComponent = <View style={styles.empty}>
    //     <Text>暂无数据</Text>
    // </View>
    const sectionRef = useRef(null)
    
    // useEffect(() => {
    //     setTimeout(() => {
    //         sectionRef.current.scrollToLocation({
    //             itemIndex: 2,
    //             sectionIndex: 2,
    //             viewPosition: 0,
    //             animated: true
    //         })
    //     }, 2000)
    // }, [])

    const [refreshing, setRefreshing] = useState(false)
    const onRefresh = () => {
        setRefreshing(true)
        setTimeout(() => {
            setRefreshing(false)
        }, 2000)
        console.log('onRefresh...')
    }
    const [visible, setVisible] = useState(false)
    const sheetHeader = 
    <View style={{height: 50, backgroundColor: '#ddd', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 8}}>
        <Text>头部</Text>
        <TouchableOpacity onPress={
            ()=>{
                Animated.timing(fadeVal, {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: false
                }).start(
                    ()=>{
                        setVisible(false)
                    }
                )
            }
            }>
            <Image source={logo} style={{width: 30, height: 30}} />
        </TouchableOpacity>
    </View>
    const [switchVal, setSwitchVal] = useState(false)

    // 修复动画
    const fadeVal = useRef(new Animated.Value(0)).current
    
    return (
        <View style={styles.container}>
        
            {/* <ScrollView stickyHeaderIndices={0} showsVerticalScrollIndicator={false} contentContainerStyle={styles.listContainer} keyboardDismissMode='on-drag' keyboardShouldPersistTaps='handled' >
            <Button title="滚动到底部" onPress={() => {
                console.log('滚动到底部')
            }} />
            <TextInput style={styles.input} />
                {renderView()}
            </ScrollView> */}

            {/* <FlatList
                data={data}
                renderItem={({ item, index }) => <Text style={styles.textItem}>{`item-${item}`}</Text>}
                keyExtractor={(item, index) => index}
                ItemSeparatorComponent={() => <View style={{ height: 1, width: '100%', backgroundColor: '#fff' }} />}
                ListEmptyComponent={ListEmptyComponent}
                contentContainerStyle={styles.listContainer}
            >
            </FlatList> */}
              
            <Button title="打开" onPress={() => {
                
                Animated.timing(fadeVal, {
                    toValue: 1,
                    duration: 300,
                    useNativeDriver: false
                }).start(()=>{setVisible(true)})
            }} />
            <Switch value={switchVal} trackColor={{true: '#0000ff', false: '#ddd'}} thumbColor={switchVal?'#0000ff30':'#ddd'} onValueChange={()=>{setSwitchVal(!switchVal)}} />
           
            <Modal style={{height: '100%'}} visible={visible} animationType='slide' transparent>
                <StatusBar translucent={true} hidden={true} backgroundColor='#ddd' barStyle={'light-content'} />
                <Animated.View style={{height: '20%', backgroundColor: '#00000050', opacity: fadeVal}}></Animated.View>  
                <SectionList
                    ref={sectionRef}
                    sections={records}
                    renderItem={renderName}
                    keyExtractor={(item, index) => `${item}-${index}`}
                    ItemSeparatorComponent={() => <View style={{ height: 1, width: '100%', backgroundColor: '#f5f5f5' }} />}
                    renderSectionHeader={({section}) => <Text style={{fontWeight: 'bold', paddingLeft: 8, backgroundColor: '#eee'}}>{section.type}</Text>}
                    stickySectionHeadersEnabled={true}
                    ListHeaderComponent={sheetHeader}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />
                    }
                    onEndReached={
                        () => {
                            console.log('onEndReached...')
                        }
                    }
                >

                </SectionList>
            </Modal>
            
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: '#f5f5f5'
    },
    listContainer: {
        backgroundColor: '#dddd'
    },
    textItem: {
        fontSize: 16,
        marginVertical: 10,
        paddingLeft: 8
    },
    input: {
        width: '100%',
        height: 40,
        borderRadius: 10,
        backgroundColor: '#fff'
    },
    empty: {
        width: '100%',
        height: 200,
        justifyContent: 'center',
        alignItems: 'center'
    },
    nameItem: {
        fontSize: 16,
        paddingVertical: 8,
        paddingLeft: 8,
        backgroundColor: '#ddd'
    }
})