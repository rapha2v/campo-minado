import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import Flag from "./Flag";

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 20,
		justifyContent: "space-around",
		alignItems: "center",
		flexDirection: "row",
		paddingHorizontal: 20,
	},
});

type propHeader = {
	nFlag: number;
};

export default (props: propHeader) => {
	const { nFlag } = props;
	return (
		<View style={styles.container}>
			<View style={{ flexDirection: "row" }}>
				<Flag bigger={true} />
			</View>
			<Text style={{ fontWeight: "bold", fontSize: 30, paddingTop: 30, marginLeft: 20 }}>
				{nFlag}
			</Text>
		</View>
	);
};
