import { colors } from "@/constants/colors";
import React, { useState, useRef, useCallback } from "react";
import {
	Text,
	TouchableOpacity,
	StyleSheet,
	View,
	Image,
	Dimensions,
	SafeAreaView,
} from "react-native";
import { AnySizeDragSortableView } from "react-native-drag-sort";
import Widget from "./widgets/widget";
import { Button } from "./ui/button";
import HeartRateWidget from "./widgets/heart-rate";
import MoodTrackerWidget from "./widgets/mood-tracker";
import NoteWidget from "./widgets/note";
import TimerWidget from "./widgets/timer";
import Breathe from "./widgets/Breathe";
import IdeaBoxWidget from "./widgets/idea";
import SleepWidget from "./widgets/sleep";
import { IconLayoutDashboardFilled } from "@tabler/icons-react-native";
import Heartbeat from "./widgets/Heartbeat";
import BreakModal from "./BreakModal";
// const { width } = Dimensions.get("window");
const headerViewHeight = 160;
const bottomViewHeight = 40;

type WidgetType =
	| "heart-rate"
	| "mood-tracker"
	| "note"
	| "timer"
	| "breathe"
	| "idea-box"
	| "sleep";

const initialItems: WidgetType[] = [
	"heart-rate",
	"mood-tracker",
	"note",
	"timer",
	"sleep",
	"breathe",
	"idea-box",
];

const typeToWidget: Record<WidgetType, React.ReactNode> = {
	"heart-rate": <Heartbeat />,
	"mood-tracker": <MoodTrackerWidget />,
	note: <NoteWidget />,
	timer: <TimerWidget />,
	// breathe: <Breathe />,
	"idea-box": <IdeaBoxWidget />,
	sleep: <SleepWidget />,
};

const CustomGrid = () => {
	const [items, setItems] = useState(initialItems);
	const [editing, setEditing] = useState(false);
	const [movedKey, setMovedKey] = useState<string | null>(null);
	const sortableViewRef = useRef<AnySizeDragSortableView>(null);

	const onDeleteItem = useCallback((index: number) => {
		setItems((p) => [...p].splice(index, 1));
	}, []);

	const renderItem = useCallback(
		(item: WidgetType, index: number, isMoved: boolean) => (
			<Widget
				id={item}
				movedId={movedKey}
				index={index}
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

	return (
		<>
			<Button
				className="w-[142px] rounded-full mb-4 flex items-center flex-row gap-1 self-end"
				variant="secondary"
				size="sm"
				onPress={() => setEditing((p) => !p)}
				style={styles.customizeContainer}
			>
				<IconLayoutDashboardFilled color="black" size={20} />
				<Text>Customize</Text>
			</Button>
			<AnySizeDragSortableView
				ref={sortableViewRef}
				dataSource={items}
				keyExtractor={(item) => item}
				renderItem={renderItem}
				onDataChange={(data, callback) => {
					setItems(data);
					callback();
				}}
				movedWrapStyle={styles.item_moved}
				onDragEnd={() => setMovedKey(null)}
				style={styles.widgetContainer}
			/>
		</>
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
		backgroundColor: "#fff",
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
		backgroundColor: "#fff",
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
		height: 48,
		justifyContent: "center",
		alignItems: "center",
		borderBottomColor: "#2ecc71",
		borderBottomWidth: 2,
	},
	header_title: {
		color: "#333",
		fontSize: 24,
		fontWeight: "bold",
	},
	aheader: {
		height: headerViewHeight,
		flexDirection: "row",
		borderBottomColor: "#2ecc71",
		borderBottomWidth: 2,
		zIndex: 100,
		backgroundColor: "#fff",
	},
	aheader_img: {
		width: headerViewHeight * 0.6,
		height: headerViewHeight * 0.6,
		resizeMode: "cover",
		borderRadius: headerViewHeight * 0.3,
		marginLeft: 16,
		marginTop: 10,
	},
	aheader_context: {
		marginLeft: 8,
		height: headerViewHeight * 0.4,
		marginTop: 10,
	},
	aheader_title: {
		color: "#333",
		fontSize: 20,
		marginBottom: 10,
		fontWeight: "bold",
	},

	abottom: {
		justifyContent: "center",
		alignItems: "center",
		height: bottomViewHeight,
		backgroundColor: "#fff",
		zIndex: 100,
		borderTopColor: "#2ecc71",
		borderTopWidth: 2,
	},
	abottom_desc: {
		color: "#333",
		fontSize: 20,
		fontWeight: "bold",
	},

	customizeContainer: {
		backgroundColor: "#f8dbff",
	},

	widgetContainer: {
		flex: 1,
		backgroundColor: "red",
		minWidth: 200,
	},
});

export default CustomGrid;
