import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Alert } from "react-native";
import MineField from "./src/components/MineField";
import { boardMineField, openField, hadExplosion, wonGame, showMines } from "./src/funcsBoard";
import Params from "./src/params/params";

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "flex-end",
	},
	board: {
		alignItems: "center",
		backgroundColor: "#AAA",
	},
});

export default function App() {
	const dificultLevel = (): number => {
		const rowOfBoard = Params.getRowsAmount();
		const columnOfBoard = Params.getColumnsAmount();
		return Math.round(rowOfBoard * columnOfBoard * Params.difficultLevel);
	};

	const createBoard = () => {
		const rowOfBoard = Params.getRowsAmount();
		const columnOfBoard = Params.getColumnsAmount();
		return { board: boardMineField(rowOfBoard, columnOfBoard, dificultLevel()) };
	};

	const [mineField, setNewBoard] = useState(createBoard());

	const actionField = (row: number, column: number): void => {
		openField(mineField.board, row, column);
		if (hadExplosion(mineField.board)) {
			showMines(mineField.board);
			setNewBoard({ board: mineField.board });
			Alert.alert("Não foi dessa vez!", "Boa sorte na próxima tentativa.", [
				{ text: "Menu", onPress: () => console.log("menu") },
				{
					text: "Jogar novamente",
					onPress: () => {
						setNewBoard(createBoard());
					},
				},
			]);
		} else if (wonGame(mineField.board)) {
			Alert.alert("Parabéns, você venceu!", "Deseja jogar novamente?", [
				{ text: "Não", onPress: () => console.log("menu") },
				{
					text: "Sim",
					onPress: () => {
						setNewBoard(createBoard());
					},
				},
			]);
		} else {
			setNewBoard({ board: mineField.board });
		}
	};

	return (
		<View style={styles.container}>
			<StatusBar style="auto" />
			<View style={styles.board}>
				<MineField board={mineField.board} openField={actionField} />
			</View>
		</View>
	);
}
