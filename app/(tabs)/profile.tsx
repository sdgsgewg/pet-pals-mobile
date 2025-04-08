import { StyleSheet, TouchableOpacity, Text, useWindowDimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { useRouter } from "expo-router";
import { useUsers } from "../context/users/UsersContext";

export default function ProfileScreen() {
  const router = useRouter();
  const userContext = useUsers();
  const { width } = useWindowDimensions();

  const isLoggedIn = userContext?.isLoggedIn ?? false;
  const loggedInUser = userContext?.loggedInUser;
  const logoutUser = userContext?.logoutUser ?? (() => {});

  const handleLogin = () => {
    router.push("/auth/login");
  };

  const handleRegister = () => {
    router.push("/auth/register");
  };

  const handleTransactions = () => {
    const role = loggedInUser?.role?.name?.toLowerCase();
    if (role === "adopter") {
      router.push("/transactions");
    }
    // Future support for owner and provider roles
  };

  const handleLogout = () => {
    logoutUser();
    router.push("/");
  };

  const isSmallScreen = width < 400;

  return (
    <SafeAreaView style={styles.safeArea}>
      <ParallaxScrollView
        headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
        headerImage={
          <IconSymbol
            size={310}
            color="#808080"
            name="chevron.left.forwardslash.chevron.right"
            style={styles.headerImage}
          />
        }
      >
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title">Profile</ThemedText>
        </ThemedView>

        <ThemedText style={styles.textInfo}>Welcome to your profile page.</ThemedText>

        {isLoggedIn ? (
          <ThemedView
            style={[
              styles.buttonContainer,
              { flexDirection: isSmallScreen ? "column" : "row" },
            ]}
          >
            <TouchableOpacity style={styles.button} onPress={handleTransactions}>
              <Text style={styles.buttonText}>
                {loggedInUser?.role?.name?.toLowerCase() === "adopter"
                  ? "View Transactions"
                  : "View Transaction Request"}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleLogout}>
              <Text style={styles.buttonText}>Logout</Text>
            </TouchableOpacity>
          </ThemedView>
        ) : (
          <ThemedView
            style={[
              styles.buttonContainer,
              { flexDirection: isSmallScreen ? "column" : "row" },
            ]}
          >
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleRegister}>
              <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>
          </ThemedView>
        )}
      </ParallaxScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 10,
  },
  textInfo: {
    marginBottom: 20,
    fontSize: 16,
  },
  buttonContainer: {
    marginTop: 20,
    gap: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#1E90FF",
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
