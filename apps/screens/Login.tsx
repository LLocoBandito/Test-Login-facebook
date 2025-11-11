import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  FacebookAuthProvider,
  signInWithCredential,
} from "firebase/auth";
import { FIREBASE_AUTH } from "../../FirebaseConfig";
import { FontAwesome } from "@expo/vector-icons";
import { LoginManager, AccessToken, Settings } from "react-native-fbsdk-next";

// --- Inisialisasi Facebook SDK ---
Settings.initializeSDK();

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const auth = FIREBASE_AUTH;

  // --- LOGIN EMAIL / PASSWORD ---
  const signIn = async () => {
    setLoading(true);
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      console.log("User logged in:", response.user.email);
      Alert.alert("Login Berhasil", `Selamat datang, ${response.user.email}`);
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert("Login Gagal", error.message);
        console.error("Error logging in:", error);
      } else {
        Alert.alert("Login Gagal", "Terjadi kesalahan tak diketahui.");
      }
    } finally {
      setLoading(false);
    }
  };

  // --- REGISTER EMAIL / PASSWORD ---
  const signUp = async () => {
    setLoading(true);
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("User registered:", response.user.email);
      Alert.alert("Registrasi Berhasil", "Akun berhasil dibuat!");
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert("Registrasi Gagal", error.message);
        console.error("Error registering:", error);
      } else {
        Alert.alert("Registrasi Gagal", "Terjadi kesalahan tak diketahui.");
      }
    } finally {
      setLoading(false);
    }
  };

  // --- FACEBOOK LOGIN ---
  const signInWithFacebook = async () => {
    setLoading(true);
    try {
      const result = await LoginManager.logInWithPermissions([
        "public_profile",
        "email",
      ]);
      if (result.isCancelled) {
        console.log("Facebook Sign-In dibatalkan oleh user");
        return;
      }

      const data = await AccessToken.getCurrentAccessToken();
      if (!data || !data.accessToken) {
        throw new Error("Gagal mendapatkan access token dari Facebook");
      }

      const facebookCredential = FacebookAuthProvider.credential(
        data.accessToken
      );
      const userCredential = await signInWithCredential(
        auth,
        facebookCredential
      );

      console.log("Login Facebook sukses:", userCredential.user.email);
      Alert.alert(
        "Login Berhasil",
        `Halo ${userCredential.user.displayName || "Pengguna"}`
      );
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert("Facebook Sign-In Gagal", error.message);
        console.error("Facebook Sign-In Gagal:", error);
      } else {
        Alert.alert(
          "Facebook Sign-In Gagal",
          "Terjadi kesalahan tak diketahui."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.innerContainer}>
        <Text style={styles.title}>Selamat Datang!</Text>
        <Text style={styles.subtitle}>Masuk untuk melanjutkan.</Text>

        <TextInput
          value={email}
          style={styles.input}
          placeholder="Email"
          autoCapitalize="none"
          keyboardType="email-address"
          onChangeText={setEmail}
          placeholderTextColor="#999"
        />

        <TextInput
          value={password}
          style={styles.input}
          placeholder="Password"
          autoCapitalize="none"
          secureTextEntry
          onChangeText={setPassword}
          placeholderTextColor="#999"
        />

        {loading ? (
          <ActivityIndicator
            size="large"
            color="#1E3A8A"
            style={styles.loader}
          />
        ) : (
          <>
            <TouchableOpacity
              style={styles.buttonPrimary}
              onPress={signIn}
              disabled={!email || !password}
            >
              <Text style={styles.buttonText}>MASUK</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonSecondary} onPress={signUp}>
              <Text style={styles.buttonTextSecondary}>BUAT AKUN</Text>
            </TouchableOpacity>

            <View style={styles.dividerContainer}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>ATAU</Text>
              <View style={styles.dividerLine} />
            </View>

            <TouchableOpacity
              style={[styles.socialButton, styles.facebookButton]}
              onPress={signInWithFacebook}
            >
              <FontAwesome
                name="facebook"
                size={20}
                color="white"
                style={styles.socialIcon}
              />
              <Text style={styles.socialButtonText}>Masuk dengan Facebook</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </KeyboardAvoidingView>
  );
};

export default Login;

// --- STYLING ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F4F8",
  },
  innerContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 30,
    width: "100%",
  },
  title: {
    fontSize: 32,
    fontWeight: "800",
    color: "#1E3A8A",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#6B7280",
    marginBottom: 40,
    textAlign: "center",
  },
  input: {
    marginVertical: 10,
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    paddingHorizontal: 15,
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    fontSize: 16,
  },
  loader: {
    marginVertical: 20,
  },
  buttonPrimary: {
    backgroundColor: "#1E3A8A",
    padding: 16,
    borderRadius: 12,
    width: "100%",
    alignItems: "center",
    marginTop: 20,
    elevation: 4,
  },
  buttonSecondary: {
    backgroundColor: "#E0E7FF",
    padding: 16,
    borderRadius: 12,
    width: "100%",
    alignItems: "center",
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#1E3A8A",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "700",
  },
  buttonTextSecondary: {
    color: "#1E3A8A",
    fontSize: 18,
    fontWeight: "700",
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginVertical: 35,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#D1D5DB",
  },
  dividerText: {
    color: "#9CA3AF",
    marginHorizontal: 10,
    fontSize: 14,
    fontWeight: "500",
  },
  socialButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: 50,
    borderRadius: 12,
    elevation: 3,
  },
  facebookButton: {
    backgroundColor: "#1877F2",
  },
  socialIcon: {
    marginRight: 10,
  },
  socialButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "700",
  },
});
