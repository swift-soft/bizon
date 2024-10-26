import React, { useState } from "react";
import {
	Image,
	StyleSheet,
	View,
	Text,
	Modal,
	TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@/constants/colors";

const tipsData = require("../../assets/tips.json");

export default function NoteWidget() {
	const [showModal, setShowModal] = useState(false);
	const randomTip =
		tipsData.pro_tips[Math.floor(Math.random() * tipsData.pro_tips.length)].tip;

	const handleOpenModal = () => {
		setShowModal(true);
	};

	const handleCloseModal = () => {
		setShowModal(false);
	};

	return (
		<View style={styles.noteContainer}>
			{/* Icon button to open the modal */}
			<TouchableOpacity onPress={handleOpenModal}>
				<Ionicons name="document-outline" size={120} color="white" />
				<Text
					style={{
						color: "white",
						fontSize: 20,
						alignSelf: "center",
						fontWeight: "500",
					}}
				>
					Quick Tip
				</Text>
			</TouchableOpacity>

			{/* Modal with note image and text */}
			<Modal
				visible={showModal}
				transparent={true}
				animationType="slide"
				onRequestClose={handleCloseModal}
			>
				<View style={styles.modalOverlay}>
					<View style={styles.modalContainer}>
						<View>
							<TouchableOpacity
								onPress={handleCloseModal}
								style={styles.closeButton}
							>
								<Text style={styles.closeButtonText}>X</Text>
							</TouchableOpacity>
						</View>
						<Image
							style={styles.image}
							source={require("../../assets/note-2.webp")}
						/>
						<Text style={styles.modalText}>{randomTip}</Text>
					</View>
				</View>
			</Modal>
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
		backgroundColor: "#F1CD41",
		borderRadius: 10,
		overflow: "hidden",
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
	},

	image: {
		width: 280,
		height: 280,
		marginBottom: 15,
		transform: [{ rotate: "-12deg" }],
	},

	modalText: {
		top: -230,
		color: "#888",
		textAlign: "center",
		paddingHorizontal: 10,
		fontSize: 20,
	},

	closeButton: {
		position: "relative",
		right: "-50%",
		backgroundColor: "rgba(0, 0, 0, 0.5)",
		aspectRatio: 1,
		padding: 10,
		borderRadius: 100,
	},

	closeButtonText: {
		textAlign: "center",
		color: "white",
		fontSize: 25,
		fontWeight: "700",
	},
});
