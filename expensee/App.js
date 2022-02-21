import { StyleSheet, Text, View } from "react-native";
import { NativeRouter, Routes, Route, Link } from "react-router-native";
import RegisterUser from "./Component/RegisterUser/RegisterUser";
import Login from "./Component/Login/Login";
import Home from "./Component/Home/Home";
import { useState, useEffect } from "react";

export default function App() {
	return (
		<NativeRouter>
			<View style={styles.container}>
				<Routes>
					<Route exact path='/' element={<Home />} />
					<Route path='/register' element={<RegisterUser />} />
					<Route path='/login' element={<Login />} />
				</Routes>
			</View>
		</NativeRouter>
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
