import {View, ViewProps, ViewStyle} from "react-native";
import {Shadows} from "@/app/constants/Shadow";
import {useThemeColors} from "@/app/hooks/useThemeColors";

type Props = ViewProps;

export function Card ({style, ...rest}: Props) {
    const colors = useThemeColors()
    return <View style={[style, styles, {backgroundColor: colors.grayWhite}]} {...rest}></View>
}

const styles = {
    borderRadius: 8,
    ...Shadows.dp2
} satisfies ViewStyle