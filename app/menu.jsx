import { useRouter } from "expo-router";
import { StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function MenuScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <View style={styles.contentWrapper}>
        <Text variant="headlineMedium" style={styles.title}>
          Menú Principal
        </Text>
        
        <Button
          mode="contained"
          onPress={() => router.push("/consulta-mascota")}
          style={styles.button}
          contentStyle={styles.buttonContent}
          icon="magnify"
        >
          Consulta de Mascota
        </Button>

        <Button
          mode="contained"
          onPress={() => router.push("/alta-mascota")}
          style={styles.button}
          contentStyle={styles.buttonContent}
          icon="plus-circle"
        >
          Alta de Mascota
        </Button>

        <Button
          mode="contained"
          onPress={() => router.push("/")}
          style={[styles.button, styles.buttonSalir]}
          contentStyle={styles.buttonContent}
          buttonColor="#FF3B30"
          icon="logout"
        >
          Salir
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
    marginBottom: 40,
    textAlign: "center",
  },
  button: {
    marginVertical: 10,
    width: "80%",
  },
  buttonSalir: {
    marginTop: 20,
  },
  buttonContent: {
    paddingVertical: 5,
  },
});
