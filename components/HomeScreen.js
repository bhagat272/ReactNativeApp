import React, { useEffect, useRef } from 'react';
import { View, FlatList, TouchableOpacity, ImageBackground, StyleSheet, Animated, Text, Button } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../redux/slices/productsSlice';
import { addToCart } from '../redux/slices/cartSlice';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons'; // Make sure to install @expo/vector-icons

const HomeScreen = () => {
  const products = useSelector((state) => state.products.items);
  const status = useSelector((state) => state.products.status);
  const dispatch = useDispatch();
  const animations = useRef([]);
  const flatListRef = useRef();
  const navigation = useNavigation();

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  useEffect(() => {
    animations.current = products.map(() => new Animated.Value(-500));
    products.forEach((_, index) => {
      Animated.timing(animations.current[index], {
        toValue: 0,
        duration: 500,
        delay: index * 100,
        useNativeDriver: true,
      }).start();
    });
  }, [products]);

  const renderItem = ({ item, index }) => {
    const animatedStyle = {
      transform: [{ translateX: animations.current[index] || new Animated.Value(0) }],
    };
    return (
      <Animated.View style={[styles.productContainer, animatedStyle]} key={item.id}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => navigation.navigate('ProductDetails', { product: item })}
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
        <Button 
          title="Add to Cart" 
          onPress={() => dispatch(addToCart(item))} 
        />
      </Animated.View>
    );
  };

  const handleScrollToTop = () => {
    flatListRef.current.scrollToOffset({ animated: true, offset: 0 });
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />
      <TouchableOpacity style={styles.scrollTopButton} onPress={handleScrollToTop}>
        <MaterialIcons name="arrow-upward" size={24} color="white" />
      </TouchableOpacity>
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
    padding: 16,
  },
  backgroundImage: {
    borderRadius: 8,
    height: 200,
    justifyContent: 'flex-end',
  },
  textContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
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
  scrollTopButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    backgroundColor: '#ff6347',
    borderRadius: 25,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5,
  },
});
