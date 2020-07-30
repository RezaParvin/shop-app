import React from "react";
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  TouchableNativeFeedback,
  StyleSheet,
  Image,
  Platform,
} from "react-native";
import Colors from "../../Constants/Colors";

const ProductItem = ({
  title,
  imageUrl,
  price,
  onSelect,
  children,
}) => {
  let CmpTouchable = TouchableOpacity;
  if (Platform.OS === "android" && Platform.Version >= 21) {
    CmpTouchable = TouchableNativeFeedback;
  }

  return (
    <View style={styles.product}>
      <CmpTouchable onPress={onSelect} useForeground>
        <View style={styles.container}>
          <View style={styles.imgContainer}>
            <Image source={{ uri: imageUrl }} style={styles.img} />
          </View>
          <View style={styles.detail}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.price}>{price}</Text>
          </View>
          <View style={styles.actions}>{children}</View>
        </View>
      </CmpTouchable>
    </View>
  );
};

const styles = StyleSheet.create({
  product: {
    height: 300,
    margin: 20,
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 6,
    borderRadius: 15,
    elevation: 5,
    backgroundColor: "white",
    overflow: "hidden",
  },
  container: {
    width: "100%",
    height: "100%",
  },
  imgContainer: {
    width: "100%",
    height: "65%",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    overflow: "hidden",
  },
  img: {
    width: "100%",
    height: "100%",
  },
  detail: {
    width: "100%",
    height: "15%",
    alignItems: "center",
    padding: 10,
    paddingVertical: 10,
  },
  actions: {
    height: "25%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
  },
  title: {
    fontFamily: "iran-sans",
    fontSize: 20,
  },
  price: {
    fontFamily: "iran-sans-bold",
    fontSize: 19,
  },
});

export default ProductItem;
