import { useRouter } from "expo-router";
import { useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, Card, Chip, Dialog, Portal, Text, TextInput } from "react-native-paper";
import { useMascotas } from "../context/MascotasContext";

export default function ConsultaMascotaScreen() {
  const router = useRouter();
  const { mascotas, agregarConsulta, agregarVacuna, obtenerMascotaPorId } = useMascotas();

  const [mascotaSeleccionada, setMascotaSeleccionada] = useState(null);
  const [busqueda, setBusqueda] = useState("");
  const [mostrarFormConsulta, setMostrarFormConsulta] = useState(false);
  const [mostrarFormVacuna, setMostrarFormVacuna] = useState(false);
  const [nuevaConsulta, setNuevaConsulta] = useState({ motivo: "", diagnostico: "", tratamiento: "" });
  const [nuevaVacuna, setNuevaVacuna] = useState({ nombre: "", fechaAplicacion: "", proximaDosis: "" });
  const [dialogo, setDialogo] = useState({ visible: false, titulo: "", mensaje: "" });

  const buscarMascota = () => {
    const mascota = mascotas.find(m => 
      m.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      m.propietario.toLowerCase().includes(busqueda.toLowerCase())
    );
    
    if (mascota) {
      setMascotaSeleccionada(mascota);
      setBusqueda("");
    } else {
      setDialogo({ visible: true, titulo: "No encontrado", mensaje: "No se encontró ninguna mascota con ese nombre o propietario" });
    }
  };

  const manejarAgregarConsulta = () => {
    if (!nuevaConsulta.motivo.trim() || !nuevaConsulta.diagnostico.trim()) {
      setDialogo({ visible: true, titulo: "Error", mensaje: "El motivo y diagnóstico son requeridos" });
      return;
    }

    agregarConsulta(mascotaSeleccionada.id, nuevaConsulta);
    setNuevaConsulta({ motivo: "", diagnostico: "", tratamiento: "" });
    setMostrarFormConsulta(false);
    setDialogo({ visible: true, titulo: "Éxito", mensaje: "Consulta agregada correctamente" });
    
    const mascotaActualizada = obtenerMascotaPorId(mascotaSeleccionada.id);
    setMascotaSeleccionada(mascotaActualizada);
  };

  const manejarAgregarVacuna = () => {
    if (!nuevaVacuna.nombre.trim()) {
      setDialogo({ visible: true, titulo: "Error", mensaje: "El nombre de la vacuna es requerido" });
      return;
    }

    agregarVacuna(mascotaSeleccionada.id, nuevaVacuna);
    setNuevaVacuna({ nombre: "", fechaAplicacion: "", proximaDosis: "" });
    setMostrarFormVacuna(false);
    setDialogo({ visible: true, titulo: "Éxito", mensaje: "Vacuna agregada correctamente" });
    
    const mascotaActualizada = obtenerMascotaPorId(mascotaSeleccionada.id);
    setMascotaSeleccionada(mascotaActualizada);
  };

  const formatearFecha = (fechaISO) => {
    if (!fechaISO) return "N/A";
    const fecha = new Date(fechaISO);
    return fecha.toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
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
          <View style={styles.content}>
          <Text variant="headlineMedium" style={styles.title}>
            Consulta de Mascota
          </Text>

          {!mascotaSeleccionada ? (
            <Card style={styles.card}>
              <Card.Content>
                <Text variant="titleLarge" style={styles.subtitleDark}>
                  Buscar Mascota
                </Text>
                <TextInput
                  label="Nombre o propietario"
                  value={busqueda}
                  onChangeText={setBusqueda}
                  mode="outlined"
                  style={styles.input}
                  right={<TextInput.Icon icon="magnify" />}
                />
                <Button
                  mode="contained"
                  onPress={buscarMascota}
                  style={styles.button}
                  contentStyle={styles.buttonContent}
                  icon="magnify"
                >
                  Buscar
                </Button>
              </Card.Content>
            </Card>
          ) : (
            <Card style={styles.card}>
              <Card.Content>
                <View style={styles.mascotaHeader}>
                  <Text variant="headlineSmall" style={styles.mascotaNombre}>
                    {mascotaSeleccionada.nombre}
                  </Text>
                  <Button
                    mode="text"
                    onPress={() => setMascotaSeleccionada(null)}
                    textColor="#FFB3B3"
                    icon="close"
                  >
                    Cerrar
                  </Button>
                </View>

                <View style={styles.infoSection}>
                  <Chip icon="paw" style={styles.chip} textStyle={styles.chipText}>
                    {mascotaSeleccionada.especie}
                  </Chip>
                  <Text variant="bodyLarge" style={styles.infoText}>
                    <Text style={styles.infoLabel}>Edad:</Text> {mascotaSeleccionada.edad} años
                  </Text>
                  <Text variant="bodyLarge" style={styles.infoText}>
                    <Text style={styles.infoLabel}>Peso:</Text> {mascotaSeleccionada.peso} kg
                  </Text>
                  <Text variant="bodyLarge" style={styles.infoText}>
                    <Text style={styles.infoLabel}>Sexo:</Text> {mascotaSeleccionada.sexo}
                  </Text>
                  <Text variant="bodyLarge" style={styles.infoText}>
                    <Text style={styles.infoLabel}>Propietario:</Text> {mascotaSeleccionada.propietario}
                  </Text>
                </View>

                <View style={styles.actionsContainer}>
                  <Button
                    mode="contained"
                    onPress={() => {
                      setMostrarFormConsulta(!mostrarFormConsulta);
                      setMostrarFormVacuna(false);
                    }}
                    style={styles.actionButton}
                    contentStyle={styles.actionButtonContent}
                    icon="stethoscope"
                    buttonColor="#34C759"
                  >
                    Agregar Consulta
                  </Button>

                  <Button
                    mode="contained"
                    onPress={() => {
                      setMostrarFormVacuna(!mostrarFormVacuna);
                      setMostrarFormConsulta(false);
                    }}
                    style={styles.actionButton}
                    contentStyle={styles.actionButtonContent}
                    icon="needle"
                    buttonColor="#34C759"
                  >
                    Agregar Vacuna
                  </Button>
                </View>

                {mostrarFormConsulta && (
                  <Card style={styles.formCard}>
                    <Card.Content>
                      <Text variant="titleMedium" style={styles.formTitleDark}>
                        Nueva Consulta
                      </Text>
                      <TextInput
                        label="Motivo de la consulta *"
                        value={nuevaConsulta.motivo}
                        onChangeText={(text) => setNuevaConsulta({ ...nuevaConsulta, motivo: text })}
                        mode="outlined"
                        style={styles.formInput}
                      />
                      <TextInput
                        label="Diagnóstico *"
                        value={nuevaConsulta.diagnostico}
                        onChangeText={(text) => setNuevaConsulta({ ...nuevaConsulta, diagnostico: text })}
                        mode="outlined"
                        multiline
                        numberOfLines={3}
                        style={styles.formInput}
                      />
                      <TextInput
                        label="Tratamiento"
                        value={nuevaConsulta.tratamiento}
                        onChangeText={(text) => setNuevaConsulta({ ...nuevaConsulta, tratamiento: text })}
                        mode="outlined"
                        multiline
                        numberOfLines={3}
                        style={styles.formInput}
                      />
                      <Button
                        mode="contained"
                        onPress={manejarAgregarConsulta}
                        style={styles.submitButton}
                        contentStyle={styles.buttonContent}
                        icon="check"
                      >
                        Guardar Consulta
                      </Button>
                    </Card.Content>
                  </Card>
                )}

                {mostrarFormVacuna && (
                  <Card style={styles.formCard}>
                    <Card.Content>
                      <Text variant="titleMedium" style={styles.formTitleDark}>
                        Nueva Vacuna
                      </Text>
                      <TextInput
                        label="Nombre de la vacuna *"
                        value={nuevaVacuna.nombre}
                        onChangeText={(text) => setNuevaVacuna({ ...nuevaVacuna, nombre: text })}
                        mode="outlined"
                        style={styles.formInput}
                      />
                      <TextInput
                        label="Fecha de aplicación (opcional)"
                        value={nuevaVacuna.fechaAplicacion}
                        onChangeText={(text) => setNuevaVacuna({ ...nuevaVacuna, fechaAplicacion: text })}
                        mode="outlined"
                        style={styles.formInput}
                      />
                      <TextInput
                        label="Próxima dosis (opcional)"
                        value={nuevaVacuna.proximaDosis}
                        onChangeText={(text) => setNuevaVacuna({ ...nuevaVacuna, proximaDosis: text })}
                        mode="outlined"
                        style={styles.formInput}
                      />
                      <Button
                        mode="contained"
                        onPress={manejarAgregarVacuna}
                        style={styles.submitButton}
                        contentStyle={styles.buttonContent}
                        icon="check"
                      >
                        Guardar Vacuna
                      </Button>
                    </Card.Content>
                  </Card>
                )}

                <View style={styles.historialContainer}>
                  <Text variant="titleLarge" style={styles.historialTitleDark}>
                    Historial de Consultas
                  </Text>
                  {mascotaSeleccionada.consultas && mascotaSeleccionada.consultas.length > 0 ? (
                    mascotaSeleccionada.consultas.map((consulta) => (
                      <Card key={consulta.id} style={styles.historialItem}>
                        <Card.Content>
                          <Text variant="labelLarge" style={styles.historialFecha}>
                            {formatearFecha(consulta.fecha)}
                          </Text>
                          <Text variant="bodyMedium" style={styles.historialText}>
                            <Text style={styles.historialLabel}>Motivo:</Text> {consulta.motivo}
                          </Text>
                          <Text variant="bodyMedium" style={styles.historialText}>
                            <Text style={styles.historialLabel}>Diagnóstico:</Text> {consulta.diagnostico}
                          </Text>
                          {consulta.tratamiento && (
                            <Text variant="bodyMedium" style={styles.historialText}>
                              <Text style={styles.historialLabel}>Tratamiento:</Text> {consulta.tratamiento}
                            </Text>
                          )}
                        </Card.Content>
                      </Card>
                    ))
                  ) : (
                    <Text variant="bodyMedium" style={styles.sinHistorialDark}>
                      No hay consultas registradas
                    </Text>
                  )}
                </View>

                <View style={styles.historialContainer}>
                  <Text variant="titleLarge" style={styles.historialTitleDark}>
                    Historial de Vacunas
                  </Text>
                  {mascotaSeleccionada.vacunas && mascotaSeleccionada.vacunas.length > 0 ? (
                    mascotaSeleccionada.vacunas.map((vacuna) => (
                      <Card key={vacuna.id} style={styles.historialItem}>
                        <Card.Content>
                          <Text variant="labelLarge" style={styles.historialFecha}>
                            {formatearFecha(vacuna.fecha)}
                          </Text>
                          <Text variant="bodyMedium" style={styles.historialText}>
                            <Text style={styles.historialLabel}>Vacuna:</Text> {vacuna.nombre}
                          </Text>
                          {vacuna.fechaAplicacion && (
                            <Text variant="bodyMedium" style={styles.historialText}>
                              <Text style={styles.historialLabel}>Fecha aplicación:</Text> {vacuna.fechaAplicacion}
                            </Text>
                          )}
                          {vacuna.proximaDosis && (
                            <Text variant="bodyMedium" style={styles.historialText}>
                              <Text style={styles.historialLabel}>Próxima dosis:</Text> {vacuna.proximaDosis}
                            </Text>
                          )}
                        </Card.Content>
                      </Card>
                    ))
                  ) : (
                    <Text variant="bodyMedium" style={styles.sinHistorialDark}>
                      No hay vacunas registradas
                    </Text>
                  )}
                </View>
              </Card.Content>
            </Card>
          )}

          <Button
            mode="outlined"
            onPress={() => router.back()}
            style={styles.backButton}
            contentStyle={styles.buttonContent}
            icon="arrow-left"
          >
            Volver al Menú
          </Button>
          </View>
        </View>
      </ScrollView>
      </KeyboardAvoidingView>

      <Portal>
        <Dialog visible={dialogo.visible} onDismiss={() => setDialogo({ ...dialogo, visible: false })}>
          <Dialog.Title>{dialogo.titulo}</Dialog.Title>
          <Dialog.Content>
            <Text>{dialogo.mensaje}</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setDialogo({ ...dialogo, visible: false })}>OK</Button>
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
  content: {
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
    backgroundColor: "#2C3E50",
  },
  subtitle: {
    fontWeight: "600",
    marginBottom: 15,
  },
  subtitleDark: {
    fontWeight: "600",
    marginBottom: 15,
    color: "#FFFFFF",
  },
  input: {
    marginBottom: 15,
  },
  button: {
    marginTop: 10,
  },
  buttonContent: {
    paddingVertical: 5,
  },
  mascotaHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#4A5F7A",
  },
  mascotaNombre: {
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  infoSection: {
    marginBottom: 20,
  },
  chip: {
    marginBottom: 10,
    alignSelf: "flex-start",
    backgroundColor: "#34495E",
  },
  chipText: {
    color: "#FFFFFF",
  },
  infoText: {
    marginBottom: 8,
    color: "#ECF0F1",
  },
  infoLabel: {
    fontWeight: "600",
    color: "#BDC3C7",
  },
  actionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    gap: 10,
  },
  actionButton: {
    flex: 1,
  },
  actionButtonContent: {
    paddingVertical: 3,
  },
  formCard: {
    backgroundColor: "#34495E",
    marginBottom: 20,
  },
  formTitle: {
    fontWeight: "600",
    marginBottom: 15,
    color: "#333",
  },
  formTitleDark: {
    fontWeight: "600",
    marginBottom: 15,
    color: "#FFFFFF",
  },
  formInput: {
    marginBottom: 10,
  },
  submitButton: {
    marginTop: 10,
  },
  historialContainer: {
    marginTop: 20,
    marginBottom: 10,
  },
  historialTitle: {
    fontWeight: "600",
    color: "#333",
    marginBottom: 15,
  },
  historialTitleDark: {
    fontWeight: "600",
    color: "#FFFFFF",
    marginBottom: 15,
  },
  historialItem: {
    marginBottom: 10,
    backgroundColor: "#34495E",
  },
  historialFecha: {
    fontWeight: "600",
    color: "#5DADE2",
    marginBottom: 8,
  },
  historialText: {
    color: "#ECF0F1",
    marginBottom: 4,
  },
  historialLabel: {
    fontWeight: "600",
    color: "#BDC3C7",
  },
  sinHistorial: {
    color: "#999",
    fontStyle: "italic",
  },
  sinHistorialDark: {
    color: "#BDC3C7",
    fontStyle: "italic",
  },
  backButton: {
    marginTop: 20,
  },
});
