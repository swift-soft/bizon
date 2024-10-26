import React from "react";

import { Image } from "../image";

export default function SleepWidget() {
	return (
		<Image
			className="w-[323px] h-[158px]"
			source={require("../../assets/sleep.webp")}
		/>
	);
}
