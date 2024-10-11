import { Text, View } from "react-native";
import {container} from "ansi-fragments";
import {Link} from "expo-router";
import React from "react";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
          backgroundColor: "red",
      }}
    >
      <Text>Edit app/index.tsx to edit this screen.</Text>
        <Link href={'/about'}>A propos</Link>
    </View>
  );
}