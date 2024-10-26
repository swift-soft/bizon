import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import * as Animatable from "react-native-animatable";

// Define the interface for your heart rate data
interface HeartRateData {
	date: string;
	time: string;
	heart_rate: number;
	sleep_hours: number;
	activity_level: number;
	steps: number;
	systolic_bp: number;
	diastolic_bp: number;
	stressed: boolean;
}

function Heartbeat() {
	const [heartRateData, setHeartRateData] = useState<HeartRateData[]>([]);
	const [currentIndex, setCurrentIndex] = useState(0);
	const itemsPerPage = 1; // Change this for pagination

	useEffect(() => {
		// Load data from JSON file
		const loadData = async () => {
			const data = require("../data/stress_dataset_adjusted.json");
			setHeartRateData(data);
		};

		loadData();
	}, []);

	const handleNext = () => {
		// Move to the next entry
		setCurrentIndex((prevIndex) =>
			Math.min(prevIndex + 1, heartRateData.length - 1),
		);
	};

	const handlePrevious = () => {
		// Move to the previous entry
		setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
	};

	const currentData = heartRateData.slice(
		currentIndex,
		currentIndex + itemsPerPage,
	)[0];

	return (
		<View style={styles.heartContainer}>
			<Animatable.Text
				animation="pulse"
				easing="ease-out"
				iterationCount="infinite"
				style={{ textAlign: "center", fontSize: 100 }}
				direction="alternate"
			>
				❤️
			</Animatable.Text>
			{currentData ? (
				<View style={styles.dataContainer}>
					<Text style={styles.heartRateText}>{currentData.heart_rate} bpm</Text>
					<Text>
						{currentData.date} {currentData.time}
					</Text>
					<Text>Steps: {currentData.steps}</Text>
					<Text>Stressed: {currentData.stressed ? "Yes" : "No"}</Text>
				</View>
			) : (
				<Text>Loading...</Text>
			)}
			<View style={styles.buttonContainer}>
				<Button
					title="Previous"
					onPress={handlePrevious}
					disabled={currentIndex === 0}
				/>
				<Button
					title="Next"
					onPress={handleNext}
					disabled={currentIndex >= heartRateData.length - 1}
				/>
			</View>
		</View>
	);
}

export default Heartbeat;

const styles = StyleSheet.create({
	heartContainer: {
		height: 300,
		width: 300,
		alignItems: "center",
		justifyContent: "center",
	},
	heartRateText: {
		fontSize: 24,
		marginTop: 10,
		textAlign: "center",
	},
	dataContainer: {
		alignItems: "center",
		marginVertical: 10,
	},
	buttonContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		width: "80%",
		marginTop: 10,
	},
});
