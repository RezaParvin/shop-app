import React, { useRef, useEffect } from "react";
import ShopNavigator from "./shopNavigator";
import { NavigationActions } from "react-navigation";
import { useSelector } from "react-redux";

const ContainerShopNavigator = () => {
  const isAuth = useSelector((state) =>state.auth.token);
  const navRef = useRef();

  useEffect(() => {
    if (!isAuth) {
      navRef.current.dispatch(NavigationActions.navigate({ routeName: "Auth" }));
    }
  },[isAuth]);

  return <ShopNavigator ref={navRef} />;
};

export default ContainerShopNavigator;
