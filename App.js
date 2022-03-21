import { StyleSheet, Text, View } from "react-native";
import { NativeRouter, Routes, Route, Link } from "react-router-native";
import RegisterUser from "./Component/RegisterUser/RegisterUser";
import RegisterUserB from "./Component/RegisterUser/RegisterPartA";

import Login from "./Component/Login/Login";
import Home from "./Component/Home/Home";
import Einnahmen from "./Component/Einnahmen/Einnahmen";
import StartSite from "./Component/StartSite/StartSite";
import Sales from "./Component/Sales/Sales";
import PasswordResett from "./Component/PasswordReset/PasswordReset";
import Info from "./Component/Info/Infos";
import {
	IMFellEnglishSC_400Regular,
	useFonts,
} from "@expo-google-fonts/im-fell-english-sc";
import { Actor_400Regular } from "@expo-google-fonts/actor";
import { useState, createContext } from "react";

const newToken = createContext({});
const Amounts = createContext({});
const Vermoegen = createContext({});
const fonts = createContext({});
const RegisterStatus = createContext({});
const Imageuser = createContext({});
export default function App(navigation) {
	const [fontsLoaded, error] = useFonts({
		IMFellEnglishSC_400Regular,
		Actor_400Regular,
	});
	const [token, setToken] = useState();
	const [userImg, setUserImg] = useState("");
	const [allAmounts, setAllAmounts] = useState([]);
	const [vermoegen, setVermoegen] = useState(0);
	const [regStatus, setRegStatus] = useState("");
	return (
		<Imageuser.Provider value={{ userImg, setUserImg }}>
			<Vermoegen.Provider value={{ vermoegen, setVermoegen }}>
				<Amounts.Provider value={{ allAmounts, setAllAmounts }}>
					<newToken.Provider value={{ token, setToken }}>
						<RegisterStatus.Provider value={{ regStatus, setRegStatus }}>
							<NativeRouter>
								<View style={styles.container}>
									<Routes>
										<Route path='/' element={<Home />} />
										<Route path='/info' element={<Info />} />
										<Route path='/register' element={<RegisterUser />} />
										<Route path='/registerPartB' element={<RegisterUserB />} />
										<Route path='/login' element={<Login />} />
										<Route path='/startSite' element={<StartSite />} />
										<Route path='/einNahmen' element={<Einnahmen />} />
										<Route path='/sales' element={<Sales />} />
										<Route path='/passwordReset' element={<PasswordResett />} />
									</Routes>
								</View>
							</NativeRouter>
						</RegisterStatus.Provider>
					</newToken.Provider>
				</Amounts.Provider>
			</Vermoegen.Provider>
		</Imageuser.Provider>
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

export { newToken, Amounts, Vermoegen, fonts, RegisterStatus, Imageuser };
