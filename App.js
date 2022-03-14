import { StyleSheet, Text, View } from "react-native";
import { NativeRouter, Routes, Route, Link } from "react-router-native";
import RegisterUser from "./Component/RegisterUser/RegisterUser";
import Login from "./Component/Login/Login";
import Home from "./Component/Home/Home";
import Einnahmen from "./Component/Einnahmen/Einnahmen";
import StartSite from "./Component/StartSite/StartSite";
import Sales from "./Component/Sales/Sales";
import PasswordResett from "./Component/PasswordReset/PasswordReset";

import {
	IMFellEnglishSC_400Regular,
	useFonts,
} from "@expo-google-fonts/im-fell-english-sc";
import { useState, createContext } from "react";

const newToken = createContext({});
const Amounts = createContext({});
const Vermoegen = createContext({});
const fonts = createContext({});
export default function App(navigation) {
	const [fontsLoaded, error] = useFonts({ IMFellEnglishSC_400Regular });
	const [token, setToken] = useState();
	const [allAmounts, setAllAmounts] = useState([]);
	const [vermoegen, setVermoegen] = useState(0);
	return (
		<Vermoegen.Provider value={{ vermoegen, setVermoegen }}>
			<Amounts.Provider value={{ allAmounts, setAllAmounts }}>
				<newToken.Provider value={{ token, setToken }}>
					<NativeRouter>
						<View style={styles.container}>
							<Routes>
								<Route path='/' element={<Home />} />
								<Route path='/register' element={<RegisterUser />} />
								<Route path='/login' element={<Login />} />
								<Route path='/startSite' element={<StartSite />} />
								<Route path='/einNahmen' element={<Einnahmen />} />
								<Route path='/sales' element={<Sales />} />
								<Route path='/passwordReset' element={<PasswordResett />} />
							</Routes>
						</View>
					</NativeRouter>
				</newToken.Provider>
			</Amounts.Provider>
		</Vermoegen.Provider>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
});

export { newToken, Amounts, Vermoegen, fonts };
