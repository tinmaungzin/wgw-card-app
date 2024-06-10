import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Ionicons from "react-native-vector-icons/Ionicons";
import AddCardScreen from "../screens/AddCardScreen";
import CardListScreen from "../screens/CardListScreen";
import { TouchableOpacity } from "react-native";
import { Card } from "../types/common";

export type RootStackParamList = {
  Cards: undefined;
  AddCard: undefined;
  Pay: {
    card: Card;
  };
};

const Stack = createStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Cards">
      <Stack.Screen
        name="Cards"
        component={CardListScreen}
        options={({ navigation }) => ({
          headerRight: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate("AddCard")}
              style={{ marginRight: 15 }}
            >
              <Ionicons name="add-outline" size={30} />
            </TouchableOpacity>
          ),
          headerTitle: "Cards",
          headerTitleAlign: "center"
        })}
      />
      <Stack.Screen name="AddCard" component={AddCardScreen} options={{ headerTitle: "" }} />
    </Stack.Navigator>
  );
}
