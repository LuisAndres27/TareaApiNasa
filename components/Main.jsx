import React, { useEffect, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

import {
  View,
  Text,
  FlatList,
  Image,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { getMarsPhotos } from "../lib/nasa";

export function Main() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  useEffect(() => {
    async function fetchPhotos() {
      try {
        const result = await getMarsPhotos("2020-07-01");
        setPhotos(result);
      } catch (error) {
        console.error("Error cargando fotos:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchPhotos();
  }, []);

  if (loading) {
    return (
      <View
        style={[
          styles.center,
          { paddingTop: insets.top, paddingBottom: insets.bottom },
        ]}
      >
        <ActivityIndicator size="large" color="#ff4500" />
        <Text>Cargando fotos de Marte...</Text>
      </View>
    );
  }

  return (
    <View
      style={{ paddingTop: insets.top, paddingBottom: insets.bottom, flex: 1 }}
    >
      <FlatList
        data={photos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.imageUrl }} style={styles.image} />
            <Text style={styles.title}>📸 {item.camera.fullName}</Text>
            <Text>🛰 Rover: {item.rover.name}</Text>
            <Text>📅 Fecha: {item.earthDate}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    margin: 10,
    padding: 10,
    borderRadius: 8,
    backgroundColor: "#fff",
    elevation: 3,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 8,
  },
});