import React, { useState, useEffect } from 'react';
import { FlatList, View, Text, ActivityIndicator } from 'react-native';

const DATA_PER_PAGE = 10;

const MyComponent = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    let curPage = page + 1
    setPage(curPage)
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

  const renderItem = ({ item }) => (
    <View style={{ padding: 20 }}>
      <Text>{item.text}</Text>
    </View>
  );

  const renderFooter = () => {
    if (!isLoading) return null;
    return <ActivityIndicator style={{ marginVertical: 20 }} size="large" color="#0000ff" />;
  };
  
  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
      onEndReached={fetchData}
      onEndReachedThreshold={0.1}
      ListFooterComponent={renderFooter}
    />
  );
};

export default MyComponent;
