import React from "react";
import { View, StyleSheet, ViewStyle, Text, TouchableWithoutFeedback } from "react-native";
import params from "../params/params";
import Mine from "./Mine";
import Flag from "./Flag";

const styles = StyleSheet.create({
	field: {
		height: params.blockSize,
		width: params.blockSize,
		borderWidth: params.borderSize,
	},
	regular: {
		backgroundColor: "#999",
		borderLeftColor: "#CCC",
		borderTopColor: "#CCC",
		borderBottomColor: "#333",
		borderRightColor: "#333",
	},
	opened: {
		backgroundColor: "#999",
		borderColor: "#777",
		alignItems: "center",
		justifyContent: "center",
	},
	label: {
		fontSize: params.fontSize,
		fontWeight: "bold",
	},
	exploded: {
		backgroundColor: "red",
		borderColor: "red",
	},
	flagged: {},
});

type propsView = {
	mined: boolean;
	opened: boolean;
	nearMines: number;
	exploded: boolean;
	flagged: boolean;
	clickField: () => void;
};

export default (props: propsView) => {
	const { mined, opened, nearMines, exploded, flagged, clickField } = props;

	const styleField: ViewStyle[] = [styles.field]; //array de estilo a ser aplicado ao campo
	if (opened) styleField.push(styles.opened); // verifica se já foi aberto para aplicar o estilo
	if (exploded) styleField.push(styles.exploded); //verifica se o campo explodiu
	if (flagged) styleField.push(styles.flagged, styles.regular);
	if (!opened && !exploded) styleField.push(styles.regular); //caso o campo não tenha sido explodido ou aberto, aplica o estilo regular

	//Define a cor do texto de acordo com a quantidade de minas ao redor
	const colorTextMine = (): string => {
		if (nearMines === 0) return "#333";
		else if (nearMines === 1) return "#2A28D7";
		else if (nearMines === 2) return "#2B520F";
		else if (nearMines > 2 && nearMines < 6) return "#F9060A";
		else return "#f221A9";
	};
	const color: string = colorTextMine(); // armazenando a cor para ser passado ao component
	return (
		<TouchableWithoutFeedback onPress={clickField}>
			<View style={styleField}>
				{/*caso o campo não esteja minado e esteja aberto, revelo a quantidade de minas ao redor, caso contrário não faz nada*/}
				{!mined && opened && nearMines > 0 ? (
					<Text style={[styles.label, { color: color }]}>{nearMines}</Text>
				) : (
					false
				)}
				{/*caso o campo esteja minado e aberto ele revela a mina*/}
				{mined && opened ? <Mine /> : false}
				{/*Caso o campo esteja fechado e a estiver marcado com bandeira, revela a bandeira em cima do campo*/}
				{flagged && !opened ? <Flag bigger={false} /> : false}
			</View>
		</TouchableWithoutFeedback>
	);
};
