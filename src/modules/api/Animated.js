import { useRef, useState, useEffect, memo } from 'react'
import { Animated, View, StyleSheet, Button, Easing, LayoutAnimation, Image, Text, TouchableOpacity } from 'react-native'
import Avatar from '../../../assets/images/photos.jpeg'

const moveAnimation = (props) => {
    const move = useRef(new Animated.Value(0)).current
    const rotate = useRef(new Animated.Value(0)).current
    // 矢量
    const vector = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current

    // 组合动画
    const moveX = useRef(new Animated.Value(0)).current
    const moveY = useRef(new Animated.Value(0)).current
    const colorAnim = useRef(new Animated.Value(0)).current

    const colorRange = colorAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['#ff0000', '#00ff00']
    })

    const moveXAni = Animated.timing(moveX, {
        toValue: 200,
        duration: 1000,
        useNativeDriver: false
    })
    const moveYAni = Animated.timing(moveY, {
        toValue: 100,
        duration: 1000,
        useNativeDriver: false
    })
    const colorAni = Animated.timing(colorAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: false
    })
    const composeAnim = () => {
        // Animated.parallel([moveXAni, moveYAni, colorAni]).start()
        // Animated.sequence([moveXAni, moveYAni, colorAni]).start()
        // Animated.stagger(1000,[moveXAni, moveYAni, colorAni]).start()
        Animated.sequence([moveXAni, Animated.delay(500), moveYAni, Animated.delay(1500), colorAni]).start()
    }
    

    const moveAnim1 = () => {
        // Animated.timing(move, {
        //     toValue: 300,
        //     duration: 1000,
        //     easing: Easing.easeInOutSine,
        //     useNativeDriver: false
        // }).start()

        Animated.timing(vector, {
            toValue: { x: 200, y: 300},
            duration: 1000,
            useNativeDriver: false
        }).start()

        // Animated.decay(move, {
        //     velocity: 1,
        //     deceleration: 0.995,
        //     useNativeDriver: false
        // }).start()

        // Animated.spring(move, {
        //     toValue: 300,
        //     // speed: 50,
        //     // bounciness: 20,

        //     friction: 1,
        //     tension: 40,
        //     useNativeDriver: false
        // }).start()
    }
    const rotateRange = rotate.interpolate({
        inputRange: [0, 45],
        outputRange: ['0deg', '45deg']
    })
    const rotateAnim1 = () => {
        Animated.timing(rotate, {
            toValue: 45,
            duration: 1000,
            useNativeDriver: false
        }).start()
    }

    useEffect(()=>{
        console.log('useEffect...')
    }, [])

    const [rowDirection, setRowDirection] = useState(true)
    return (
        <>
            <Button title='动画' onPress={composeAnim} />
            <Animated.View style={[styles.box, {transform: [{translateX: moveX}, {translateY: moveY}], backgroundColor: colorRange}]} />
            {/* <Animated.View style={[styles.box, {marginLeft: vector.x, marginTop: vector.y}]} /> */}
            {/* <Animated.View style={[styles.box, {transform: [{rotate: rotateRange}]}]} /> */}

            <TouchableOpacity onPress={()=>{
                setRowDirection(!rowDirection)
                LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
            }}>
                <Text>LayoutAnimation</Text>
            </TouchableOpacity>
            <View style={[styles.flexRow, { flexDirection:  rowDirection ? 'row' : 'row-reverse'}]}>
                <Image style={styles.img} source={Avatar} />
                <Text style={styles.txt}>这是一段文本{props.name}</Text>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    box: {
        width: 100,
        height: 100,
        backgroundColor: '#3050dd',
        marginLeft: 50,
        marginTop: 50
    },
    flexRow: {
        alignItems: 'center',
        width: '100%',
        backgroundColor: '#ddd',
        marginTop: 12,
        height: 120,
    },
    img: {
        width: 100,
        height: 90,
        borderRadius: 10,
        marginHorizontal: 12
    },
    txt: {
        fontSize: 20,
        color: '#333',
        fontWeight: 'bold'
    }
})

export default memo(moveAnimation, (prevProps, nextProps) => {
    return true
})