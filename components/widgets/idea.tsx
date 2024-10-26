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

export default function IdeaBoxWidget() {
	const [modalVisible, setModalVisible] = useState(false);
	const [userFeeling, setUserFeeling] = useState("");

	return (
		<View style={styles.moodContainer}>
			{/* Main Image Trigger */}
			<TouchableOpacity onPress={() => setModalVisible(true)}>
				<View style={{ top: 1 }}>
					<Ionicons name="bulb-outline" size={120} color="white" />
				</View>
				<Text
					style={{
						color: "white",
						fontSize: 20,
						alignSelf: "center",
						fontWeight: "500",
					}}
				>
					Idea Box
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
						<Text style={styles.modalTitle}>
							Do you have any idea what could be improved at work?
						</Text>

						{/* Mood Options */}
						<View style={styles.emojiContainer}>
							<Image
								style={styles.thinking}
								source={require("../../assets/img/think.png")}
							/>
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
							color={colors.main}
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
		backgroundColor: "#65DD99",
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
		backgroundColor: colors.lightBg,
		borderRadius: 10,
		alignItems: "center",
	},
	modalTitle: {
		fontSize: 18,
		fontWeight: "bold",
		marginBottom: 15,
	},
	emojiContainer: {
		flexDirection: "row",
		justifyContent: "space-around",
		width: "100%",
		marginBottom: 20,
	},
	thinking: {
		width: 80,
		height: 80,
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
