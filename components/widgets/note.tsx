import React from "react";
import { Image, StyleSheet, View, Text } from "react-native";

const tipsData = require("../../assets/tips.json");

export default function NoteWidget() {

	const randomTip = tipsData.pro_tips[Math.floor(Math.random() * tipsData.pro_tips.length)].tip;

	return (
		<View style={styles.noteContainer}>
			<Image style={styles.image} source={require("../../assets/note-2.webp")} />
			<Text style={styles.noteText}>{randomTip}</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	noteContainer: {
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
		width: 152,
		height: 152,
		transform: [
			{ rotate: "-12deg" },
			{ translateY: 6 },
		],
	},

	noteText: {
		color: "#000",
		position: "absolute",
		textAlign: "center",
		paddingHorizontal: 10,
		top: "53%",
		left: "38%",
		transform: [{ translateX: -50 }, { translateY: -50 }],
		width: 135,
		height: 100,
		overflow: "hidden"

	},
});
