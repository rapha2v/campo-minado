import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import Stack from "./stack/app.routes.stack";

export default function () {
	return (
		<NavigationContainer>
			<Stack />
		</NavigationContainer>
	);
}
