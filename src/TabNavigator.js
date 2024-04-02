import { Image, Text, View } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Dashboard from "./screens/Dashboard/Dashboard";
import SwapScreen from "./screens/SwapScreen/SwapScreen";
import BuyScreen from "./screens/BuyScreen/BuyScreen";
import Settings from "./screens/Settings/Settings";
import SendScreen from "./screens/SendScreen/SendScreen";
import ChartScreen from "./screens/ChartScreen/ChartScreen";
import SettingIcon from "./SvgIcon/SettingIcon";
import SwapIcon from "./SvgIcon/SwapIcon";
import WalletIcon from "./SvgIcon/WalletIcon";
import DiamondIcon from "./SvgIcon/DiamondIcon";

const Bottom = createBottomTabNavigator();

const BottomNavigator = () => {
  return (
    <Bottom.Navigator
      initialRouteName="Dashboard"
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {
          position: "absolute",
          bottom: 10,
          left: 27,
          right: 20,
          backgroundColor: "#F4F7FA",
          width: "87%",
          height: 64,
          borderRadius: 15,
          alignSelf: "center",
        },
      }}
    >
      <Bottom.Screen
        name="ChartScreen"
        component={ChartScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                width: 50,
                height: 50,
                borderRadius: 15,
                backgroundColor: focused ? "#F19220" : "transparent",
              }}
            >
              <DiamondIcon
                color={focused ? "#ffffff" : "#9F9FA0"}
                style={{
                  width: 27,
                  height: 22,
                  tintColor: focused ? "#ffffff" : "#9F9FA0",
                }}
              />
            </View>
          ),
        }}
      />
      <Bottom.Screen
        name="BuyScreen"
        component={BuyScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                width: 50,
                height: 50,
                borderRadius: 15,
                backgroundColor: focused ? "#F19220" : "transparent",
                marginRight: "30%",
              }}
            >
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: "800",
                  color: focused ? "#ffffff" : "#9F9FA0",
                }}
              >
                $
              </Text>
              {/* <Image
                source={require("../src/assets/images/HomeTab.png")}
                style={{
                  width: 27,
                  height: 22,
                  tintColor: focused ? "#ffffff" : "#9F9FA0",
                }}
              /> */}
            </View>
          ),
        }}
      />
      <Bottom.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                width: 50,
                height: 50,
                borderRadius: 15,
                backgroundColor: focused ? "#F19220" : "transparent",
              }}
            >
              <WalletIcon
                color={focused ? "#ffffff" : "#9F9FA0"}
                style={{
                  width: 27,
                  height: 22,
                  tintColor: focused ? "#ffffff" : "#9F9FA0",
                }}
              />
            </View>
          ),
        }}
      />
      <Bottom.Screen
        name="SwapScreen"
        component={SwapScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                width: 50,
                height: 50,
                borderRadius: 15,
                backgroundColor: focused ? "#F19220" : "transparent",
              }}
            >
              <SwapIcon
                color={focused ? "#ffffff" : "#9F9FA0"}
                style={{
                  width: 25,
                  height: 25,
                }}
              />
            </View>
          ),
        }}
      />
      <Bottom.Screen
        name="Settings"
        component={Settings}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                width: 50,
                height: 50,
                borderRadius: 15,
                backgroundColor: focused ? "#F19220" : "transparent",
              }}
            >
              <SettingIcon
                color={focused ? "#ffffff" : "#9F9FA0"}
                style={{
                  width: 25,
                  height: 25,
                }}
              />
            </View>
          ),
        }}
      />
    </Bottom.Navigator>
  );
};

export default BottomNavigator;
