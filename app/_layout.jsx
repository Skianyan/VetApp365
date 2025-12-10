import { Stack } from "expo-router";
import { PaperProvider } from "react-native-paper";
import { MascotasProvider } from "../context/MascotasContext";

export default function RootLayout() {
  return (
    <PaperProvider>
      <MascotasProvider>
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        />
      </MascotasProvider>
    </PaperProvider>
  );
}

