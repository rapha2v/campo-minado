import React from "react";
import { StatusBar } from "expo-status-bar";
import { View, Text, StyleSheet } from "react-native";
import Button from "./src/components/ButtonDificult";
import params from "./src/params/params";

//Navegação
import { RouteStack } from "./routes/stack/TRouteStack";
import { useNavigation } from "@react-navigation/native";

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	containerButton: {
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "#333",
		width: 300,
		height: 500,
		borderRadius: 8,
	},
	text: {
		fontSize: 30,
		color: "#fff",
		marginBottom: 60,
	},
});

export default () => {
	const navigations = useNavigation<RouteStack>();

	const easy = (): void => {
		params.difficultLevel = 0.1;
	};

	const medium = (): void => {
		params.difficultLevel = 0.2;
	};

	const hard = (): void => {
		params.difficultLevel = 0.3;
	};

	return (
		<View style={styles.container}>
			<StatusBar style="auto" />
			<View style={styles.containerButton}>
				<Text style={styles.text}>Minefield</Text>
				<Button
					changeDificult={easy}
					textDificult="Easy"
					navigation={() => navigations.navigate("screenGame")}
				></Button>
				<Button
					changeDificult={medium}
					textDificult="Medium"
					navigation={() => navigations.navigate("screenGame")}
				></Button>
				<Button
					changeDificult={hard}
					textDificult="Hard"
					navigation={() => navigations.navigate("screenGame")}
				></Button>
			</View>
		</View>
	);
};
