import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

const styles = StyleSheet.create({
	container: {
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 8,
		paddingTop: 15,
		paddingBottom: 15,
		paddingLeft: 25,
		paddingRight: 25,
		borderWidth: 1,
		width: 200,
		marginBottom: 10,
	},
	Easy: {
		backgroundColor: "#459",
		borderColor: "#239",
	},
	Medium: {
		backgroundColor: "#fd0",
		borderColor: "#fd8",
	},
	Hard: {
		backgroundColor: "#900",
		borderColor: "#922",
	},
	text: {
		color: "#fff",
		fontSize: 20,
	},
});

type propButtonDificult = {
	textDificult: string;
	changeDificult: () => void;
	navigation: () => void;
};

export default (props: propButtonDificult) => {
	const { changeDificult, textDificult, navigation } = props;
	const styleButton = (["Easy", "Medium", "Hard"] as const).filter(
		(element) => textDificult === element
	);
	const funcButton = (): void => {
		changeDificult();
		navigation();
	};
	return (
		<TouchableOpacity
			style={[styles.container, styles[styleButton[0]]]}
			onPress={() => funcButton()}
		>
			<Text style={styles.text}>{textDificult}</Text>
		</TouchableOpacity>
	);
};
