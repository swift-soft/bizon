import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Modal, Button } from "react-native";
import * as Animatable from "react-native-animatable";
import Breathe from "./breathe";
import { colors } from "@/constants/colors";

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
	const [showModal, setShowModal] = useState(false);
	const [showBreatheModal, setShowBreatheModal] = useState(false); // State for showing Breathe modal
	const itemsPerPage = 1;

	useEffect(() => {
		// Load data from JSON file
		const loadData = async () => {
			const data = require("../../data/stress_dataset_adjusted.json");
			setHeartRateData(data);
		};

		loadData();
	}, []);

	useEffect(() => {
		const currentData = heartRateData[currentIndex]; // Current heart rate data

		// Show modal if heart rate exceeds 100
		if (currentData && currentData.heart_rate > 100) {
			setShowModal(true);
		} else {
			setShowModal(false);
		}
	}, [currentIndex, heartRateData]);

	const handleNext = () => {
		setCurrentIndex((prevIndex) =>
			Math.min(prevIndex + 1, heartRateData.length - 1),
		);
	};

	const handlePrevious = () => {
		setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
	};

	const currentData = heartRateData.slice(
		currentIndex,
		currentIndex + itemsPerPage,
	)[0];

	const handleBreathePress = () => {
		setShowModal(false); // Close the heart rate modal
		setShowBreatheModal(true); // Show the Breathe modal
	};

	const handleCloseBreathe = () => {
		setShowBreatheModal(false); // Close the Breathe modal
	};

	return (
		<View style={styles.heartContainer}>
			<Animatable.Text
				animation="pulse"
				easing="ease-out"
				iterationCount="infinite"
				style={styles.heartIcon}
				direction="alternate"
			>
				❤️
			</Animatable.Text>
			{currentData ? (
				<View style={styles.dataContainer}>
					<Text style={styles.heartRateText}>{currentData.heart_rate} bpm</Text>
					<Text style={styles.stressedText}>
						Stressed: {currentData.stressed ? "Yes" : "No"}
					</Text>
				</View>
			) : (
				<Text>Loading...</Text>
			)}

			<Modal
				transparent
				visible={showModal}
				animationType="slide"
				onRequestClose={() => setShowModal(false)}
			>
				<View style={styles.modalOverlay}>
					<View style={styles.modalContainer}>
						<View style={styles.heartContainer}>
							<Animatable.Text
								animation="pulse"
								easing="ease-out"
								iterationCount="infinite"
								style={styles.heartIcon}
								direction="alternate"
							>
								❤️
							</Animatable.Text>
						</View>
						<Text style={styles.modalText}>TAKE A BREATH!</Text>
						<Button
							color={colors.mainBg}
							title="BREATHE"
							onPress={handleBreathePress}
						/>
					</View>
				</View>
			</Modal>

			<Modal
				visible={showBreatheModal}
				transparent={true}
				animationType="slide"
				onRequestClose={handleCloseBreathe}
			>
				<View style={styles.modalOverlay}>
					<Breathe onClose={handleCloseBreathe} />
				</View>
			</Modal>
		</View>
	);
}

export default Heartbeat;

const styles = StyleSheet.create({
	heartContainer: {
		height: 158,
		width: 158,
		alignItems: "center",
		justifyContent: "center",
		marginBottom: 10,
		backgroundColor: colors.lightBg,
		borderRadius: 10,
		overflow: "hidden",
	},
	heartIcon: {
		textAlign: "center",
		fontSize: 70,
	},
	heartRateText: {
		fontSize: 22,
		textAlign: "center",
	},
	stressedText: {
		marginBottom: 6,
	},
	dataContainer: {
		alignItems: "center",
		marginVertical: 10,
	},
	modalOverlay: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "rgba(0, 0, 0, 0.5)",
	},
	modalContainer: {
		width: 250,
		padding: 20,
		borderRadius: 10,
		alignItems: "center",
		backgroundColor: colors.lightBg,
	},
	modalText: {
		fontSize: 20,
		fontWeight: "bold",
		marginBottom: 10,
		color: "#ff3333",
	},
});
