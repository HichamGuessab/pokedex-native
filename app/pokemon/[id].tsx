import {router, useLocalSearchParams} from "expo-router";
import {Text, StyleSheet, Image, Pressable, View} from "react-native";
import {RootView} from "@/app/components/RootView";
import {Row} from "@/app/components/Row";
import {ThemedText} from "@/app/components/ThemedText";
import {useFetchQuery} from "@/app/hooks/useFetchQuery";
import {Colors} from "@/app/constants/Colors";
import {useThemeColors} from "@/app/hooks/useThemeColors";
import {basePokemonStats, formatSize, formatWeight, getPokemonArtwork} from "@/app/functions/pokemon";
import {Card} from "@/app/components/Card";
import {PokemonType} from "@/app/components/pokemon/PokemonType";
import {PokemonSpec} from "@/app/components/pokemon/PokemonSpec";
import {PokemonStat} from "@/app/components/pokemon/PokemonStat";
import {spec} from "node:test/reporters";

export default function Pokemon() {
    const colors = useThemeColors();
    const params = useLocalSearchParams() as {id: string};
    const {data:pokemon} = useFetchQuery("/pokemon/[id]", {id: params.id})
    const {data:species} = useFetchQuery("/pokemon-species/[id]", {id: params.id});
    const mainType = pokemon?.types?.[0].type.name;
    const colorType = mainType ? Colors.type[mainType] : colors.tint;
    const types = pokemon?.types ?? [];
    const bio = species?.flavor_text_entries
        ?.find(({language}) => {
            return language.name == "en";
        })
        ?.flavor_text.replaceAll("\n", " ");
    const stats = pokemon?.stats ?? basePokemonStats;
    return (
        <RootView backgroundColor={colorType}>
            <View>
                <Image style={styles.pokeball} source={require('@/assets/images/big_pokeball.png')} width={208} height={208}></Image>
                <Row style={styles.header}>
                    <Pressable onPress={router.back}>
                        <Row gap={8}>
                            <Image
                                source={require('@/assets/images/arrow_back.png')}
                                width={32}
                                height={32}
                            />
                            <ThemedText
                                style={{textTransform: "capitalize"}}
                                color={"grayWhite"}
                                variant={"headline"}>
                                {pokemon?.name}
                            </ThemedText>
                        </Row>
                    </Pressable>
                    <ThemedText color="grayWhite" variant="subtitle2">
                        #{params.id.padStart(3, "0")}
                    </ThemedText>
                </Row>
                <View style={styles.body}>
                    <Image
                        style={styles.artwork}
                        source={{
                            uri : getPokemonArtwork(params.id),
                        }}
                        width={200}
                        height={200}
                    />
                    <Card style={styles.card}>
                        <Row gap={16} style={{height: 20}}>
                            {types.map(type => <PokemonType name={type.type.name} key={type.type.name}/>)}
                        </Row>

                        {/* About */}
                        <ThemedText variant={"subtitle1"} style={{color: colorType}}>About</ThemedText>
                        <Row gap={16}>
                            <PokemonSpec style={{borderStyle: 'solid', borderRightWidth: 1, borderColor: colors.grayLight}} title={formatWeight(pokemon?.weight)} description="Weight" image={require("@/assets/images/weight.png")}/>
                            <PokemonSpec style={{borderStyle: 'solid', borderRightWidth: 1, borderColor: colors.grayLight}} title={formatSize(pokemon?.weight)} description="Size" image={require("@/assets/images/size.png")}/>
                            <PokemonSpec title={pokemon?.moves.slice(0,2).map((m) => m.move.name).join('\n')} description="Moves"/>
                        </Row>
                        <ThemedText>{bio}</ThemedText>

                        {/* Stats */}
                        <ThemedText variant={"subtitle1"} style={{color: colorType}}>Base stats</ThemedText>

                        <View style={{ alignSelf: "stretch"}}>
                            {stats.map(stat => <PokemonStat key={stat.stat.name} name={stat.stat.name} value={stat.base_stat} color={colorType}/>)}
                        </View>
                    </Card>
                </View>
            </View>
        </RootView>
    )
};

const styles = StyleSheet.create({
    header: {
        margin: 20,
        justifyContent: "space-between",
    },
    pokeball: {
        opacity: 0.1,
        position: "absolute",
        right: 8,
        top: 8,
    },
    artwork: {
        position: "absolute",
        top: -140,
        alignSelf: "center",
        zIndex: 2
    },
    body: {
        marginTop: 144,
    },
    card: {
        paddingHorizontal: 20,
        paddingTop: 60,
        paddingBottom: 20,
        gap: 16,
        alignItems: "center",
    },
})