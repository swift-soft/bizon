import React from "react";
import { Image, StyleSheet, View } from "react-native";

export default function TimerWidget() {
	return (
		<View style={styles.timerContainer}>
			<Image style={styles.image} source={require("../../assets/timer.png")} />
		</View>
	);
}

const styles = StyleSheet.create({
	timerContainer: {
		height: 158,
		width: 158,
		alignItems: "center",
		justifyContent: "center",
		marginBottom: 10,
		backgroundColor: "#f8dbff",
		borderRadius: 10,
		overflow: "hidden",
	},

	image: {
		width: 130,
		height: 130,
	},
});
