import { useState } from "react";

import {
  Button,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import api from "../services/api";

export default function Paisporcapital() {

  const [capital, setCapital] = useState("");

  
  const [data, setData] = useState<any[]>([]);

  async function buscarCapital() {

    const response = await api.get(`/capital/${capital}`);

    setData(response.data);
  }

  return (
    <View style={styles.container}>

      <Text style={styles.title}>
        Buscar por Capital
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Digite a capital"
        value={capital}
        onChangeText={setCapital}
      />

      <Button
        title="Buscar"
        onPress={buscarCapital}
      />

      {/* LISTA DOS RESULTADOS */}
      <FlatList

        data={data}

        keyExtractor={(item) => item.name.common}

        renderItem={({ item }) => (

          <View style={styles.result}>

            <Text>
              Nome oficial:
              {" "}
              {item.name.official}
            </Text>

            <Image
              source={{
                uri: item.flags.png
              }}
              style={styles.flag}
            />

          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 40,
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 15,
  },

  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },

  result: {
    marginTop: 20,
  },

  flag: {
    width: 200,
    height: 120,
    marginTop: 15,
  },
});