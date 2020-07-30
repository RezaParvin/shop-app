import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  ScrollView,
} from "react-native";
import * as actions from "../../redux/cart/actions";
import { useSelector, useDispatch } from "react-redux";
import Colors from "../../Constants/Colors";

const ProductDetailScreen = ({ navigation }) => {
  const allProducts = useSelector((state) => state.products.availableProduct);
  const dispatch = useDispatch();
  const pId = navigation.getParam("productId");
  const currentProduct = allProducts.find((product) => product.id === pId);

  return (
    <ScrollView style={styles.product}>
      <Image source={{ uri: currentProduct.imageUrl }} style={styles.img} resizeMode='cover'/>
      <View style={styles.containerBtn}>
        <Button
          title="اضافه به سبد"
          color={Colors.primary}
          onPress={() => {
            dispatch(actions.addToCart(currentProduct));
          }}
        />
      </View>
      <Text style={styles.price}>{currentProduct.price}</Text>
      <Text style={styles.description}>{currentProduct.description}</Text>
    </ScrollView>
  );
};

ProductDetailScreen.navigationOptions = ({ navigation }) => {
  const pTitle = navigation.getParam("productTitle");
  return {
    headerTitle: pTitle,
  };
};

const styles = StyleSheet.create({
  img: {
    width: "100%",
    height: 300,
  },
  containerBtn: {
    alignItems: "center",
    marginVertical: 15,
  },
  price: {
    textAlign: "center",
    fontFamily: "iran-sans-bold",
    fontSize: 20,
  },
  description: {
    textAlign: "center",
    marginHorizontal: 20,
    fontFamily: "iran-sans",
    fontSize: 17,
  },
});

export default ProductDetailScreen;
