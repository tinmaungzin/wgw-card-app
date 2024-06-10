import React from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import CardItem from "../components/CardItem";
import EmptyCard from "../components/EmptyCard";
import { RootState } from "../redux/store";

export default function CardListScreen() {
  const cards = useSelector((state: RootState) => state.cards);

  return (
    <View style={styles.container}>
      {cards.length === 0 ? (
        <EmptyCard />
      ) : (
        <FlatList
          data={cards}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => <CardItem card={item} />}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "white",
  },
});
