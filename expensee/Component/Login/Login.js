import { StyleSheet, Text, View, Button, TextInput } from "react-native";
import { useState, useEffect, useContext } from "react";
import { Link, useNavigate, TouchableOpacity } from "react-router-native";
import { newToken } from "../../App";
import axios from "axios";
const Login = () => {
	const navigate = useNavigate();
	const { token, setToken } = useContext(newToken);
	const [userNotFound, setUserNotFound] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const user = { email, password };
	async function send() {
		URL = "http://localhost:3030/api/expensee/users/login";
		try {
			const fetch = await axios.post(URL, user);

			console.log("token", token);
			if (fetch.data.userExist) {
				setToken(fetch.data.token);
				navigate("/einNahmen");
				console.log("token", token);
			} else {
				setUserNotFound("Email or passwort wrong");
				console.log("please log in");
			}
			console.log(fetch);
		} catch (err) {
			console.log(err);
		}
	}

	return (
		<View style={styles.register}>
			<Text style={styles.headLine}>Expensee</Text>

			<View style={styles.linkContainer}>
				<Text style={styles.userNotFound}>{userNotFound}</Text>
				<View style={styles.linkView}>
					<Link underlayColor={"transparent"} to='/'>
						<Text style={styles.backHome}>Back to Home</Text>
					</Link>
				</View>
				<View style={styles.linkView}>
					<TextInput
						onChangeText={e => setEmail(e)}
						style={styles.textInput}
						placeholder='Email'
						placeholderTextColor='black'
						className='inputUsername'
						color='black'
					/>
				</View>
				<View style={styles.linkView}>
					<TextInput
						onChangeText={e => setPassword(e)}
						style={styles.textInput}
						placeholder='Password'
						placeholderTextColor='black'
						className='inputUsername'
						color='black'
					/>
				</View>

				<Button onPress={send} title='Einloggen'></Button>
			</View>
		</View>
	);
};
const styles = StyleSheet.create({
	textInput: {
		margin: 5,
		textAlign: "center",

		padding: 3,
		color: "white",
	},
	register: {
		display: "flex",
		justifyContent: "space-around",
		alignItems: "center",
		flexDirection: "column",
		height: "100%",
		width: "100%",
		backgroundColor: "#2B2D5B",
	},
	headLine: {
		fontSize: 50,
		color: "white",
	},
	linkContainer: {
		marginBottom: 100,
	},
	linkView: {
		margin: 10,
		textAlign: "center",
		width: 300,
		height: 40,
		backgroundColor: "#fffaf0",
		color: "black",
	},
	userNotFound: {
		color: "red",
		textAlign: "center",
		marginBottom: 40,
	},
	backHome: {
		color: "#FFFFFF",
		textAlign: "center",
		fontSize: 20,
		textAlign: "center",
		width: 300,
		height: 40,
		backgroundColor: "#2B2D4B",
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 11,
		},
		shadowOpacity: 0.57,
		shadowRadius: 15.19,
		elevation: 23,
	},
});
export default Login;
