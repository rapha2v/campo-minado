import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Alert, BackHandler } from "react-native";
import MineField from "./src/components/MineField";
import Header from "./src/components/Header";
import {
	boardMineField,
	openField,
	hadExplosion,
	wonGame,
	showMines,
	flaggedField,
} from "./src/funcsBoard";
import Params from "./src/params/params";

//Navegação
import { RouteStack } from "./routes/stack/TRouteStack";
import { useNavigation } from "@react-navigation/native";

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

export default function Game() {
	const navigations = useNavigation<RouteStack>();

	const dificultLevel = (): number => {
		const rowOfBoard = Params.getRowsAmount();
		const columnOfBoard = Params.getColumnsAmount();
		return Math.round(rowOfBoard * columnOfBoard * Params.difficultLevel);
	};

	const createBoard = () => {
		const rowOfBoard = Params.getRowsAmount();
		const columnOfBoard = Params.getColumnsAmount();
		return { board: boardMineField(rowOfBoard, columnOfBoard, dificultLevel()), numFlag: 99 };
	};

	const won = (): void => {
		Alert.alert("Parabéns, você venceu!", "Deseja jogar novamente?", [
			{
				text: "Não",
				onPress: () => {
					setNewBoard(createBoard());
					navigations.goBack();
				},
			},
			{
				text: "Sim",
				onPress: () => {
					setNewBoard(createBoard());
				},
			},
		]);
	};

	const [mineField, setNewBoard] = useState(createBoard());

	const actionField = (row: number, column: number): void => {
		openField(mineField.board, row, column);
		if (hadExplosion(mineField.board)) {
			showMines(mineField.board);
			setNewBoard({ ...mineField, board: mineField.board });
			Alert.alert("Não foi dessa vez!", "Boa sorte na próxima tentativa.", [
				{
					text: "Menu",
					onPress: () => {
						setNewBoard(createBoard());
						navigations.goBack();
					},
				},
				{
					text: "Jogar novamente",
					onPress: () => {
						setNewBoard(createBoard());
					},
				},
			]);
		} else if (wonGame(mineField.board)) {
			setNewBoard({ ...mineField, board: mineField.board });
			won();
		} else {
			setNewBoard({ ...mineField, board: mineField.board });
		}
	};

	const markFieldWithFlag = (row: number, column: number): void => {
		flaggedField(mineField.board, row, column);
		if (wonGame(mineField.board)) {
			setNewBoard({ ...mineField, board: mineField.board });
			won();
		}
		if (mineField.numFlag > 0)
			setNewBoard({ board: mineField.board, numFlag: --mineField.numFlag });
		else
			Alert.alert(
				"Ops!",
				"Você gastou todas suas bandeiras, caso queira remover algumas é só pressionar novamente no campo marcado com uma bandeira.",
				[
					{
						text: "Ok",
						onPress: () => null,
					},
				]
			);
	};

	useEffect(() => {
		const backAction = (): boolean => {
			Alert.alert("Você realmente deseja voltar?", "Caso você volte, seu progresso será perdido.", [
				{
					text: "Não",
					onPress: () => null,
				},
				{
					text: "Sim",
					onPress: () => {
						navigations.goBack();
					},
				},
			]);
			return true;
		};

		const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);

		return () => backHandler.remove();
	}, []);

	return (
		<View style={styles.container}>
			<StatusBar style="auto" />
			<Header nFlag={mineField.numFlag} />
			<View style={styles.board}>
				<MineField board={mineField.board} openField={actionField} flagField={markFieldWithFlag} />
			</View>
		</View>
	);
}
