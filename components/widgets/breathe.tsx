// Breathe.tsx
import React, { useEffect, useState } from "react";
import {
	StyleSheet,
	Text,
	View,
	Button,
	Image,
	TouchableOpacity,
} from "react-native";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";

const Breathe = ({ onClose }) => {
	const [breatheText, setBreatheText] = useState("Breathe In...");
	const [duration, setDuration] = useState(4); // Fixed duration for each phase
	const [key, setKey] = useState(0); // Key to reset the timer

	useEffect(() => {
		// Define the sequence of texts to display
		const texts = ["Breathe In...", "Hold...", "Breathe Out..."];
		let index = 0;

		// Change the text every few seconds
		const intervalId = setInterval(() => {
			index = (index + 1) % texts.length; // Cycle through the texts

			setBreatheText(texts[index]); // Update the text
			setKey((prevKey) => prevKey + 1); // Increment key to reset the timer
		}, duration * 1000); // Change text based on fixed duration

		// Clean up the interval on component unmount
		return () => clearInterval(intervalId);
	}, [duration]);

	return (
		<View style={styles.breatheContainer}>
			<Image
				style={styles.image}
				source={require("../../assets/img/breathing.png")}
			/>
			<Text style={styles.breatheText}>{breatheText}</Text>
			<CountdownCircleTimer
				key={key} // Use key to reset timer
				isPlaying
				duration={duration}
				onComplete={() => {
					// This can handle what happens when the timer completes if needed
					return { shouldRepeat: true }; // Repeat the timer for the next phase
				}}
				colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
				colorsTime={[duration, duration - 2, duration - 1, 0]}
				size={120}
			>
				{({ remainingTime }) => (
					<Text style={styles.timerText}>{remainingTime}</Text>
				)}
			</CountdownCircleTimer>
			<TouchableOpacity
				style={{ height: 100, width: 150, borderRadius: 75, marginTop: 30 }}
			>
				<Button color="#b08afb" title="Close" onPress={onClose} />
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	breatheContainer: {
		width: "90%",
		height: "75%",
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "#f8dbff",
		padding: 20,
		borderRadius: 10,
	},
	breatheText: {
		fontSize: 24,
		fontWeight: "bold",
		margin: 20,
		textAlign: "center",
	},
	timerText: {
		fontSize: 30,
		fontWeight: "bold",
		color: "#b08afb",
	},
	image: {
		width: 150,
		height: 150,
	},
});

export default Breathe;
