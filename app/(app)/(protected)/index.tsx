import { router } from "expo-router";
import { SafeAreaView, View } from "react-native";

import { Button } from "@/components/ui/button";
import { Progress, ProgressFilledTrack } from "@/components/ui/progress";
import { Text } from "@/components/ui/text";
import { H1, Muted } from "@/components/ui/typography";
import { Center } from "@/components/ui/center";
import { Box } from "@/components/ui/box";
import CustomGrid from "@/components/custom-grid";

export default function Home() {
	return (
		<View className="flex-1 bg-background p-4 gap-y-4 pt-12">
			<SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
				<H1>Hi Jimmy</H1>
				{/* <Muted className="text-center">
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
				</Button> */}
				<CustomGrid />
			</SafeAreaView>
		</View>
	);
}
