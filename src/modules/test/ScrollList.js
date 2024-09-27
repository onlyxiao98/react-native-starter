import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, ActivityIndicator } from 'react-native';

const DATA_PER_PAGE = 10;

const MyComponent = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    // Simulate fetching data from an API
    const newData = await fetchSomeData(page);
    setData((prevData) => [...prevData, ...newData]);
    setIsLoading(false);
  };

  const fetchSomeData = async (currentPage) => {
    // Simulated data fetching function
    return new Promise((resolve) => {
      setTimeout(() => {
        const newData = Array.from({ length: DATA_PER_PAGE }, (_, index) => ({
          id: (currentPage - 1) * DATA_PER_PAGE + index,
          text: `Item ${currentPage * DATA_PER_PAGE + index}`,
        }));
        resolve(newData);
      }, 1000);
    });
  };

  const handleScroll = (event) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
    const isCloseToBottom =
      layoutMeasurement.height + contentOffset.y >= contentSize.height - 20;

    if (isCloseToBottom && !isLoading) {
      fetchData();
    }
  };

  const renderItems = () =>
    data.map((item) => (
      <View key={item.id} style={{ padding: 20 }}>
        <Text>{item.text}</Text>
      </View>
    ));

  return (
    <ScrollView onScroll={handleScroll}>
      {renderItems()}
      {isLoading && <ActivityIndicator style={{ marginVertical: 20 }} size="large" color="#0000ff" />}
    </ScrollView>
  );
};

export default MyComponent;
