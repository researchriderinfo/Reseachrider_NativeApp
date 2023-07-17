import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

const Carousel = () => {
  const carouselData = [
    {
      id: "1",
      image: require("../../assets/slider/slider-2.png"),
      title: "Attend live classes",
    },
    {
      id: "2",
      image: require("../../assets/slider/slider-1.png"),
      title: "Practice anytime",
    },
    {
      id: "3",
      image: require("../../assets/slider/slider-5.png"),
      title: "Every note you will ever need",
    },
    {
      id: "4",
      image: require("../../assets/slider/slider-6.png"),
      title: "Ask question?",
    },
  ];

  const windowWidth = Dimensions.get("window").width;
  const itemWidth = windowWidth + 16; // Add margin between items if needed

  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);

  const handleNext = () => {
    const nextIndex = currentIndex + 1;
    if (nextIndex < carouselData.length) {
      setCurrentIndex(nextIndex);
      flatListRef.current.scrollToIndex({ index: nextIndex });
    } else {
      setCurrentIndex(0);
      flatListRef.current.scrollToIndex({ index: 0, animated: false });
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 3000);

    return () => {
      clearInterval(timer);
    };
  }, [currentIndex]);

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={carouselData}
        renderItem={({ item }) => (
          <View>
            <Image source={item.image} style={styles.image} />
            <View style={styles.textContainer}>
              <Text style={styles.title}>{item.title}</Text>
            </View>
          </View>
        )}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(event) => {
          const newIndex = Math.floor(
            event.nativeEvent.contentOffset.x / itemWidth
          );
          setCurrentIndex(newIndex);
        }}
        getItemLayout={(data, index) => ({
          length: itemWidth,
          offset: itemWidth * index,
          index,
        })}
        initialNumToRender={carouselData.length}
        windowSize={3}
        snapToInterval={itemWidth}
      />

      <View style={styles.navigator}>
        {carouselData.map((item, index) => (
          <TouchableOpacity
            key={item.id}
            style={[styles.dot, currentIndex === index && styles.activeDot]}
            onPress={() => {
              setCurrentIndex(index);
              flatListRef.current.scrollToIndex({ index });
            }}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: Dimensions.get("window").width,
    height: 350,
    // resizeMode: "cover",
  },
  textContainer: {
    padding: 16,
  },
  title: {
    display: "flex",
    color: "#7d7d7d",
    marginBottom: 8,
    alignSelf: "center",
    fontSize: 24,
    fontWeight: "bold",
  },
  navigator: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 18,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#ccc",
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: "blue",
  },
});

export default Carousel;
