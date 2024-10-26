import { router } from "expo-router";
import { SafeAreaView, StyleSheet, View } from "react-native";

import CustomGrid from "@/components/custom-grid";
import { colors } from "@/constants/colors";

export default function Home() {
	return (
		<SafeAreaView
			className="flex-1 p-4 pt-12 bg-background gap-y-4"
			style={styles.mainContainer}
		>
			<CustomGrid />
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	mainContainer: {
		flex: 1,
		backgroundColor: colors.mainBg,
	},

	// hiJimmyContainer: {
	// 	backgroundColor: "#f8dbff",
	// 	width: "100%",
	// },

	nameText: {
		fontSize: 30,
		color: colors.text,
		fontWeight: "bold",
	},
});
