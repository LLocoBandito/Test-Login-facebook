import { View, Text, Button, StyleSheet } from "react-native";
import React from "react";
import { NavigationProp } from "@react-navigation/native";
import { FIREBASE_AUTH } from "../../FirebaseConfig";

interface RouterProps {
  navigation: NavigationProp<any, any>;
}

const Home = ({ navigation }: RouterProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Selamat Datang!</Text>
      <Text style={styles.subtitle}>Anda telah berhasil login.</Text>

      <View style={styles.buttonWrapper}>
        <Button
          onPress={() => navigation.navigate("detail")}
          title="Buka Detail"
          color="#007BFF"
        />
      </View>

      <View style={styles.buttonWrapper}>
        <Button
          onPress={() => FIREBASE_AUTH.signOut()} // Logika Logout
          title="Logout"
          color="#DC3545"
        />
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#FFF",
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
    fontWeight: "600",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 30,
  },
  buttonWrapper: {
    width: "80%",
    marginVertical: 10,
  },
});
