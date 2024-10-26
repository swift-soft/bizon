import { colors } from "@/constants/colors";
import React from "react";
import { Image, View, StyleSheet, Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";

import data from "../../data/sleep_data_short.json";

// Function to group data by hour and calculate average heart rate
const groupByHourAndAverage = (data) => {
	const hourlyData = {};

	data.forEach((record) => {
		// Extract hour from the timestamp
		const hour = new Date(record.timestamp).getHours();

		// Initialize array for each hour if not present
		if (!hourlyData[hour]) {
			hourlyData[hour] = { totalHeartRate: 0, count: 0 };
		}

		// Accumulate heart rate and count
		hourlyData[hour].totalHeartRate += record.heart_rate;
		hourlyData[hour].count += 1;
	});

	// Calculate average for each hour
	const averageHeartRates = Object.keys(hourlyData).map((hour) => ({
		hour: `${hour}:00`,
		averageHeartRate: hourlyData[hour].totalHeartRate / hourlyData[hour].count,
	}));

	return averageHeartRates;
};

const dataByHour = groupByHourAndAverage(data);

// Parse data for chart
const labels = dataByHour.map((data) => data.hour); // Extract time in "HH:MM" format
const heartRates = dataByHour.map((data) => data.averageHeartRate);

export default function SleepWidget() {
	return (
		<View style={styles.container}>
			<LineChart
				data={{
					labels,
					datasets: [
						{
							data: heartRates,
						},
					],
				}}
				width={323} // from react-native
				height={158}
				yAxisLabel="bpm "
				yAxisInterval={1} // optional, defaults to 1
				chartConfig={{
					backgroundColor: "#a77bea",
					backgroundGradientFrom: "#a77bea",
					backgroundGradientTo: "#a77bea",
					decimalPlaces: 0, // optional, defaults to 2dp
					color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
					labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
					propsForDots: {
						r: "3",
						strokeWidth: "0",
						stroke: "#4f126e",
					},
					fillShadowGradientFromOpacity: 0.6,
					fillShadowGradientToOpacity: 0,
					style: {
						paddingBottom: 10,
					},
				}}
				bezier
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		alignItems: "center",
		justifyContent: "center",
		marginBottom: 10,
		backgroundColor: "#a77bea",
		borderRadius: 10,
		overflow: "hidden",
		paddingBottom: 4,
	},
});
