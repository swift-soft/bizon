import { colors } from "@/constants/colors";
import React from "react";
import { Image, StyleSheet, View } from "react-native";

export default function NoteWidget() {
	return (
		<View style={styles.noteContainer}>
			<Image style={styles.image} source={require("../../assets/note.webp")} />
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
		backgroundColor: colors.lightBg,
		borderRadius: 10,
		overflow: "hidden",
	},

	image: {
		width: 130,
		height: 130,
	},
});
