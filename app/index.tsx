import {SafeAreaView, Text, StyleSheet} from "react-native";
import {Link} from "expo-router";
import React from "react";

export default function Index() {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Edit app/index.tsx to edit this screen.</Text>
        <Link href={'/about'}>A propos</Link>
        <Link href={{pathname: '/pokemon/[id]', params: {id: 3}}}>Pokemon 3</Link>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'red'
    }
})