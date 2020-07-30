import React from "react";
import { View, StyleSheet, FlatList, Button, Alert } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import ProductItem from "../../Components/ProductItem/ProductItem";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../../Components/HeaderButton/HeaderButton";
import Colors from "../../Constants/Colors";
import * as actions from "../../redux/product/actions";

const ProductUserScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const navigateToEditScreen = (pId) => {
    navigation.navigate("EditScreen", { pId });
  };

  const deleteHandler = (id) => {
    Alert.alert("آیا مطمئن هستید؟", "آیا میخواهید این آیتم را حذف کنید ؟", [
      { text: "خیر", style: "default" },
      {
        text: "بله",
        style: "destructive",
        onPress: () => {
          dispatch(actions.removeProduct(id));
        },
      },
    ]);
  };

  const currentProducts = useSelector((state) => state.products.userProduct);
  return (
    <View style={styles.productScreen}>
      <FlatList
        keyExtractor={(item) => item.id}
        data={currentProducts}
        renderItem={({ item }) => (
          <ProductItem
            title={item.title}
            imageUrl={item.imageUrl}
            price={item.price}
            onSelect={() => {}}
          >
            <Button
              title="حذف محصول"
              onPress={deleteHandler.bind(this, item.id)}
              color={Colors.primary}
            />
            <Button
              title="ویرایش محصول"
              onPress={() => {
                navigateToEditScreen(item.id);
              }}
              color={Colors.primary}
            />
          </ProductItem>
        )}
      />
    </View>
  );
};
ProductUserScreen.navigationOptions = ({ navigation }) => {
  return {
    headerTitle: "مدیریت محصولات",
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
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="menu"
          iconName={
            Platform.OS === "android" ? "md-add-circle" : "ios-add-circle"
          }
          onPress={() => {
            navigation.navigate("EditScreen");
          }}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  productScreen: {
    flex: 1,
  },
});

export default ProductUserScreen;
