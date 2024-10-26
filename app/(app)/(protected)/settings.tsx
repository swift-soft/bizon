import { View, Text, StyleSheet } from "react-native";
import { useSupabase } from "@/context/supabase-provider";
import { colors } from "@/constants/colors";

export default function Settings() {
	const { signOut } = useSupabase();

	return (
		<View style={styles.mainContainer}>
			<Text style={styles.header}>Settings</Text>

			{/* Name Field */}
			<View style={styles.fieldContainer}>
				<Text style={styles.label}>Name</Text>
				<Text style={styles.value}>Krzysztof</Text>
			</View>

			{/* Surname Field */}
			<View style={styles.fieldContainer}>
				<Text style={styles.label}>Surname</Text>
				<Text style={styles.value}>Muszka</Text>
			</View>

			{/* Email Field */}
			<View style={styles.fieldContainer}>
				<Text style={styles.label}>Email</Text>
				<Text style={styles.value}>k.muszka@gmail.com</Text>
			</View>

			{/* Camera Settings Field */}
			<View style={styles.fieldContainer}>
				<Text style={styles.label}>Camera Settings</Text>
				<Text style={styles.value}>Default</Text>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	mainContainer: {
		flex: 1,
		backgroundColor: colors.mainBg,
		padding: 20,
		alignItems: "center",
		justifyContent: "flex-start",
	},
	header: {
		fontSize: 24,
		fontWeight: "bold",
		color: colors.dark,
		marginBottom: 20,
		marginTop: 40,
	},
	fieldContainer: {
		width: "90%",
		paddingVertical: 20,
		paddingHorizontal: 15,
		marginVertical: 26,
		borderRadius: 8,
		backgroundColor: colors.lightBg,
		flexDirection: "row",
		justifyContent: "space-between",
	},
	label: {
		fontSize: 16,
		fontWeight: "600",
		color: colors.dark,
	},
	value: {
		fontSize: 16,
		color: colors.primaryText,
	},
});
