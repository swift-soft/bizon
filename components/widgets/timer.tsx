import React from "react";
import { Image } from "react-native";

export default function TimerWidget() {
	return (
		<Image
			className="w-[158px] h-[158px]"
			source={require("../../assets/timer.png")}
		/>
	);
}
