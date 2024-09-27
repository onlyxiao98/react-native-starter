import React, { useState, useEffect, useRef, useCallback } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Button } from 'react-native'

const StatePractice = () => {
    const [number, setNumber] = useState(0);
    return (
      <>
        <Text>{number}</Text>
        <Button title="+3" onPress={() => {
          setNumber((number)=>number + 1);
          setNumber((number)=>number + 1);
          setNumber((number)=>number + 1);
        }}></Button>
      </>
    )
}

const EffectPractice = () => {

}

const RefPractice = () => {
    const [startTime, setStartTime] = useState(null);
    const [now, setNow] = useState(null)
    const intervalRef = useRef(null)

    function handleStart() {
        setStartTime(Date.now())
        setNow(Date.now())

        clearInterval(intervalRef.current)
        intervalRef.current = setInterval(() => {
            setNow(Date.now())
        }, 10)
    }
    function handleStop() {
        clearInterval(intervalRef.current)
    }

    let secondsPassed = 0;
    if (startTime != null && now != null) {
        secondsPassed = (now - startTime) / 1000;
    }

    return (
        <>
            <Text>时间过去了{secondsPassed.toFixed(3)}</Text>
            <Button title="start" onPress={handleStart}></Button>
            <Button title="stop" onPress={handleStop}></Button>
        </>
    )
}


// 按钮组件
const MyButton = React.memo(({ onPress, children, count }) => {
    console.log('Button rendered'+count);
    return (
        <>
            <TouchableOpacity onPress={onPress}>
                <Text>{children}</Text>
            </TouchableOpacity>
        </>
    )
  });
  
  const CallbackPractice = () => {
    const [count, setCount] = useState(0);
  
    // 未使用 useCallback 的函数
    const handleClickWithoutUseCallback = () => {
      setCount(count + 1);
    };
    // 使用 useCallback 的函数
    const handleClickWithUseCallback = useCallback(() => {
      setCount(count - 1);
    }, [count]);
  
    return (
      <View>
        <Text>Count: {count}</Text>
        <MyButton count={count} onPress={handleClickWithoutUseCallback} children="Increment without useCallback"></MyButton>
        <MyButton count={count} onPress={handleClickWithUseCallback} children="decrement with useCallback"></MyButton>
      </View>
    );
  };
  

const DebounceHooks = () => {
  
}

export {
    StatePractice,
    EffectPractice,
    RefPractice,
    CallbackPractice,
    DebounceHooks,
}