import { View, Text, StyleSheet } from "react-native";

import { useSupabase } from "@/context/supabase-provider";
import { colors } from "@/constants/colors";

export default function Settings() {
	const { signOut } = useSupabase();

	return (
		<View style={styles.mainContainer}>
			<Text>Settings</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	mainContainer: {
		flex: 1,
		backgroundColor: colors.mainBg,
		alignItems: "center",
		justifyContent: "center",
	},
});
