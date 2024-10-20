import {SafeAreaView, ViewProps, ViewStyle} from "react-native";
import {useThemeColors} from "@/app/hooks/useThemeColors";

type Props = ViewProps;

export function RootView({style, ...rest}: Props) {
    const colors = useThemeColors();
    return (
        <SafeAreaView
            style={[rootStyle, {backgroundColor: colors.tint}, style]}
            {...rest}
        />
    )
}

const rootStyle = {
    flex: 1,
    padding: 4,
} satisfies ViewStyle;