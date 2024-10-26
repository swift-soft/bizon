import React from "react";
import { TouchableOpacity, View, Image } from "react-native";

import { cn } from "@/lib/utils";

type Props = {
	index: number;
	id: string;
	movedId: string | null;
	editing?: boolean;
	children?: React.ReactNode;
	isMoved?: boolean;
	onLongPress?: () => void;
	onPressOut?: () => void;
	onDelete?: (index: number) => void;
};

export default function Widget({
	index,
	id,
	movedId,
	editing,
	children,
	isMoved,
	onLongPress,
	onPressOut,
	onDelete,
}: Props) {
	return (
		<TouchableOpacity
			onLongPress={editing ? onLongPress : undefined}
			onPressOut={editing ? undefined : onPressOut}
		>
			<View
				className={cn(
					"pt-2 pr-2 relative",
					id === movedId && !isMoved ? "opacity-0" : "opacity-1",
				)}
			>
				{editing && (
					<View className="absolute right-1 top-1 w-4 h-4 z-50">
						<TouchableOpacity onPress={() => onDelete?.(index)}>
							<Image
								className="w-4 h-4"
								source={require("../../assets/clear.png")}
							/>
						</TouchableOpacity>
					</View>
				)}
				{children}
			</View>
		</TouchableOpacity>
	);
}
