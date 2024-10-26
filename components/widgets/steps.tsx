import { colors } from "@/constants/colors";
import React from "react";
import { StyleSheet, Text } from "react-native";
import { View } from "react-native-animatable";
import { AnimatedCircularProgress } from "react-native-circular-progress";

const GOAL = 8000;
const STEPS = 6868;
const progress = Math.min((STEPS / GOAL) * 100, 100);

export default function StepsWidget() {
	return (
		<View style={styles.noteContainer}>
			<AnimatedCircularProgress
				size={120}
				width={15}
				fill={progress} // Use calculated progress
				tintColor="gold"
				onAnimationComplete={() => console.log("onAnimationComplete")}
				backgroundColor="rgb(189, 189, 189)"
				rotation={0}
				lineCap="round"
			>
				{(fill) => (
					<Text style={styles.fillText}>
						{STEPS}/{GOAL} steps
					</Text>
				)}
			</AnimatedCircularProgress>
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

	fillText: {
		textAlign: "center",
		fontSize: 14,
		fontWeight: "bold",
		color: "black", // Color for the text inside the circle
	},
});
