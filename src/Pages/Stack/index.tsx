import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Conversas from "../Conversas";
import Pesquisar from "../Pesquisa";
const Stack = createNativeStackNavigator();

export default function StackRoutes(){
    return(
        <Stack.Navigator>
            <Stack.Screen
            component={Conversas}
            name="Conversas"
            />
            <Stack.Screen
            component={Pesquisar}
            name="Pesquisar"
            />
        </Stack.Navigator>

    )
}