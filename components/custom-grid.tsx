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
import MoodTrackerWidget from "./widgets/mood-tracker";
import NoteWidget from "./widgets/note";
import TimerWidget from "./widgets/timer";
import IdeaBoxWidget from "./widgets/idea";
import SleepWidget from "./widgets/sleep";
import { IconLayoutDashboardFilled } from "@tabler/icons-react-native";
import Heartbeat from "./widgets/Heartbeat";
import StepsWidget from "./widgets/steps";

// const { width } = Dimensions.get("window");
const headerViewHeight = 50;
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
			<View>
				<Text style={styles.nameText}>Hi Jimmy</Text>
			</View>
			<Button
				className="w-[142px] rounded-full flex items-center flex-row gap-1 self-end"
				variant="secondary"
				size="sm"
				onPress={() => setEditing((p) => !p)}
				style={styles.customizeContainer}
			>
				<IconLayoutDashboardFilled color="black" size={20} />
				<Text>{editing ? "Save" : "Customize"}</Text>
			</Button>
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
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "flex-end",
		zIndex: 100,
		paddingBottom: 10,
	},
	mainContainer: {
		flex: 1,
		backgroundColor: colors.mainBg,
	},
	nameText: {
		fontSize: 30,
		color: colors.lightBg,
		fontWeight: "bold",
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

	customizeContainer: {
		backgroundColor: colors.lightBg,
	},
});

export default CustomGrid;