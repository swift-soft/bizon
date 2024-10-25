import {
	View,
	StyleSheet,
	Text,
	ScrollView,
	SafeAreaView,
	Image,
	} from "react-native";
	
	export default function Leaderboard() {
	return (
	<SafeAreaView style={styles.mainContainer}>
	<View style={styles.title}>
	<Text style={styles.titleText}>Leaderboard</Text>
	</View>
	
	<ScrollView contentContainerStyle={styles.leaderboard}>
	<View style={styles.userBox}>
	<View style={styles.imageContainer}>
	<Image
	source={require("../../../assets/img/man-642075_1920.jpg")}
	style={styles.image}
	/>
	</View>
	
	<Text style={styles.userText}>Janek</Text>
	<Text style={styles.userText}>80</Text>
	</View>
	</ScrollView>
	</SafeAreaView>
	);
	}
	
	const styles = StyleSheet.create({
	mainContainer: {
	flex: 1,
	alignItems: "center",
	backgroundColor: "#b08afb",
	},
	
	title: {
	padding: 20,
	},
	
	titleText: {
	fontSize: 40,
	},
	
	leaderboard: {
	flex: 1,
	minWidth: "80%",
	backgroundColor: "#f8dbff",
	borderRadius: 50,
	marginBottom: 10,
	alignItems: "center",
	},
	
	userBox: {
	width: "80%",
	height: 50,
	borderRadius: 50,
	margin: 14,
	backgroundColor: "#ffffff",
	alignItems: "center",
	justifyContent: "space-around",
	flexDirection: "row",
	},
	
	imageContainer: {
	width: 30,
	height: 30,
	borderRadius: 15,
	backgroundColor: '#f8dbff',
	overflow: "hidden",
	textAlign: "center",
	alignItems: "center",
	
	},
	
	image: {
	width: "100%",
	height: "100%",
	borderRadius: 15,
	resizeMode: "cover",
	},
	
	userText: {
	fontSize: 20,
	fontWeight: "bold",
	},
	});