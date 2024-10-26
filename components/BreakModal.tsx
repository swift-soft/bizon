// BreakModal.js
import { colors } from "@/constants/colors";
import React from "react";
import { View, Text, Button, StyleSheet, Modal } from "react-native";

const BreakModal = ({ visible, onClose }) => {
	return (
		<Modal
			animationType="slide"
			transparent={true}
			visible={visible}
			onRequestClose={onClose}
		>
			<View style={styles.modalBackground}>
				<View style={styles.modalContainer}>
					<Text style={styles.modalTitle}>Time for a Break!</Text>
					<Text style={styles.modalMessage}>
						It looks like you might need a break based on your current health
						data. Take some time to relax!
					</Text>
					<Button title="Close" onPress={onClose} color="#b08afb" />
				</View>
			</View>
		</Modal>
	);
};

const styles = StyleSheet.create({
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
	modalMessage: {
		fontSize: 16,
		marginBottom: 20,
		textAlign: "center",
	},
});

export default BreakModal;
