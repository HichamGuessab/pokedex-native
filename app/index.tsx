import {SafeAreaView, Text, StyleSheet} from "react-native";
import {Link} from "expo-router";
import React from "react";
import {ThemedText} from "@/app/components/ThemedText";
import {useThemeColors} from "@/app/hooks/useThemeColors";
import {Card} from "@/app/components/Card";

export default function Index() {
    const colors = useThemeColors();
  return (
    <SafeAreaView style={[styles.container, {backgroundColor: colors.tint}]}>
        <Card>
            <ThemedText variant="headline" color="grayDark">Pokédex</ThemedText>
        </Card>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})