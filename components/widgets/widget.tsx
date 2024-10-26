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
					"pr-2 relative",
					id === movedId && !isMoved ? "opacity-0" : "opacity-1",
				)}
			>
				{editing && (
					<View
						style={{
							position: "absolute",
							right: 2,
							top: -4,
							width: 20,
							height: 20,
							zIndex: 50,
							backgroundColor: "white",
							borderRadius: 999,
						}}
					>
						<TouchableOpacity onPress={() => onDelete?.(index)}>
							<Image
								style={{
									width: 20,
									height: 20,
								}}
								source={require("../../assets/clear.png")}
							/>
						</TouchableOpacity>
					</View>
				)}
				{editing ? <View pointerEvents="none">{children}</View> : children}
			</View>
		</TouchableOpacity>
	);
}
