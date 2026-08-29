import { PropsWithChildren } from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useThemeColors } from "../theme/colors";

const Container = (props: PropsWithChildren) => {
    const colors = useThemeColors();
    
    return (
        <SafeAreaView style={[styles.container, { backgroundColor: colors.bgPrimary }]}>
            <View style={[styles.content, { backgroundColor: colors.bgPrimary }]}>
                {props.children}
            </View>
        </SafeAreaView>
    )
}

export default Container

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
    }
})
