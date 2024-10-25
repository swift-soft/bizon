import { router } from "expo-router";
import { View } from "react-native";

import { Button } from "@/components/ui/button";
import { Progress, ProgressFilledTrack } from "@/components/ui/progress";
import { Text } from "@/components/ui/text";
import { H1, Muted } from "@/components/ui/typography";
import { Center } from "@/components/ui/center";
import { Box } from "@/components/ui/box";

export default function Home() {
	return (
		<View className="flex-1 items-center justify-center bg-background p-4 gap-y-4">
			<H1 className="text-center">Home</H1>
			<Muted className="text-center">
				You are now authenticated and this session will persist even after
				closing the app.
			</Muted>
			<Button
				className="w-full"
				variant="default"
				size="default"
				onPress={() => router.push("/(app)/modal")}
			>
				<Text>Open Modal</Text>
			</Button>
			<Center className="w-[300px] h-[150px] bg-slate-900">
				<Box className="w-[300px] h-[100px] bg-green-300" />
				<Progress value={40} size="md" orientation="horizontal">
					<ProgressFilledTrack />
				</Progress>
			</Center>
		</View>
	);
}
