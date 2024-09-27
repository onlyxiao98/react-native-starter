import { useState, useEffect, useRef } from 'react';

/**
 * useDebounce Hook
 * @param {any} value - 需要防抖的值
 * @param {number} delay - 防抖延迟时间（毫秒）
 * @returns {any} - 防抖后的值
 */
const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // 设置一个定时器，在指定延迟后更新 debouncedValue
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // 清除上一个定时器，确保只有最后一次更新被应用
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};


/**
 * useThrottle Hook
 * @param {any} value - 需要节流的值
 * @param {number} limit - 节流时间间隔（毫秒）
 * @returns {any} - 节流后的值
 */
const useThrottle = (value, limit) => {
    const [throttledValue, setThrottledValue] = useState(value);
    const lastRan = useRef(Date.now());
  
    useEffect(() => {
      const handler = setTimeout(() => {
        if (Date.now() - lastRan.current >= limit) {
          setThrottledValue(value);
          lastRan.current = Date.now();
        }
      }, limit - (Date.now() - lastRan.current));
  
      // 清除上一个定时器
      return () => {
        clearTimeout(handler);
      };
    }, [value, limit]);
  
    return throttledValue;
  };

export {
    useDebounce,
    useThrottle
}
