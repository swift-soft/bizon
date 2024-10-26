import { colors } from "@/constants/colors";
import React, { useState, useRef, useCallback } from "react";
import { Text, Image, StyleSheet, View } from "react-native";
import { AnySizeDragSortableView } from "react-native-drag-sort";
import Widget from "./widgets/widget";
import { Button } from "./ui/button";
import MoodTrackerWidget from "./widgets/mood-tracker";
import NoteWidget from "./widgets/note";
import TimerWidget from "./widgets/timer";
import IdeaBoxWidget from "./widgets/idea";
import SleepWidget from "./widgets/sleep";
import { IconLayoutDashboardFilled } from "@tabler/icons-react-native";
import Heartbeat from "./widgets/Heartbeat";
import StepsWidget from "./widgets/steps";

const headerViewHeight = 100;
const bottomViewHeight = 40;

type WidgetType =
	| "heart-rate"
	| "mood-tracker"
	| "note"
	| "timer"
	| "idea-box"
	| "sleep"
	| "steps";

const initialItems: WidgetType[] = [
	"heart-rate",
	"mood-tracker",
	"note",
	"timer",
	"sleep",
	"idea-box",
	"steps",
];

const typeToWidget: Record<WidgetType, React.ReactNode> = {
	"heart-rate": <Heartbeat />,
	"mood-tracker": <MoodTrackerWidget />,
	note: <NoteWidget />,
	timer: <TimerWidget />,
	"idea-box": <IdeaBoxWidget />,
	sleep: <SleepWidget />,
	steps: <StepsWidget />,
};

const CustomGrid = () => {
	const [items, setItems] = useState(initialItems);
	const [editing, setEditing] = useState(false);
	const [movedKey, setMovedKey] = useState<string | null>(null);
	const [points, setPoints] = useState(123); // Example points data
	const sortableViewRef = useRef<AnySizeDragSortableView>(null);

	const onDeleteItem = useCallback((index: number) => {
		setItems((p) => [...p].splice(index, 1));
	}, []);

	const renderItem = useCallback(
		(item: WidgetType, index: number | null, isMoved: boolean) => (
			<Widget
				id={item}
				movedId={movedKey}
				index={index || 0}
				editing={editing}
				isMoved={isMoved}
				onLongPress={
					!editing
						? undefined
						: () => {
								setMovedKey(item);
								sortableViewRef.current?.startTouch(item, index);
							}
				}
				onPressOut={
					!editing ? undefined : () => sortableViewRef.current?.onPressOut()
				}
				onDelete={onDeleteItem}
			>
				{typeToWidget[item]}
			</Widget>
		),
		[movedKey, onDeleteItem, editing],
	);

	const renderHeaderView = (
		<View style={styles.aheader}>
			{/* User Greeting and Profile Image */}
			<View style={styles.userInfoContainer}>
				<Text style={styles.nameText}>Hi Jimmy</Text>
				<Image
					source={require("../assets/img/cris.jpg")} // replace with actual image URI
					style={styles.userImage}
				/>
			</View>

			{/* Points and Customize Button in One Container */}
			<View style={styles.pointsAndCustomizeContainer}>
				<View style={styles.pointsContainer}>
					<Text style={styles.pointsText}>Points: {points}</Text>
				</View>
				<Button
					className="w-[142px] rounded-full flex items-center flex-row gap-1"
					variant="secondary"
					size="sm"
					onPress={() => setEditing((p) => !p)}
					style={styles.customizeButton}
				>
					<IconLayoutDashboardFilled color="black" size={20} />
					<Text>{editing ? "Save" : "Customize"}</Text>
				</Button>
			</View>
		</View>
	);

	return (
		<AnySizeDragSortableView
			ref={sortableViewRef}
			dataSource={items}
			keyExtractor={(item) => item}
			renderHeaderView={renderHeaderView}
			renderItem={renderItem}
			onDataChange={(data, callback) => {
				setItems(data);
				callback();
			}}
			movedWrapStyle={styles.item_moved}
			onDragEnd={() => setMovedKey(null)}
		/>
	);
};

const styles = StyleSheet.create({
	item_wrap: {
		position: "relative",
		paddingRight: 10,
		paddingTop: 10,
	},
	item: {
		justifyContent: "space-around",
		alignItems: "center",
		backgroundColor: colors.light.cardForeground,
		borderRadius: 4,
	},
	item_clear: {
		width: 20,
		height: 20,
	},
	item_moved: {
		opacity: 0.95,
		borderRadius: 4,
	},
	item_icon_swipe: {
		width: 50,
		height: 50,
		backgroundColor: colors.whiteBg,
		borderRadius: 50 * 0.5,
		justifyContent: "center",
		alignItems: "center",
	},
	item_icon: {
		width: 30,
		height: 30,
		resizeMode: "contain",
	},
	item_text_swipe: {
		backgroundColor: colors.whiteBg,
		width: 56,
		height: 30,
		borderRadius: 15,
		justifyContent: "center",
		alignItems: "center",
	},
	item_text: {
		color: "#444",
		fontSize: 20,
		fontWeight: "bold",
	},
	header: {
		justifyContent: "center",
		alignItems: "center",
	},
	header_title: {
		color: "#333",
		fontSize: 24,
		fontWeight: "bold",
	},
	aheader: {
		height: headerViewHeight,
		flexDirection: "column",
		justifyContent: "space-between",
		alignItems: "flex-start",
		padding: 10,
		zIndex: 100,
	},
	userInfoContainer: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between", // Aligns text on left, image on right
		width: "100%", // Takes full header width
		paddingHorizontal: 10, // Adds padding around
		marginBottom: 10,
	},
	nameText: {
		fontSize: 24,
		color: colors.lightBg,
		fontWeight: "bold",
		marginRight: 8,
	},
	userImage: {
		width: 44,
		height: 44,
		borderRadius: 22,
		marginLeft: 15, // Adds space between text and image
	},
	pointsAndCustomizeContainer: {
		flexDirection: "row",
		alignItems: "center",
		marginTop: 5,
	},
	pointsContainer: {
		backgroundColor: colors.lightBg,
		width: 142,
		paddingVertical: 5,
		paddingHorizontal: 10,
		borderRadius: 15,
		marginRight: 20,
	},
	customizeButton: {
		backgroundColor: colors.lightBg,
	},
	abottom: {
		justifyContent: "center",
		alignItems: "center",
		height: bottomViewHeight,
		backgroundColor: colors.whiteBg,
		zIndex: 100,
		borderTopColor: "#2ecc71",
		borderTopWidth: 2,
	},
	abottom_desc: {
		color: "#333",
		fontSize: 20,
		fontWeight: "bold",
	},
});

export default CustomGrid;
