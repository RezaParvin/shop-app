import React, { useEffect, useCallback } from "react";
import {
  FlatList,
  Button,
  Platform,
  ActivityIndicator,
  View,
  Text,
  StyleSheet,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import ProductItem from "../../Components/ProductItem/ProductItem";
import * as actions from "../../redux/cart/actions";
import * as productActions from "../../redux/product/actions";
import HeaderButton from "../../Components/HeaderButton/HeaderButton";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import Colors from "../../Constants/Colors";

const ProductOverviewScreen = ({ navigation }) => {
  const products = useSelector((state) => state.products.availableProduct);
  const userProducts = useSelector((state) => state.products.userProduct);
  const isLoading = useSelector((state) => state.products.isLoading);
  const error = useSelector((state) => state.products.error);


  const dispatch = useDispatch();

  const fetchProducts = useCallback(() => {
    dispatch(productActions.setProducts());
  }, [dispatch]);

  useEffect(() => {
    const willFocus = navigation.addListener("willFocus", fetchProducts);
    return () => {
      willFocus.remove();
    };
  }, [fetchProducts]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const onOpenDetail = (id, title) => {
    navigation.navigate("ProductDetail", {
      productId: id,
      productTitle: title,
    });
  };

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.mainText}>
          خطایی رخ داده است لطفا دوباره سعی کنید
        </Text>
      </View>
    );
  }

  if (!isLoading && !error && userProducts.length === 0) {
    return (
      <View style={styles.center}>
        <Text style={styles.mainText}>هیج محصولی وجود ندارد</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={userProducts}
      keyExtractor={(item) => item.id}
      renderItem={({ item: { id, title, imageUrl, price } }) => (
        <ProductItem
          title={title}
          imageUrl={imageUrl}
          price={price}
          onSelect={() => {
            onOpenDetail(id, title);
          }}
        >
          <Button
            title="جزئیات"
            onPress={() => {
              onOpenDetail(id, title);
            }}
            color={Colors.primary}
          />
          <Button
            title="اضافه به سبد"
            onPress={() => {
              dispatch(actions.addToCart({ id, title, imageUrl, price }));
            }}
            color={Colors.primary}
          />
        </ProductItem>
      )}
    />
  );
};

ProductOverviewScreen.navigationOptions = ({ navigation }) => {
  return {
    headerTitle: "معرفی محصولات",
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="cart"
          iconName={Platform.OS === "android" ? "md-cart" : "ios-cart"}
          onPress={() => {
            navigation.navigate("Cart");
          }}
        />
      </HeaderButtons>
    ),
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="menu"
          iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
          onPress={() => {
            navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  mainText: {
    fontFamily: "iran-sans-bold",
    fontSize: 22,
  },
});

export default ProductOverviewScreen;
