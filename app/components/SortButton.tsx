import {Dimensions, Image, Modal, Pressable, StyleSheet, Text, View} from "react-native";
import {useThemeColors} from "@/app/hooks/useThemeColors";
import values from "ajv/lib/vocabularies/jtd/values";
import {useRef, useState} from "react";
import {ThemedText} from "@/app/components/ThemedText";
import {Card} from "@/app/components/Card";
import {Row} from "@/app/components/Row";
import {Radio} from "@/app/components/Radio";
import {Shadows} from "@/app/constants/Shadow";

type Props = {
    value: "id" | "name",
    onChange: (v: "id" | "name") => void
}

export function SortButton({value, onChange}: Props) {
    const colors = useThemeColors();
    const [isModalVisible, setModalVisbility] = useState(false);
    const [position, setPosition] = useState<null | {top: number, right: number}>(null);
    const onButtonPress = () => {
        buttonRef.current?.measureInWindow((x, y, width, height) => {
            setPosition({
                top: y + height,
                right: Dimensions.get("window").width - x - width,

            })
        })
        setModalVisbility(true)
    }
    const onClose = () => {
        setModalVisbility(false)
    };
    const options = [
        {label: "Number", value: "id"},
        {label: "Name", value: "name"},
    ] as const;
    const buttonRef = useRef<View>(null);

    return (
        <>
            <Pressable onPress={onButtonPress}>
                <View ref={buttonRef} style={[styles.button, { backgroundColor: colors.grayWhite }]}>
                    <Image
                        source={
                            value == "id"
                                ? require('@/assets/images/tag.png')
                                : require('@/assets/images/alpha.png')
                        }
                        width={16}
                        height={16}
                    />
                </View>
            </Pressable>
            <Modal
                animationType="fade"
                transparent
                visible={isModalVisible}
                onRequestClose={onClose}
            >
                <Pressable style={styles.backdrop} onPress={onClose}/>
                <View style={[styles.popup, {backgroundColor: colors.tint, ...position}]}>
                    <ThemedText style={styles.title} variant="subtitle2" color="grayWhite">
                        Sort by:
                    </ThemedText>
                    <Card style={styles.card}>
                        {options.map(o =>(
                            <Pressable onPress={() => onChange(o.value)}>
                                <Row key={o.value} gap={8}>
                                    <Radio checked={o.value == value}/>
                                    <ThemedText>{o.label}</ThemedText>
                                </Row>
                            </Pressable>
                        ))}
                    </Card>
                </View>
            </Modal>
        </>
    );
}

const styles = StyleSheet.create({
        button: {
            width: 32,
            height: 32,
            borderRadius: 32,
            flex: 0,
            alignItems: 'center',
            justifyContent: 'center',
        },
        backdrop: {
            flex: 1,
            backgroundColor: "rgba(0, 0, 0, 0.3)",
        },
        popup: {
            position: "absolute",
            padding: 4,
            paddingTop: 16,
            gap: 16,
            borderRadius: 12,
            ...Shadows.dp2,
        },
        title: {
            paddingLeft: 20,
        },
        card: {
            paddingVertical: 16,
            paddingHorizontal: 20,
            gap: 16
        }

    }
)