import { useRouter } from "expo-router";
import { useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, Card, Dialog, Portal, Text, TextInput } from "react-native-paper";
import { useMascotas } from "../context/MascotasContext";

export default function AltaMascotaScreen() {
  const router = useRouter();
  const { agregarMascota } = useMascotas();

  const [formulario, setFormulario] = useState({
    nombre: "",
    especie: "",
    edad: "",
    peso: "",
    sexo: "",
    propietario: "",
    historialMedico: "",
    vacunas: "",
  });

  const [errores, setErrores] = useState({});
  const [mostrarDialogoExito, setMostrarDialogoExito] = useState(false);

  const validarFormulario = () => {
    const nuevosErrores = {};

    if (!formulario.nombre.trim()) {
      nuevosErrores.nombre = "El nombre es requerido";
    }

    if (!formulario.especie.trim()) {
      nuevosErrores.especie = "La especie es requerida";
    }

    if (!formulario.edad.trim()) {
      nuevosErrores.edad = "La edad es requerida";
    } else if (isNaN(formulario.edad) || parseFloat(formulario.edad) < 0) {
      nuevosErrores.edad = "La edad debe ser un número válido";
    }

    if (!formulario.peso.trim()) {
      nuevosErrores.peso = "El peso es requerido";
    } else if (isNaN(formulario.peso) || parseFloat(formulario.peso) <= 0) {
      nuevosErrores.peso = "El peso debe ser un número válido";
    }

    if (!formulario.sexo.trim()) {
      nuevosErrores.sexo = "El sexo es requerido";
    }

    if (!formulario.propietario.trim()) {
      nuevosErrores.propietario = "El propietario es requerido";
    }

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const manejarCambio = (campo, valor) => {
    setFormulario({ ...formulario, [campo]: valor });
    if (errores[campo]) {
      setErrores({ ...errores, [campo]: "" });
    }
  };

  const manejarEnvio = () => {
    if (validarFormulario()) {
      const nuevaMascota = {
        nombre: formulario.nombre.trim(),
        especie: formulario.especie.trim(),
        edad: parseFloat(formulario.edad),
        peso: parseFloat(formulario.peso),
        sexo: formulario.sexo.trim(),
        propietario: formulario.propietario.trim(),
        historialMedico: formulario.historialMedico.trim(),
        vacunas: formulario.vacunas.trim(),
      };

      agregarMascota(nuevaMascota);
      setMostrarDialogoExito(true);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
        <View style={styles.contentWrapper}>
          <View style={styles.formContainer}>
          <Text variant="headlineMedium" style={styles.title}>
            Alta de Mascota
          </Text>

          <Card style={styles.card}>
            <Card.Content>
              <TextInput
                label="Nombre *"
                value={formulario.nombre}
                onChangeText={(valor) => manejarCambio("nombre", valor)}
                mode="outlined"
                error={!!errores.nombre}
                style={styles.input}
              />
              {errores.nombre && (
                <Text variant="bodySmall" style={styles.errorText}>
                  {errores.nombre}
                </Text>
              )}

              <TextInput
                label="Especie *"
                value={formulario.especie}
                onChangeText={(valor) => manejarCambio("especie", valor)}
                mode="outlined"
                error={!!errores.especie}
                style={styles.input}
                placeholder="Ej: Perro, Gato, etc."
              />
              {errores.especie && (
                <Text variant="bodySmall" style={styles.errorText}>
                  {errores.especie}
                </Text>
              )}

              <TextInput
                label="Edad (años) *"
                value={formulario.edad}
                onChangeText={(valor) => manejarCambio("edad", valor)}
                mode="outlined"
                keyboardType="numeric"
                error={!!errores.edad}
                style={styles.input}
              />
              {errores.edad && (
                <Text variant="bodySmall" style={styles.errorText}>
                  {errores.edad}
                </Text>
              )}

              <TextInput
                label="Peso (kg) *"
                value={formulario.peso}
                onChangeText={(valor) => manejarCambio("peso", valor)}
                mode="outlined"
                keyboardType="numeric"
                error={!!errores.peso}
                style={styles.input}
              />
              {errores.peso && (
                <Text variant="bodySmall" style={styles.errorText}>
                  {errores.peso}
                </Text>
              )}

              <TextInput
                label="Sexo *"
                value={formulario.sexo}
                onChangeText={(valor) => manejarCambio("sexo", valor)}
                mode="outlined"
                error={!!errores.sexo}
                style={styles.input}
                placeholder="Ej: Macho, Hembra"
              />
              {errores.sexo && (
                <Text variant="bodySmall" style={styles.errorText}>
                  {errores.sexo}
                </Text>
              )}

              <TextInput
                label="Propietario *"
                value={formulario.propietario}
                onChangeText={(valor) => manejarCambio("propietario", valor)}
                mode="outlined"
                error={!!errores.propietario}
                style={styles.input}
              />
              {errores.propietario && (
                <Text variant="bodySmall" style={styles.errorText}>
                  {errores.propietario}
                </Text>
              )}

              <TextInput
                label="Historial Médico"
                value={formulario.historialMedico}
                onChangeText={(valor) => manejarCambio("historialMedico", valor)}
                mode="outlined"
                multiline
                numberOfLines={4}
                style={styles.input}
              />

              <TextInput
                label="Vacunas"
                value={formulario.vacunas}
                onChangeText={(valor) => manejarCambio("vacunas", valor)}
                mode="outlined"
                multiline
                numberOfLines={3}
                style={styles.input}
              />
            </Card.Content>
          </Card>

          <Button
            mode="contained"
            onPress={manejarEnvio}
            style={styles.submitButton}
            contentStyle={styles.buttonContent}
            icon="check"
          >
            Registrar Mascota
          </Button>

          <Button
            mode="outlined"
            onPress={() => router.back()}
            style={styles.cancelButton}
            contentStyle={styles.buttonContent}
            icon="close"
          >
            Cancelar
          </Button>
          </View>
        </View>
      </ScrollView>
      </KeyboardAvoidingView>

      <Portal>
        <Dialog visible={mostrarDialogoExito} onDismiss={() => setMostrarDialogoExito(false)}>
          <Dialog.Title>Éxito</Dialog.Title>
          <Dialog.Content>
            <Text>Mascota registrada correctamente</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => {
              setMostrarDialogoExito(false);
              router.push("/menu");
            }}>OK</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E6F4FE",
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
    alignItems: "center",
  },
  contentWrapper: {
    width: "100%",
    maxWidth: 700,
  },
  formContainer: {
    flex: 1,
    width: "100%",
  },
  title: {
    fontWeight: "bold",
    color: "#1a1a1a",
    marginBottom: 30,
    textAlign: "center",
  },
  card: {
    marginBottom: 20,
  },
  input: {
    marginBottom: 10,
  },
  errorText: {
    color: "#B00020",
    marginBottom: 10,
    marginLeft: 12,
  },
  submitButton: {
    marginTop: 10,
  },
  cancelButton: {
    marginTop: 10,
  },
  buttonContent: {
    paddingVertical: 5,
  },
});
