import { router } from "expo-router";
import { SafeAreaView, StyleSheet, View } from "react-native";

import { Button } from "@/components/ui/button";
import { Progress, ProgressFilledTrack } from "@/components/ui/progress";
import { Text } from "react-native";
import { H1, Muted } from "@/components/ui/typography";
import { Center } from "@/components/ui/center";
import { Box } from "@/components/ui/box";
import CustomGrid from "@/components/custom-grid";

export default function Home() {
	return (
		<SafeAreaView
			className="flex-1 bg-background p-4 gap-y-4 pt-12"
			style={styles.mainContainer}
		>
			<CustomGrid />
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	mainContainer: {
		flex: 1,
		backgroundColor: "#b08afb",
	},

	// hiJimmyContainer: {
	// 	backgroundColor: "#f8dbff",
	// 	width: "100%",
	// },

	nameText: {
		fontSize: 30,
		color: "#f8dbff",
		fontWeight: "bold",
	},
});
