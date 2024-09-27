import { StyleSheet, Text, View, TouchableWithoutFeedback } from 'react-native'

const Switch = ({open, label, bgColor, color, setOpen}) => {
    
    return(
        <View style={[styles.container]}>
            <Text>{label}</Text>
            <View style={[styles.switch_bg,{backgroundColor: bgColor}]}>
                <TouchableWithoutFeedback onPress={()=>{
                   setOpen(!open)
                }}>
                   <View style={[ open ? [styles.switch_btn, styles.switch_btn_on] : styles.switch_btn, {backgroundColor: color}]}></View>
                </TouchableWithoutFeedback>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    switch_bg: {
        width: 64,
        height: 16,
        borderRadius: 8,
        backgroundColor: '#ccc',
        position: 'relative'
    },
    switch_btn: {
        backgroundColor: '#f5f5f5',
        width: 28,
        height: 28,
        borderRadius: 14,
        position: 'absolute',
        left: 0,
        top: -6
    },
    switch_btn_on: {
        left: 36,
    }
})

export default Switch