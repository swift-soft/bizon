import { Slot } from "expo-router";

import "@/global.css";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";

import "../global.css";

import { SupabaseProvider } from "@/context/supabase-provider";

export default function AppLayout() {
	return (
		<GluestackUIProvider mode="light">
			<SupabaseProvider>
				<Slot />
			</SupabaseProvider>
		</GluestackUIProvider>
	);
}
