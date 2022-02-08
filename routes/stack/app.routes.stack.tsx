import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { TRouteStack } from "./TRouteStack";

import Dificult from "../../Dificult";
import Game from "../../Game";

const { Navigator, Screen } = createNativeStackNavigator<TRouteStack>();

export default () => {
	return (
		<Navigator initialRouteName="screenDificult" screenOptions={{ headerShown: false }}>
			<Screen name="screenDificult" component={Dificult} />
			<Screen name="screenGame" component={Game} />
		</Navigator>
	);
};
