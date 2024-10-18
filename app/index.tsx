import {SafeAreaView, StyleSheet, View, Image, FlatList, ActivityIndicator} from "react-native";
import React, {useState} from "react";
import {ThemedText} from "@/app/components/ThemedText";
import {useThemeColors} from "@/app/hooks/useThemeColors";
import {Card} from "@/app/components/Card";
import {PokemonCard} from "@/app/components/pokemon/PokemonCard";
import {useInfiniteFetchQuery} from "@/app/hooks/useFetchQuery";
import {getPokemonId} from "@/app/functions/pokemon";
import {SearchBar} from "@/app/components/SearchBar";
import {Row} from "@/app/components/Row";

export default function Index() {
    const colors = useThemeColors();
    const {data, isFetching, fetchNextPage} = useInfiniteFetchQuery('/pokemon?limit=21');
    const pokemons = data?.pages.flatMap(
        page => page.results
    ) ?? [];
    const [search, setSearch] = useState('');
    const filteredPokemons = search ? pokemons.filter(p => p.name.includes(search.toLowerCase()) || getPokemonId(p.url).toString() == search) : pokemons;
  return (
    <SafeAreaView style={[styles.container, {backgroundColor: colors.tint}]}>
        <Row style={styles.header} gap={12}>
            <Image source={require("@/assets/images/pokeball_white.png")} width={24} height={24}/>
            <ThemedText variant="headline" color="grayLight">Pokédex</ThemedText>
        </Row>
        <Row style={styles.search}>
            <SearchBar value={search} onChange={setSearch}/>
        </Row>
        <Card style={styles.body}>
            <FlatList
                data={filteredPokemons}
                numColumns={3}
                contentContainerStyle={[styles.gridGap, styles.list]}
                columnWrapperStyle={styles.gridGap}
                ListFooterComponent={
                    isFetching ? <ActivityIndicator color={colors.tint}/> : null
                }
                onEndReached={search ? undefined : () => fetchNextPage()}
                renderItem={({item}) =>
                    <PokemonCard id={getPokemonId(item.url)} name={item.name} style={{flex: 1/3}}/>
                }
                keyExtractor={(item) => item.url}/>
        </Card>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 4,
    },
    header: {
        paddingHorizontal: 12,
        paddingVertical: 8
    },
    body: {
        flex: 1,
        marginTop: 16
    },
    gridGap: {
        gap: 8
    },
    list: {
        padding: 12,
    },
    search: {

    }
})