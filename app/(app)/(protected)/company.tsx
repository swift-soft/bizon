import { ScrollView, View } from "react-native";

import { H1 } from "@/components/ui/typography";
import {
	Select,
	SelectBackdrop,
	SelectContent,
	SelectDragIndicator,
	SelectDragIndicatorWrapper,
	SelectIcon,
	SelectInput,
	SelectItem,
	SelectPortal,
	SelectTrigger,
} from "@/components/ui/select";
import Icon from "react-native-vector-icons/AntDesign";

export default function Settings() {
	return (
		<View className="flex-1 p-4 bg-background ">
			<H1 className="mb-4">Hi Alice</H1>

			<Select className="w-1/2">
				<SelectTrigger variant="underlined" size="md">
					<SelectInput placeholder="Select department" />
					<SelectIcon
						as={Icon}
						name="down"
						size={15}
						color="white"
						style={{ marginRight: 12 }}
					/>
				</SelectTrigger>
				<SelectPortal>
					<SelectBackdrop />
					<SelectContent>
						<SelectItem label="Research and Development" value="r&d" />
						<SelectItem label="Medical Affairs" value="medical-affairs" />
						<SelectItem label="Information Technology" value="it" />
						<SelectItem
							label="Commercial Operations"
							value="commercial-operations"
						/>
						<SelectItem label="Finance and Legal" value="finance-legal" />
					</SelectContent>
				</SelectPortal>
			</Select>

			<ScrollView className="items-center justify-center flex-1 mt-4">
				<View className="grid grid-cols-2 gap-4">
					<View className="rounded h-36 w-36 bg-slate-400"></View>
					<View className="rounded h-36 w-36 bg-slate-400"></View>
					<View className="rounded h-36 w-36 bg-slate-400"></View>
					<View className="rounded h-36 w-36 bg-slate-400"></View>
					<View className="rounded h-36 w-36 bg-slate-400"></View>
					<View className="rounded h-36 w-36 bg-slate-400"></View>
				</View>
			</ScrollView>
		</View>
	);
}
