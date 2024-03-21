import { Image, Text, View } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Dashboard from "./Dashboard/Dashboard";
import SwapScreen from "./SwapScreen/SwapScreen";
import BuyScreen from "./BuyScreen/BuyScreen";
import Settings from "./Settings/Settings";
import SendScreen from "./SendScreen/SendScreen";
import ChartScreen from "./ChartScreen/ChartScreen";

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
              <Image
                source={require("../src/assets/images/HomeTab.png")}
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
              <Image
                source={require("../src/assets/images/settingsWallet.png")}
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
              <Image
                source={require("../src/assets/images/swap.png")}
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
              <Image
                source={require("../src/assets/images/settings.png")}
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? "#ffffff" : "#9F9FA0",
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
