import {StyleSheet, View, type ViewProps} from "react-native";
import {Row} from "@/app/components/Row";
import {ThemedText} from "@/app/components/ThemedText";
import {color} from "ansi-fragments";
import {useThemeColors} from "@/app/hooks/useThemeColors";

type Props = ViewProps & {
    name: string,
    value: number,
    color: string,
};

function statShortName(name: string): string {
    return name
        .replaceAll("special", "S")
        .replaceAll("-", "")
        .replaceAll("attack", "ATK")
        .replaceAll("defense", "DEF")
        .replaceAll("speed", "SPD")
        .toUpperCase();
}

export function PokemonStat({style, color, name, value, ...rest}: Props) {
    const colors = useThemeColors();
    return <Row style={[style, styles.root]} {...rest}>
        <View style={[styles.name, { borderColor: colors.grayLight}]}>
            <ThemedText variant={"subtitle3"} style={{color: color}}>
                {statShortName(name)}
            </ThemedText>
        </View>
        <View style={styles.number}>
            <ThemedText>{value.toString().padStart(3, "0")}</ThemedText>
        </View>
        <Row style={styles.bar}>
            <View style={[styles.barInner, {flex: value, backgroundColor: color}]}></View>
            <View style={[styles.barBackground, {flex: 255 - value, backgroundColor: color}]}></View>
        </Row>
    </Row>
}

const styles = StyleSheet.create({
    root: {
        gap: 8
    },
    name: {
        width: 40,
        paddingRight: 8,
        borderRightWidth: 1,
        borderStyle: "solid",
    },
    number: {
        width: 23
    },
    bar: {
        flex: 1,
        borderRadius: 20,
        height: 4,
        overflow: "hidden",
    },
    barInner: {
        height: 4
    },
    barBackground: {
        height: 4,
        opacity: 0.24,
    }
});