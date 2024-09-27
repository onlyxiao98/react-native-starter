import React, { useRef, useState, useEffect } from 'react';
import {
  Animated,
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Image,
  KeyboardAvoidingView
} from 'react-native';
import { useDebounce, useThrottle } from '../../utils/commonHooks'
import SettingIcon from '../../../assets/images/icons/arrow-back.png'

const UAnimated = () => {
  // fadeAnim will be used as the value for opacity. Initial Value: 0
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const MoveAnim = useRef(new Animated.Value(0)).current;

  const fadeIn = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 5000,
      useNativeDriver: true,
    }).start();
  };

  const fadeOut = () => {
    // Will change fadeAnim value to 0 in 3 seconds
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 3000,
      useNativeDriver: true,
    }).start();
  };

  const toBottom = () => {
    Animated.timing(MoveAnim, {
      toValue: 100,
      duration: 3000,
      useNativeDriver: true,
    }).start();
  }

  const [input, setInput] = useState('');
  const [scrollPosition, setScrollPosition] = useState(0);

   // 使用防抖 Hook
  const debouncedInput = useDebounce(input, 500);

  // 使用节流 Hook
  const throttledScrollPosition = useThrottle(scrollPosition, 1000);

  // 模拟滚动事件
  const handleScroll = (event) => {
    setScrollPosition(event.nativeEvent.contentOffset.y);
    // console.log('position', event.nativeEvent.contentOffset.y);
  };

  const viewRef = useRef(null);
  useEffect(()=>{
    setTimeout(() => {
      viewRef.current.setNativeProps(
        {
          style: {
            backgroundColor: 'red',
            width: 200,
          },
        }
      )
    }, 3000);
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <KeyboardAvoidingView>
          <View>
            <Text selectable={true} selectionColor={'#ddd'} style={styles.txt}>TestDemo</Text>
            <Image source={SettingIcon} tintColor={'red'} blurRadius={1} style={{width: 30, height: 30, marginBottom: 12}}/>
            <View ref={viewRef} style={{width: 100, height: 50, backgroundColor: 'pink'}} onLayout={(e)=>{console.log(e.nativeEvent)}}></View>
          </View>
          <Animated.View
            style={[
              styles.fadingContainer,
              {
                // Bind opacity to animated value
                opacity: fadeAnim,
                transform: [{translateY: MoveAnim}],
              },
            ]}>
            <Text style={styles.fadingText}>Fading View!</Text>
          </Animated.View>
          <View style={styles.buttonRow}>
            <TouchableOpacity onPress={fadeIn}>
              <Text>Fade In</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={fadeOut}>
              <Text>Fade Out</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={toBottom}>
              <Text>To Bottom</Text>
            </TouchableOpacity>
          </View>
          <ScrollView onScroll={handleScroll} scrollEventThrottle={16}>
            <View style={styles.container}>
                <TextInput
                  style={styles.input}
                  placeholder="Type something..."
                  value={input}
                  onChangeText={setInput}
                />
                <Text>Debounced Input: {debouncedInput}</Text>
                <Text>Position: {throttledScrollPosition}</Text>
            </View>
            
          </ScrollView>
          <View style={styles.box}></View>
          <View style={[styles.box, {backgroundColor: 'pink', padding: 12, borderWidth: 5, borderColor: 'red'}]}></View>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fadingContainer: {
    padding: 20,
    backgroundColor: 'powderblue',
  },
  fadingText: {
    fontSize: 28,
  },
  buttonRow: {
    flexBasis: 100,
    justifyContent: 'space-evenly',
    marginVertical: 16,
    height: 120,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    width: '100%',
    marginBottom: 20,
    padding: 10,
  },
  txt: {
    fontSize: 20,
    color: 'blue',
    textShadowOffset: {width: 2, height: 2},
    textShadowRadius: 2,
    textShadowColor: '#999',
    marginBottom: 12,
    textDecorationLine: 'line-through'
  },
  box: {
    width: 100,
    height: 100,
    backgroundColor: 'red',
  }
});

export default UAnimated;