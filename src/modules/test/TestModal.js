import React, { Component } from "react"
import { withState } from 'recompose'
import { set, get, remove, clear } from '../../utils/storage'
import dayjs from 'dayjs'
var relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)

import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  Button,
  Dimensions
} from "react-native"

const enhance = withState('counter', 'setCounter', 0)
const Counter = enhance(({ counter, setCounter }) =>
  <View>
    <Text> Count: {counter}</Text>
    <Button onPress={() => setCounter(counter => counter + 1)} title="Increment"></Button>
    <Button onPress={() => setCounter(counter => counter - 1)} title="Decrement"></Button>
    <Button title="设置" onPress={() => {
      set("name", {name: "布布"})
    }} />
    <Button title="获取" onPress={ async () => {
      const msg = await get("name")
      console.log('msg', msg)
    }} />
    <Button title="移除" onPress={() => {
      remove("name")
    }} />
    <Button title="清空" onPress={() => {
      clear()
    }} />
  </View>
)

class TestModal extends Component {
  state = {
    modalVisible: false
  };

//   setModalVisible = (visible) => {
//     this.setState({ modalVisible: visible });
//   }
  sendDataToParent = () => {
    this.props.sendData(!this.props.modalVisible)
  }

  render() {
    // const { modalVisible } = this.state;
    const {modalVisible, modalContent, modalButton} = this.props
    return (
      <View style={[styles.modalMain]}>
        <View style={[modalVisible && styles.modalMask]}>
            <View style={styles.centeredView}>
                <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    // this.setModalVisible(!modalVisible);
                    this.sendDataToParent()
                }}
                >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                    <Text>{dayjs('2024-5-20').format('DD/MM/YYYY')}</Text>
                    <Text>{dayjs('2024-5-20').fromNow()}</Text>
                    <Text style={styles.modalText}>{modalContent}</Text>
                    <Counter/>
                    <TouchableHighlight
                        style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                        // onPress={() => {
                        // this.setModalVisible(!modalVisible);
                        // }}
                        onPress={this.sendDataToParent}
                    >
                        <Text style={styles.textStyle}>{modalButton}</Text>
                    </TouchableHighlight>
                    </View>
                </View>
                </Modal>
            </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  modalMain: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    position: 'relative',
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalMask: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    position: 'absolute',
    left: 0,
    top: 0,
    zIndex: 1
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: 'absolute',
    zIndex: 2,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});

export default TestModal;