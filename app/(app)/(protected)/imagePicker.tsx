import { useState } from "react";
import {
	Button,
	Image,
	View,
	StyleSheet,
	Modal,
	TouchableOpacity,
	Text,
	ScrollView,
	TextInput,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { colors } from "@/constants/colors";
import { Ionicons } from "@expo/vector-icons";

export default function BeRealExample() {
	const [image, setImage] = useState<string | null>(null);
	const [isPosted, setIsPosted] = useState<boolean>(false);
	const [selectedImage, setSelectedImage] = useState<string | null>(null);
	const [modalVisible, setModalVisible] = useState<boolean>(false);
	const [activityText, setActivityText] = useState<string>(""); // Initial value is empty
	const [timeText, setTimeText] = useState<string>(""); // State for the time

	const friendsImages = [
		{
			id: "1",
			name: "Karolina",
			image: require("../../../assets/img/friend1.jpg"),
			activity: "Running",
			time: "4:09pm",
		},
		{
			id: "2",
			name: "Andrzej",
			image: require("../../../assets/img/friend2.jpg"),
			activity: "Hiking",
			time: "4:42pm",
		},
		{
			id: "3",
			name: "Karol",
			image: require("../../../assets/img/friend3.jpg"),
			activity: "Walking in the forest",
			time: "5:18pm",
		},
	];

	const takePhoto = async () => {
		const { status } = await ImagePicker.requestCameraPermissionsAsync();
		if (status !== "granted") {
			alert("Camera access is required to take photos.");
			return;
		}

		let result = await ImagePicker.launchCameraAsync({
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1,
		});

		if (!result.canceled) {
			setImage(result.assets[0].uri);
			setIsPosted(true);
			// Get the current time when the photo is taken in 12-hour format
			const currentTime = new Date().toLocaleTimeString([], {
				hour: "numeric",
				minute: "2-digit",
				hour12: true, // Enable 12-hour format
			});
			setTimeText(currentTime);
		}
	};

	const openImage = (uri: string) => {
		setSelectedImage(uri);
		setModalVisible(true);
	};

	const handleFocus = () => {
		// Clear text when the input gains focus
		if (!isPosted) {
			setActivityText(""); // Set to empty string
		}
	};

	const handleBlur = () => {
		// Optionally you could set editable to false to hide the cursor
		// This is an alternative method to hide the cursor.
	};

	return (
		<View style={styles.container}>
			{/* Header Section */}
			<View style={styles.header}>
				<Text style={styles.headerTitle}>Share your activity</Text>
			</View>

			{/* Display user's image (blurred if not posted) with button overlay */}
			<View style={styles.userImageContainer}>
				<TouchableOpacity onPress={() => image && openImage(image)}>
					<Image
						source={
							isPosted
								? { uri: image }
								: require("../../../assets/img/blur.jpg")
						}
						style={[styles.userImage, !isPosted && styles.blurredImage]}
					/>
				</TouchableOpacity>

				{/* Button Overlay */}
				{!isPosted && (
					<TouchableOpacity style={styles.overlayButton} onPress={takePhoto}>
						<Ionicons name="camera" color="white" size={34} />
					</TouchableOpacity>
				)}

				{/* Editable Activity Text */}
				<TouchableOpacity>
					<TextInput
						style={styles.activityInput}
						value={activityText}
						onChangeText={setActivityText}
						placeholder="Type your activity"
						editable={isPosted} // Allow editing only after posting
						onFocus={handleFocus} // Clear text on focus
						onBlur={handleBlur} // Optional: You can handle blur here if needed
					/>
				</TouchableOpacity>

				{/* Display Time */}
				<Text style={styles.activityText}>{timeText}</Text>
			</View>

			{/* Friends' Photos - Vertical Scroll */}
			<ScrollView style={styles.imagesContainer}>
				<Text style={styles.sectionTitle}>Friends' Activities</Text>
				{friendsImages.map((friend) => (
					<View key={friend.id} style={styles.friendContainer}>
						<TouchableOpacity onPress={() => openImage(friend.image)}>
							<Image source={friend.image} style={styles.friendImage} />
						</TouchableOpacity>
						<View style={styles.friendInfo}>
							<Text style={styles.nameText}>{friend.name}</Text>
							<Text style={styles.activityText}>{friend.activity}</Text>
							<Text style={styles.timeText}>{friend.time}</Text>
						</View>
					</View>
				))}
			</ScrollView>

			{/* Modal to display selected image */}
			<Modal visible={modalVisible} transparent={true} animationType="fade">
				<View style={styles.modalContainer}>
					<TouchableOpacity onPress={() => setModalVisible(false)}>
						<Image source={{ uri: selectedImage }} style={styles.fullImage} />
					</TouchableOpacity>
				</View>
			</Modal>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		backgroundColor: colors.mainBg,
	},
	header: {
		backgroundColor: colors.mainBg,
		marginTop: 20,
		padding: 10,
		alignItems: "center",
	},
	headerTitle: {
		fontSize: 24,
		color: colors.dark,
		fontWeight: "bold",
	},
	userImageContainer: {
		backgroundColor: colors.lightBg,
		width: "80%",
		borderRadius: 30,
		alignItems: "center",
		marginVertical: 10,
		justifyContent: "center",
	},
	userImage: {
		width: 200,
		height: 200,
		borderRadius: 10,
		marginTop: 20,
	},
	blurredImage: {
		opacity: 0.8,
	},
	imageInfo: {
		fontSize: 16,
		color: colors.dark,
		marginTop: 4,
	},
	activityInput: {
		width: "80%",
		marginTop: 4,
		marginVertical: 4,
		fontSize: 16,
		textAlign: "center",
		alignSelf: "center",
	},
	activityText: {
		color: colors.dark,
		fontSize: 16,
		margin: 6,
	},
	overlayButton: {
		position: "absolute",

		backgroundColor: colors.mainBg,
		paddingVertical: 12,
		paddingHorizontal: 25,

		borderWidth: 1,
		borderColor: "white",
		borderRadius: 60,
		elevation: 2,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.8,
		shadowRadius: 4,
	},
	buttonText: {
		color: "#fff",
		fontSize: 18,
		fontWeight: "bold",
		textAlign: "center",
	},
	nameText: {
		fontSize: 22,
		fontWeight: "bold",
		color: colors.mainBg,
		textDecorationLine: "underline",
		textDecorationStyle: "solid",
		textDecorationColor: "#000",
	},
	timeText: {
		color: "black",
		fontSize: 14,
		margin: 6,
	},
	imagesContainer: {
		padding: 20,
		marginBottom: 6,
	},
	sectionTitle: {
		fontSize: 18,
		color: colors.dark,
		marginBottom: 10,
		textAlign: "center",
	},
	friendContainer: {
		minWidth: "95%",
		height: 100,
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 20,
		backgroundColor: colors.lightBg,
		borderRadius: 20,
	},
	friendImage: {
		width: 80,
		height: 80,
		borderRadius: 10,
		margin: 10,
	},
	friendInfo: {
		flexDirection: "column",
	},
	modalContainer: {
		flex: 1,
		backgroundColor: "rgba(0, 0, 0, 0.8)",
		alignItems: "center",
		justifyContent: "center",
	},
	fullImage: {
		width: "90%",
		height: "70%",
		borderRadius: 10,
	},
});