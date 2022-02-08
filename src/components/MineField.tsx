import React from "react";
import { View, StyleSheet } from "react-native";
import Field from "./Fields";

type boardMineFieldFn = {
	row: number;
	column: number;
	mined: boolean;
	opened: boolean;
	nearMines: number;
	exploded: boolean;
	flagged: boolean;
};

type propsMineField = {
	board: boardMineFieldFn[][];
	openField: (r: number, c: number) => void;
	flagField: (r: number, c: number) => void;
};

export default (props: propsMineField) => {
	const { board, openField, flagField } = props;
	const rows = board.map((row, r) => {
		const columns = row.map((field, c) => {
			return (
				<Field
					{...field}
					key={c}
					clickField={() => openField(r, c)}
					longClickField={() => flagField(r, c)}
				/>
			);
		});
		return (
			<View style={{ flexDirection: "row" }} key={r}>
				{columns}
			</View>
		);
	});

	return <View>{rows}</View>;
};
