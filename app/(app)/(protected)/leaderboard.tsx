import React from "react";
import {
	View,
	StyleSheet,
	Text,
	ScrollView,
	SafeAreaView,
	Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { colors } from "@/constants/colors";

// Sample user data array with additional users
const users = [
	{
		name: "Bartosz Nowacki",
		points: 90,
		image: require("../../../assets/img/bart.jpg"),
	},
	{
		name: "Tymek Piwko",
		points: 87,
		image: require("../../../assets/img/tym.jpg"),
	},
	{
		name: "Stano Marcin",
		points: 78,
		image: require("../../../assets/img/stan.jpg"),
	},
	{
		name: "Krzysztof Muszka",
		points: 75,
		image: require("../../../assets/img/cris.jpg"),
	},
	{
		name: "Marcin Grzelowski",
		points: 66,
		image: require("../../../assets/img/mar.jpg"),
	},
	{
		name: "Jakub Cyga",
		points: 59,
		image: require("../../../assets/img/cyg.jpg"),
	},
	{
		name: "Wojciech Makowiński",
		points: 54,
		image: require("../../../assets/img/woj.jpg"),
	},
];

const GOAL_AMOUNT = 1000; // Total goal amount
const TOTAL_POINTS = users.reduce((acc, user) => acc + user.points, 0); // Sum of all user points

export default function Leaderboard() {
	const sortedUsers = [...users].sort((a, b) => b.points - a.points);
	const topUsers = sortedUsers.slice(0, 3);

	// Calculate the percentage of the goal reached
	const progress = Math.min((TOTAL_POINTS / GOAL_AMOUNT) * 100, 100); // Calculate percentage, limit to 100

	return (
		<SafeAreaView style={styles.mainContainer}>
			<View style={styles.title}>
				<Text style={styles.titleText}>Leaderboard</Text>
			</View>

			{/* Charity Goal Section */}
			<View style={styles.charityContainer}>
				<Text style={styles.charityText}>Goal: Raise funds for</Text>
				<Text style={styles.charityGoal}>Dogs in Shelters</Text>
				<AnimatedCircularProgress
					size={120}
					width={15}
					fill={progress} // Use calculated progress
					tintColor="gold"
					onAnimationComplete={() => console.log("onAnimationComplete")}
					backgroundColor={colors.lightBg}
					rotation={0}
					lineCap="round"
				>
					{(fill) => (
						<Text style={styles.fillText}>{Math.round(fill)}%</Text> // Display percentage inside the circle
					)}
				</AnimatedCircularProgress>
				<Text style={styles.progressText}>
					{TOTAL_POINTS} / {GOAL_AMOUNT}
				</Text>
				<Text>points raised</Text>
			</View>

			<ScrollView contentContainerStyle={styles.leaderboard}>
				<View style={styles.podium}>
					{/* Second place on the left */}
					<View style={styles.podiumPosition}>
						<Image source={topUsers[1].image} style={styles.podiumImage} />
						<Ionicons name="trophy" size={36} color="silver" />
						<Text style={styles.podiumUserText}>{topUsers[1].name}</Text>
						<View style={styles.podiumPointsContainer}>
							<Text style={styles.podiumPointsText}>
								{topUsers[1].points} pts
							</Text>
						</View>
					</View>

					{/* First place in the center */}
					<View style={styles.podiumPosition}>
						<Image source={topUsers[0].image} style={styles.podiumImage} />
						<Ionicons name="trophy" size={36} color="gold" />
						<Text style={styles.podiumUserText}>{topUsers[0].name}</Text>
						<View style={styles.podiumPointsContainer}>
							<Text style={styles.podiumPointsText}>
								{topUsers[0].points} pts
							</Text>
						</View>
					</View>

					{/* Third place on the right */}
					<View style={styles.podiumPosition}>
						<Image source={topUsers[2].image} style={styles.podiumImage} />
						<Ionicons name="trophy" size={36} color={colors.bronze} />
						<Text style={styles.podiumUserText}>{topUsers[2].name}</Text>
						<View style={styles.podiumPointsContainer}>
							<Text style={styles.podiumPointsText}>
								{topUsers[2].points} pts
							</Text>
						</View>
					</View>
				</View>
				{sortedUsers.slice(3).map((user, index) => (
					<View key={index} style={styles.userBox}>
						<Text style={styles.rankText}>{index + 4}.</Text>
						<View style={styles.imageBackground}>
							<View style={styles.imageContainer}>
								<Image source={user.image} style={styles.image} />
							</View>
						</View>
						<View style={styles.userInfoContainer}>
							<Text style={styles.userText}>{user.name}</Text>
							<Text style={styles.pointsText}>
								<Text style={{ fontWeight: "bold" }}>{user.points}</Text> points
							</Text>
						</View>
					</View>
				))}
			</ScrollView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	mainContainer: {
		flex: 1,
		alignItems: "center",
		backgroundColor: colors.mainBg,
	},

	title: {
		padding: 8,
		marginTop: 22,
	},

	titleText: {
		fontSize: 28,
		color: colors.textDark,
	},

	charityContainer: {
		alignItems: "center",
		marginVertical: 20,
	},

	charityText: {
		fontSize: 18,
		color: colors.textDark,
	},

	charityGoal: {
		fontSize: 22,
		fontWeight: "bold",
		color: colors.textDark,
		marginBottom: 10,
	},

	fillText: {
		fontSize: 18,
		fontWeight: "bold",
		color: colors.textDark, // Color for the text inside the circle
	},

	progressText: {
		fontSize: 16,
		color: colors.textDark,
		fontWeight: "bold",
		marginTop: 5,
	},

	podium: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginVertical: 8,
		width: "100%",
		paddingHorizontal: 10,
	},

	podiumPosition: {
		borderRadius: 20,
		alignItems: "center",
		padding: 10,
		margin: 6,
		width: "30%",
	},

	podiumImage: {
		width: 60,
		height: 60,
		borderRadius: 30,
		resizeMode: "cover",
		marginBottom: 5,
	},

	podiumUserText: {
		fontSize: 16,
		fontWeight: "bold",
		color: colors.textDark,
		textAlign: "center",
		margin: 4,
		marginBottom: 8,
	},

	podiumPointsText: {
		fontSize: 15,

		color: "#4f126e",
		textAlign: "center",
		fontWeight: "bold",
		padding: 4,
	},

	podiumPointsContainer: {
		backgroundColor: colors.mainBg,
		width: "100%",
		borderRadius: 14,
	},

	leaderboard: {
		flexGrow: 1,
		minWidth: "90%",
		backgroundColor: "#d6e0f5",
		borderRadius: 26,
		margin: 10,
		alignItems: "center",
		paddingBottom: 16,
	},

	userBox: {
		width: "90%",
		height: 70,
		borderRadius: 20,
		marginVertical: 10,
		backgroundColor: colors.whiteBg,
		alignItems: "center",
		flexDirection: "row",
		paddingHorizontal: 10,
	},

	rankText: {
		fontSize: 18,
		fontWeight: "bold",
		color: colors.textDark,
		width: 30,
		textAlign: "center",
	},

	imageBackground: {
		width: 45,
		height: 45,
		borderRadius: 22.5,
		backgroundColor: colors.lightBg,
		alignItems: "center",
		justifyContent: "center",
		marginRight: 10,
	},

	imageContainer: {
		width: 35,
		height: 35,
		borderRadius: 17.5,
		overflow: "hidden",
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: colors.lightBg,
	},

	image: {
		width: "100%",
		height: "100%",
		resizeMode: "cover",
	},

	userInfoContainer: {
		flexDirection: "column",
		justifyContent: "center",
	},

	userText: {
		fontSize: 18,
		fontWeight: "bold",
		color: colors.textDark,
	},

	pointsText: {
		fontSize: 16,
		color: "#2f0b42",
		marginTop: 2,
	},
});
