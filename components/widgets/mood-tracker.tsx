import { colors } from "@/constants/colors";
import React, { useState } from "react";
import {
	View,
	Image,
	StyleSheet,
	Modal,
	Text,
	TouchableOpacity,
	TextInput,
	Button,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function MoodTrackerWidget() {
	const [modalVisible, setModalVisible] = useState(false);
	const [userFeeling, setUserFeeling] = useState("");

	return (
		<View style={styles.moodContainer}>
			{/* Main Image Trigger */}
			<TouchableOpacity onPress={() => setModalVisible(true)}>
				<View style={{ top: 1 }}>
					<Ionicons name="happy-outline" size={120} color="white" />
				</View>
				<Text
					style={{
						color: "white",
						fontSize: 20,
						alignSelf: "center",
						fontWeight: "500",
					}}
				>
					Mood tracker
				</Text>
			</TouchableOpacity>

			{/* Modal for Mood Selection */}
			<Modal
				animationType="slide"
				transparent={true}
				visible={modalVisible}
				onRequestClose={() => setModalVisible(false)}
			>
				<View style={styles.modalBackground}>
					<View style={styles.modalContainer}>
						<Text style={styles.modalTitle}>How are you feeling today?</Text>

						{/* Mood Options */}
						<View style={styles.faceContainer}>
							<TouchableOpacity>
								<Image
									style={styles.face}
									source={require("../../assets/img/smile.png")}
								/>
							</TouchableOpacity>
							<TouchableOpacity>
								<Image
									style={styles.face}
									source={require("../../assets/img/neutral.png")}
								/>
							</TouchableOpacity>
							<TouchableOpacity>
								<Image
									style={styles.face}
									source={require("../../assets/img/sad.png")}
								/>
							</TouchableOpacity>
						</View>

						{/* Text Input for Feelings */}
						<TextInput
							style={styles.input}
							placeholder="Write about your feelings..."
							value={userFeeling}
							onChangeText={(text) => setUserFeeling(text)}
						/>

						{/* Close Button */}
						<Button
							title="Done"
							color="rgb(227, 124, 255)"
							onPress={() => setModalVisible(false)}
						/>
					</View>
				</View>
			</Modal>
		</View>
	);
}

const styles = StyleSheet.create({
	moodContainer: {
		height: 158,
		width: 158,
		alignItems: "center",
		justifyContent: "center",
		marginBottom: 10,
		backgroundColor: "#FE9B96",
		borderRadius: 10,
		overflow: "hidden",
	},

	modalBackground: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "rgba(0, 0, 0, 0.5)",
	},
	modalContainer: {
		width: 300,
		padding: 20,
		backgroundColor: colors.mainBg,
		borderRadius: 10,
		alignItems: "center",
	},
	modalTitle: {
		fontSize: 18,
		fontWeight: "bold",
		marginBottom: 15,
	},
	faceContainer: {
		flexDirection: "row",
		justifyContent: "space-around",
		width: "100%",
		marginBottom: 20,
	},
	face: {
		width: 50,
		height: 50,
	},
	input: {
		height: 40,
		borderColor: "gray",
		borderWidth: 1,
		width: "100%",
		paddingHorizontal: 10,
		marginBottom: 20,
		borderRadius: 5,
	},

	button: {
		color: colors.mainBg,
	},
});
