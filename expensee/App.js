import { StyleSheet, Text, View } from "react-native";
import { NativeRouter, Routes, Route, Link } from "react-router-native";
import RegisterUser from "./Component/RegisterUser/RegisterUser";
import Login from "./Component/Login/Login";
import Home from "./Component/Home/Home";
import StartSite from "./Component/StartSite/StartSite";
import Sales from "./Component/Sales/Sales";
import { useState, useEffect, createContext } from "react";

const newToken = createContext({});

export default function App(navigation) {
	const [token, setToken] = useState();
	return (
		<newToken.Provider value={{ token, setToken }}>
			<NativeRouter>
				<View style={styles.container}>
					<Routes>
						<Route exact path='/' element={<Home />} />
						<Route path='/register' element={<RegisterUser />} />
						<Route path='/login' element={<Login />} />
						<Route path='/startSite' element={<StartSite />} />
						<Route path='/sales' element={<Sales />} />
					</Routes>
				</View>
			</NativeRouter>
		</newToken.Provider>
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

export { newToken };
