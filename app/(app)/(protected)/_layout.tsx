import { Tabs } from "expo-router";
import React from "react";
import { Ionicons } from "@expo/vector-icons"; // Import the icon library
import { colors } from "@/constants/colors"; // Ensure this contains your color definitions
import { useColorScheme } from "@/lib/useColorScheme";

export default function ProtectedLayout() {
	const { colorScheme } = useColorScheme();

	// Define custom colors
	const activeIconColor = colors.mainBg; // Color for active (focused) icons
	const tabBarColor = colors.lightBg; // Color for the tab bar

	return (
		<Tabs
			screenOptions={{
				headerShown: false,
				tabBarStyle: {
					backgroundColor: tabBarColor, // Set tab bar background color
				},
				tabBarShowLabel: false,
			}}
		>
			<Tabs.Screen
				name="leaderboard"
				options={{
					title: "Leaderboard",
					tabBarIcon: ({ focused, size }) => (
						<Ionicons
							name={focused ? "trophy" : "trophy-outline"}
							size={size}
							color={focused ? activeIconColor : colors.light.inactive} // Set active and inactive colors
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="index"
				options={{
					title: "Home",
					tabBarIcon: ({ focused, size }) => (
						<Ionicons
							name={focused ? "home" : "home-outline"}
							size={size}
							color={focused ? activeIconColor : colors.light.inactive} // Set active and inactive colors
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="company"
				options={{
					title: "Company Overview",
					tabBarIcon: ({ focused, size }) => (
						<Ionicons
							name={focused ? "business" : "business-outline"}
							size={size}
							color={focused ? activeIconColor : colors.light.inactive} // Set active and inactive colors
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="settings"
				options={{
					title: "Settings",
					tabBarIcon: ({ focused, size }) => (
						<Ionicons
							name={focused ? "settings" : "settings-outline"}
							size={size}
							color={focused ? activeIconColor : colors.light.inactive} // Set active and inactive colors
						/>
					),
				}}
			/>
		</Tabs>
	);
}
