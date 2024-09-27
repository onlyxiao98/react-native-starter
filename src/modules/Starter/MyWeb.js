import Webview from 'react-native-webview'
import { View, Dimensions, StyleSheet } from 'react-native'

const MyWeb = () => {
    return (
        // <Webview originWhitelist={['*']} source={{html: `<h1>Hello World</h1>`}}  injectedJavaScript={`alert("Hello, this is injected JavaScript!");`} style={{flex: 1}} />
        <Webview source={{uri: 'https://www.baidu.com/'}}  injectedJavaScript={`alert("Hello, this is injected JavaScript!");`} style={{flex: 1}} />
    )
}

const WebContainer = () => {
    return (
        <View style={[styles.container]}>
            <MyWeb />
        </View>
    )
}

const styles = StyleSheet.create(
    {
        container: {
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').height,
        }
    }
)

export default WebContainer