import { useRouter } from "expo-router";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, Text } from "react-native-paper";

export default function HomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <View style={styles.contentWrapper}>
        <Text variant="displayMedium" style={styles.title}>
          Veterinaria Rico
        </Text>
        <Text variant="titleLarge" style={styles.subtitle}>
          Bienvenido
        </Text>
        
        <Button
          mode="contained"
          onPress={() => router.push("/menu")}
          style={styles.button}
          contentStyle={styles.buttonContent}
        >
          Continuar
        </Button>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#E6F4FE",
    padding: 20,
  },
  contentWrapper: {
    width: "100%",
    maxWidth: 700,
    alignItems: "center",
  },
  title: {
    fontWeight: "bold",
    color: "#1a1a1a",
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: {
    color: "#666",
    marginBottom: 40,
  },
  button: {
    marginTop: 20,
  },
  buttonContent: {
    paddingVertical: 5,
    paddingHorizontal: 20,
  },
});
