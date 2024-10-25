import { View } from "react-native";

import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { H1, Muted } from "@/components/ui/typography";
import { useSupabase } from "@/context/supabase-provider";

export default function Settings() {
	const { signOut } = useSupabase();

	return (
		<View className="flex-1 p-4 bg-background gap-y-4">
			<H1 className="">Hi Alice</H1>
			<Muted className="text-center">
				Sign out and return to the welcome screen.
			</Muted>
			<Button
				className="w-full"
				size="default"
				variant="default"
				onPress={signOut}
			>
				<Text>Sign Out</Text>
			</Button>
		</View>
	);
}
