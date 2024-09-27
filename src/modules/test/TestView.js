import React from 'react'
import { Text, Alert, View } from 'react-native'
import { LongPressGestureHandler, State, FlingGestureHandler, Directions, RectButton, BaseButton } from 'react-native-gesture-handler'

// 长按
// const LongPressButton = () => (
//   <LongPressGestureHandler
//     onHandlerStateChange={({ nativeEvent }) => {
//       if (nativeEvent.state === State.ACTIVE) {
//         Alert.alert("I'm being pressed for so long");
//       }
//     }}
//     minDurationMs={800}>
//     <Text>长按手势</Text>
//   </LongPressGestureHandler>
// );

// 扔
// const LongPressButton = () => (
//   <FlingGestureHandler
//     direction={Directions.RIGHT | Directions.LEFT}
//     onHandlerStateChange={({ nativeEvent }) => {
//       if (nativeEvent.state === State.ACTIVE) {
//         Alert.alert("I'm flinged!");
//       }
//     }}>
//     <Text>扔手势</Text>
//   </FlingGestureHandler>
// );

// Accessible:
const AccessibleButton = () => (
  <BaseButton onPress={()=>{
    Alert.alert("I'm being pressed for so long");
  }}>
    <View accessible accessibilityRole="button">
      <Text>Bar</Text>
    </View>
  </BaseButton>
);

export default AccessibleButton