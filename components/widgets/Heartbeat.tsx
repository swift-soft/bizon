import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, View, Modal, Button } from "react-native";
import * as Animatable from "react-native-animatable";
import { colors } from "@/constants/colors";
import Breathe from "./breathe";
import { Ionicons } from "@expo/vector-icons";

type Mood = "Positive" | "Negative" | "Neutral";

type AdjustMoodProps = {
	bmpThresholdWithSleep: number;
	mood: Mood;
};

type CalculateBmpThresholdProps = {
	bpm: number;
	sleep_hours: number;
	mood: Mood;
};

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

type MockData = {
	todays_mood: Mood;
};

const mockData: MockData = {
	todays_mood: "Positive",
};

const adjustMood = ({
	bmpThresholdWithSleep,
	mood,
}: AdjustMoodProps): number => {
	switch (mood) {
		case "Positive":
			return bmpThresholdWithSleep + 2;
		case "Negative":
			return bmpThresholdWithSleep - 2;
		default:
			return bmpThresholdWithSleep;
	}
};

const calculateBmpThreshold = ({
	bpm,
	sleep_hours,
	mood,
}: CalculateBmpThresholdProps): number => {
	const adjustSleepToBmp = (100 * (sleep_hours + 15)) / 23;
	return adjustMood({ bmpThresholdWithSleep: adjustSleepToBmp, mood });
};

function Heartbeat() {
	const [heartRateData, setHeartRateData] = useState<HeartRateData[]>([]);
	const [currentIndex, setCurrentIndex] = useState(0);
	const [showModal, setShowModal] = useState(false);
	const [showBreatheModal, setShowBreatheModal] = useState(false);
	const [bpmDisplay, setBpmDisplay] = useState<number | null>(null);

	useEffect(() => {
		const loadData = async () => {
			const data = require("../../data/stress_dataset_adjusted.json");
			setHeartRateData(data);
		};

		loadData();
	}, []);

	useEffect(() => {
		const currentData: HeartRateData | undefined = heartRateData[currentIndex];

		// Initialize bpmDisplay and heartbeat variation
		if (currentData) {
			setBpmDisplay(currentData.heart_rate);

			const intervalId = setInterval(() => {
				// Use a random number to create a 70% chance of incrementing
				const randomChance = Math.random();
				const randomFluctuation = randomChance < 0.7 ? 1 : -1;

				setBpmDisplay((p) => {
					const val =
						p !== null ? p + randomFluctuation : currentData.heart_rate;

					if (val > 100) {
						setShowModal(true);
						clearInterval(intervalId);
					}
					return val;
				});
			}, 1000);

			return () => clearInterval(intervalId);
		}
	}, [currentIndex, heartRateData]);

	const handleBreathePress = () => {
		setShowModal(false);
		setShowBreatheModal(true);
	};

	const handleCloseBreathe = () => {
		setShowBreatheModal(false);
		setBpmDisplay(85);
	};

	const currentData = heartRateData[currentIndex];

	return (
		<View style={styles.heartContainer}>
			<View style={styles.heartIconContainer}>
				<Ionicons name="heart-outline" size={150} color="white" />
			</View>

			{bpmDisplay !== null ? (
				<View style={styles.heartRateText}>
					<Text style={styles.heartRateNumber}>{bpmDisplay}</Text>
					<Text style={styles.heartRateBpm}>bpm</Text>
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
							<Ionicons name="heart-outline" size={150} color="white" />
						</View>
						<Text style={styles.modalText}>TAKE A BREATH!</Text>
						<Button
							color={"rgb(227, 124, 255)"}
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
		backgroundColor: "rgb(227, 124, 255)",
		borderRadius: 10,
		overflow: "visible",
	},
	heartIconContainer: {
		top: 40,
	},
	heartIcon: {
		textAlign: "center",
		fontSize: 70,
	},
	heartRateText: {
		position: "relative",
		color: "white",
		fontSize: 22,
		top: -75,
		display: "flex",
		alignItems: "center",
		zIndex: -4,
	},
	heartRateNumber: {
		color: "white",
		fontSize: 42,
	},
	heartRateBpm: {
		color: "white",
		marginTop: 10,
		fontSize: 16,
		top: -18,
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
		margin: 10,
		color: "black",
	},
});
