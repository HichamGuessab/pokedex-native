import {SafeAreaView, StyleSheet, View, Text, Image, FlatList} from "react-native";
import React from "react";
import {ThemedText} from "@/app/components/ThemedText";
import {useThemeColors} from "@/app/hooks/useThemeColors";
import {Card} from "@/app/components/Card";
import {PokemonCard} from "@/app/components/pokemon/PokemonCard";

export default function Index() {
    const colors = useThemeColors();
    const pokemons = Array.from({length: 35}, (_, k) => ({
        name: "Pokémon name",
        id: k + 1
    }))
  return (
    <SafeAreaView style={[styles.container, {backgroundColor: colors.tint}]}>
        <View style={styles.header}>
            <Image source={require("@/assets/images/pokeball_white.png")} width={24} height={24}/>
            <ThemedText variant="headline" color="grayLight">Pokédex</ThemedText>
        </View>
        <Card style={styles.body}>
            <FlatList
                data={pokemons}
                numColumns={3}
                contentContainerStyle={[styles.gridGap, styles.list]}
                columnWrapperStyle={styles.gridGap}
                renderItem={({item}) =>
                    <PokemonCard id={item.id} name={item.name} style={{flex: 1/3}}/>
                }
                keyExtractor={(item) => item.id.toString()}/>
        </Card>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
        padding: 12,
    },
    body: {
        flex: 1
    },
    gridGap: {
        gap: 8
    },
    list: {
        padding: 12,
    }
})