import { Stack } from "expo-router";
import headerShownContext from "@react-navigation/elements/src/Header/HeaderShownContext";

export default function RootLayout() {
  return (
    <Stack screenOptions={{
        headerShown: false
    }}>
    </Stack>
  );
}
