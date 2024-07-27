import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, FlatList, Animated, TouchableOpacity, ImageBackground } from 'react-native';

const HomeScreen = () => {
  const [products, setProducts] = useState([]);
  const [pressedIndex, setPressedIndex] = useState(null);
  const animations = useRef([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('https://fakestoreapi.com/products');
      const data = await response.json();
      setProducts(data);

      // Initialize animations
      animations.current = data.map(() => new Animated.Value(-500));

      // Start animations
      data.forEach((_, index) => {
        Animated.timing(animations.current[index], {
          toValue: 0,
          duration: 500,
          delay: index * 100,
          useNativeDriver: true,
        }).start();
      });
    } catch (error) {
      console.error(error);
    }
  };

  const renderItem = ({ item, index }) => {
    const animatedStyle = {
      transform: [{ translateX: animations.current[index] || new Animated.Value(0) }],
    };

    const isPressed = index === pressedIndex;

    return (
      <Animated.View style={[styles.productContainer, animatedStyle, isPressed && styles.pressedProductContainer]}>
        <TouchableOpacity
          activeOpacity={1}
          onPressIn={() => setPressedIndex(index)}
          onPressOut={() => setPressedIndex(null)}
        >
          <ImageBackground
            source={{ uri: item.image }}
            style={styles.backgroundImage}
            imageStyle={{ borderRadius: 8 }}
          >
            <View style={styles.textContainer}>
              <Text style={styles.productTitle}>{item.title}</Text>
              <Text style={styles.productPrice}>${item.price}</Text>
            </View>
          </ImageBackground>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  productContainer: {
    backgroundColor: '#fff',
    marginVertical: 8,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    transition: 'all 0.3s',
  },
  pressedProductContainer: {
    shadowOpacity: 0.3,
    elevation: 8,
  },
  backgroundImage: {
    padding: 16,
    borderRadius: 8,
    height: 200, // Adjust the height as needed
    justifyContent: 'flex-end', // Align text at the bottom
  },
  textContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
    borderRadius: 8,
    padding: 8,
  },
  productTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  productPrice: {
    fontSize: 14,
    color: '#fff',
  },
});
