import { NativeStackNavigationProp } from "@react-navigation/native-stack";

// declarando o tipo da stack navigation
export type TRouteStack = {
	screenDificult: undefined;
	screenGame: undefined;
};

export type RouteStack = NativeStackNavigationProp<TRouteStack>;
