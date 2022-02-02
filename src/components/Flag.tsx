import React from "react";
import { View, StyleSheet } from "react-native";

const styles = StyleSheet.create({
	container: {
		marginTop: 2,
	},
	flagpole: {
		position: "absolute",
		height: 14,
		width: 2,
		backgroundColor: "#222",
		marginLeft: 9,
	},
	flag: {
		position: "absolute",
		height: 5,
		width: 6,
		backgroundColor: "#F22",
		marginLeft: 4,
	},
	base1: {
		position: "absolute",
		height: 2,
		width: 6,
		backgroundColor: "#222",
		marginLeft: 7,
		marginTop: 11,
	},
	base2: {
		position: "absolute",
		height: 2,
		width: 10,
		backgroundColor: "#222",
		marginLeft: 5,
		marginTop: 12,
	},
	flagpoleBigger: {
		position: "absolute",
		height: 28,
		width: 4,
		backgroundColor: "#222",
		marginLeft: 16,
	},
	flagBigger: {
		position: "absolute",
		height: 10,
		width: 14,
		backgroundColor: "#F22",
		marginLeft: 3,
	},
	base1Bigger: {
		position: "absolute",
		height: 4,
		width: 12,
		backgroundColor: "#222",
		marginLeft: 12,
		marginTop: 20,
	},
	base2Bigger: {
		position: "absolute",
		height: 4,
		width: 20,
		backgroundColor: "#222",
		marginLeft: 8,
		marginTop: 24,
	},
});

type propsFlag = {
	bigger: boolean;
};

export default (props: propsFlag) => {
	return (
		<View style={styles.container}>
			<View style={props.bigger ? styles.flagpoleBigger : styles.flagpole}></View>
			<View style={props.bigger ? styles.flagBigger : styles.flag}></View>
			<View style={props.bigger ? styles.base1Bigger : styles.base1}></View>
			<View style={props.bigger ? styles.base2Bigger : styles.base2}></View>
		</View>
	);
};
