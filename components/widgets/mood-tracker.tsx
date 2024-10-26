import React from "react";
import { Image } from "react-native";

export default function MoodTrackerWidget() {
	return (
		<Image
			className="w-[158px] h-[158px]"
			source={require("../../assets/mood-tracker.png")}
		/>
	);
}
