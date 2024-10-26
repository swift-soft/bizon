import { colors } from "@/constants/colors";
import React from "react";

import { Image, View, StyleSheet } from "react-native";
export default function SleepWidget() {
	return (
		<View style={styles.sleepContainer}>
			<Image style={styles.image} source={require("../../assets/sleep.webp")} />
		</View>
	);
}

const styles = StyleSheet.create({
	sleepContainer: {
		height: 158,
		width: 323,
		alignItems: "center",
		justifyContent: "center",
		marginBottom: 10,
		backgroundColor: colors.lightBg,
		borderRadius: 10,
		overflow: "hidden",
	},

	image: {
		width: 300,
		height: 134,
	},
});
