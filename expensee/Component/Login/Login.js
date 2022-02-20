import { StyleSheet, Text, View, Button, TextInput } from "react-native";
import { useState, useEffect } from "react";

const Login = () => {
	return (
		<View>
			<TextInput placeholder='Name'></TextInput>
			<TextInput placeholder='Nachname'></TextInput>
		</View>
	);
};

export default Login;
