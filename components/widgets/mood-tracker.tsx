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

export default function MoodTrackerWidget() {
	const [modalVisible, setModalVisible] = useState(false);
	const [userFeeling, setUserFeeling] = useState("");

	return (
		<View style={styles.moodContainer}>
			{/* Main Image Trigger */}
			<TouchableOpacity onPress={() => setModalVisible(true)}>
				<Image
					style={styles.image}
					source={require("../../assets/img/dial.png")}
				/>
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
							color="#b08afb"
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
		backgroundColor: "#f8dbff",
		borderRadius: 10,
		overflow: "hidden",
	},
	image: {
		width: 130,
		height: 130,
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
		backgroundColor: "#f8dbff",
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
		color: "#b08afb",
	},
});
