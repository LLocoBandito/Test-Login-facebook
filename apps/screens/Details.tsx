import { View, Text, StyleSheet } from "react-native";
import React from "react";

const Details = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Halaman Detail</Text>
      <Text>Konten Anda berikutnya ada di sini.</Text>
    </View>
  );
};

export default Details;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
