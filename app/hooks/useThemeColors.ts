import {useColorScheme} from "react-native";
import {Colors} from "@/app/constants/Colors";

export function useThemeColors() {
    const theme = useColorScheme() ?? 'light';
    return Colors[theme];
}