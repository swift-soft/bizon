import { formatSeconds } from "@/lib/formatSeconds";
import React, { useEffect, useRef, useState } from "react";
import { Text, StyleSheet, View } from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { Button } from "../ui/button";
import {
	IconPlayerPauseFilled,
	IconPlayerPlayFilled,
} from "@tabler/icons-react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@/constants/colors";

const DEFAULT_TIME = 60 * 10;

export default function TimerWidget() {
	const [resetted, setResetted] = useState(true);
	const [counting, setCounting] = useState(false);
	const [maxSeconds, setMaxSeconds] = useState(DEFAULT_TIME);
	const [currentSeconds, setCurrentSeconds] = useState(DEFAULT_TIME);

	const intervalID = useRef<ReturnType<typeof setInterval> | null>(null);

	useEffect(() => {
		if (counting) {
			if (resetted) {
				setCurrentSeconds(maxSeconds);
				setResetted(false);
			}

			intervalID.current = setInterval(() => {
				setCurrentSeconds((p) => {
					const next = p - 1;

					if (next <= 0) {
						setCounting(false);
						setResetted(true);
						return 0;
					}

					return next;
				});
			}, 1000);
		} else {
			intervalID.current && clearInterval(intervalID.current);
			intervalID.current = null;
		}

		return () => {
			intervalID.current && clearInterval(intervalID.current);
			intervalID.current = null;
		};
	}, [counting]);

	useEffect(() => {
		setCounting(false);
		setResetted(true);
	}, [maxSeconds]);

	return (
		<View style={styles.timerContainer}>
			<AnimatedCircularProgress
				size={120}
				width={14}
				fill={
					resetted ? 100 : Math.min((currentSeconds / maxSeconds) * 100, 100)
				}
				tintColor="#F1CD41"
				onAnimationComplete={() => console.log("onAnimationComplete")}
				backgroundColor="rgb(189, 189, 189)"
				rotation={0}
				lineCap="round"
			>
				{(fill) => (
					<View style={styles.innerContainer}>
						<Button
							variant="ghost"
							size="icon"
							className="rounded-full"
							onPress={() => setMaxSeconds((p) => p + 30)}
							disabled={counting}
						>
							<Text
								style={{
									fontSize: 30,
									color: "white",
									fontWeight: "600",
									top: 2,
								}}
							>
								+
							</Text>
						</Button>
						<Text style={styles.fillText}>
							{formatSeconds(resetted ? maxSeconds : currentSeconds)}
						</Text>
						<Button
							variant="ghost"
							size="icon"
							className="rounded-full"
							onPress={() => setMaxSeconds((p) => p - 30)}
							disabled={counting}
						>
							<Text
								style={{
									fontSize: 49,
									color: "white",
									top: -23,
									fontWeight: "700",
								}}
							>
								-
							</Text>
						</Button>
					</View>
				)}
			</AnimatedCircularProgress>
			<View style={styles.buttons}>
				<Button
					size="icon"
					className="bg-gray-700 rounded-full"
					onPress={() => setCounting((p) => !p)}
				>
					<Ionicons
						name={counting ? "pause" : "play"}
						size={16}
						color="white"
					/>
				</Button>
				<Button
					size="icon"
					variant="outline"
					className="rounded-full"
					onPress={() => {
						setCounting(false);
						setResetted(true);
						setCurrentSeconds(maxSeconds);
					}}
				>
					<Ionicons name="stop" size={16} color="#444" />
				</Button>
			</View>
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
		backgroundColor: "#74CEFF",
		borderRadius: 10,
		overflow: "hidden",
		padding: 6,
	},

	image: {
		width: 130,
		height: 130,
	},

	innerContainer: {
		alignItems: "center",
		justifyContent: "space-between",
	},

	timerButton: {
		backgroundColor: "none",
	},

	fillText: {
		textAlign: "center",
		fontSize: 28,
		fontWeight: "bold",
		color: "white", // Color for the text inside the circle
	},

	buttons: {
		marginTop: -12,
		width: "100%",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
});
