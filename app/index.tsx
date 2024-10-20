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
import {SortButton} from "@/app/components/SortButton";
import {RootView} from "@/app/components/RootView";

export default function Index() {
    const colors = useThemeColors();
    const {data, isFetching, fetchNextPage} = useInfiniteFetchQuery('/pokemon?limit=21');
    const pokemons = data?.pages.flatMap((page) => page.results.map(r => ({name: r.name, id: getPokemonId(r.url)}))) ?? [];
    const [sortKey, setSortKey] = useState<"id" | "name">('id');
    const [search, setSearch] = useState("");
    const filteredPokemons = [...(
        search
            ? pokemons.filter(
                (p) =>
                    p.name.includes(search.toLowerCase()) ||
                    p.id.toString() == search
                )
            : pokemons)
        ].sort((a, b) => (a[sortKey] < b[sortKey] ? -1 : 1));
  return (
    <RootView>
        <Row style={styles.header} gap={12}>
            <Image source={require("@/assets/images/pokeball_white.png")} width={24} height={24}/>
            <ThemedText variant="headline" color="grayLight">Pokédex</ThemedText>
        </Row>
        <Row gap={16} style={styles.form}>
            <SearchBar value={search} onChange={setSearch}/>
            <SortButton value={sortKey} onChange={setSortKey}/>
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
                    <PokemonCard id={item.id} name={item.name} style={{flex: 1/3}}/>
                }
                keyExtractor={(item) => item.id.toString()}/>
        </Card>
    </RootView>
  );
}

const styles = StyleSheet.create({
    header: {
        paddingHorizontal: 12,
        paddingBottom: 8
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
    form: {
        paddingHorizontal: 12,
    }
})