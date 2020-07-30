import React, { useReducer, useEffect, useCallback } from "react";
import { StyleSheet, View, ScrollView, Alert, Text } from "react-native";

import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../../Components/HeaderButton/HeaderButton";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../redux/product/actions";
import Input from "../../Components/Input/Input";
import Colors from "../../Constants/Colors";

const UPDATE_INPUT = "UPDATE_INPUT";

const formReducer = (state, action) => {
  if (action.type === UPDATE_INPUT) {
    const inputValues = { ...state.inputValues };
    inputValues[action.id] = action.value;
    const inputValidities = { ...state.inputValidities };
    inputValidities[action.id] = action.isValid;

    //check overall valid
    let overallValidity = true;
    for (const key in inputValidities) {
      overallValidity = overallValidity && inputValidities[key];
    }

    return {
      ...state,
      inputValues: inputValues,
      inputValidities: inputValidities,
      overallFormValidity: overallValidity,
    };
  }
  return state;
};

const ProductManageScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const currentId = navigation.getParam("pId");

  const targetProduct = useSelector((state) => {
    if (!currentId) return false;
    return state.products.userProduct.find((p) => p.id === currentId);
  });

  const error = useSelector((state) => state.products.error);

  const [formInputs, dispatchInput] = useReducer(formReducer, {
    inputValues: {
      title: targetProduct ? targetProduct.title : "",
      imageUrl: targetProduct ? targetProduct.imageUrl : "",
      price: targetProduct ? targetProduct.price : "",
      description: targetProduct ? targetProduct.description : "",
    },
    inputValidities: {
      title: targetProduct ? true : false,
      imageUrl: targetProduct ? true : false,
      price: targetProduct ? true : false,
      description: targetProduct ? true : false,
    },
    overallFormValidity: false,
  });

  const submitHandler = useCallback(() => {
    if (!formInputs.overallFormValidity) {
      Alert.alert("خطا", "لطفا تمام ورودی ها را چک کنید", [
        { text: "باشه", style: "default" },
      ]);
      return;
    }
    if (targetProduct) {
      dispatch(
        actions.updateProduct(
          currentId,
          formInputs.inputValues.title,
          formInputs.inputValues.price,
          formInputs.inputValues.imageUrl,
          formInputs.inputValues.description
        )
      );
    } else {
      dispatch(
        actions.addProduct(
          formInputs.inputValues.title,
          formInputs.inputValues.price,
          formInputs.inputValues.imageUrl,
          formInputs.inputValues.description
        )
      );
    }
    navigation.goBack();
  }, [dispatch, formInputs, currentId]);

  useEffect(() => {
    navigation.setParams({ submit: submitHandler });
  }, [submitHandler]);

  const onChangeTextHandler = useCallback(
    (id, value, isValid) => {
      dispatchInput({
        type: UPDATE_INPUT,
        id: id,
        value: value,
        isValid: isValid,
      });
    },
    [dispatchInput]
  );

  if (error) {
    return (
      <View style={styles.error}>
        <Text style={styles.errorText}>
          خطایی رخ داده است لطفا دوباره سعی کنید
        </Text>
      </View>
    );
  }

  return (
    <ScrollView>
      <Input
        id="title"
        label="عنوان محصول"
        errorLabel="نام محصول را درست وارد بکنید"
        initialValue={targetProduct ? targetProduct.title : ""}
        keyboardType="default"
        initialValidity={!!targetProduct}
        onChangeHandler={onChangeTextHandler}
        required
        returnKeyType="next"
      />
      <Input
        id="imageUrl"
        label="آدرس تصویر"
        errorLabel="آدرس تصویر وارد نشده است"
        keyboardType="default"
        initialValue={targetProduct ? targetProduct.imageUrl : ""}
        initialValidity={!!targetProduct}
        onChangeHandler={onChangeTextHandler}
        required
        returnKeyType="next"
      />
      {!targetProduct && (
        <Input
          id="price"
          label="قیمت"
          errorLabel="قیمت را درست وارد کنید"
          initialValue={targetProduct.price}
          initialValidity={!!targetProduct}
          keyboardType="default"
          onChangeHandler={onChangeTextHandler}
          required
          keyboardType="decimal-pad"
          returnKeyType="next"
        />
      )}
      <Input
        id="description"
        label="توضیحات"
        errorLabel="توضیحات محصول به درستی وارد نشده است"
        initialValue={targetProduct.description}
        initialValidity={!!targetProduct}
        keyboardType="default"
        onChangeHandler={onChangeTextHandler}
        multiline
        numberOfLines={3}
        required
        minLength={20}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  indicator: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  error: {
    alignItems: "center",
    justifyContent: "center",
  },
  errorText: {
    fontFamily: "iran-sans",
    fontSize:20
  },
});

ProductManageScreen.navigationOptions = ({ navigation }) => {
  const submitHandler = navigation.getParam("submit");
  return {
    headerTitle: navigation.getParam("pId")
      ? "ویرایش محصول"
      : "اضافه کردن محصول",
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="menu"
          iconName={
            Platform.OS === "android"
              ? "md-checkmark-circle"
              : "ios-checkmark-circle"
          }
          onPress={submitHandler}
        />
      </HeaderButtons>
    ),
  };
};

export default ProductManageScreen;
