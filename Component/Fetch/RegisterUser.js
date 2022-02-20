import { StyleSheet, Text, View, Button, TextInput } from "react-native";
import { useState, useEffect } from "react";
import { Link } from "react-router-native";
import axios from "axios";
const RegisterUser = () => {
	const [username, setUsername] = useState("ff");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const user = { username, email, password };
	async function send() {
		URL = "http://localhost:3030/api/expensee/users";
		try {
			const fetch = await axios.post(URL, user);
			if (!fetch.data.userExist) {
				console.log("User created");
			} else {
				console.log("user exist");
			}
		} catch (err) {
			console.log(err);
		}
	}

	return (
		<>
			<View>
				<Link to='/'>
					<Text>Back to Home</Text>
				</Link>
				<TextInput
					onChangeText={e => setUsername(e)}
					style={styles.textInput}
					placeholder='Username'
					className='inputUsername'
				/>
				<TextInput
					onChangeText={e => setEmail(e)}
					style={styles.textInput}
					placeholder='Email'
					className='inputUsername'
				/>
				<TextInput
					onChangeText={e => setPassword(e)}
					style={styles.textInput}
					placeholder='Password'
					className='inputUsername'
				/>
				<Button onPress={send} title='Send'></Button>
			</View>
		</>
	);
};

const styles = StyleSheet.create({
	textInput: {
		width: 150,
		margin: 5,
		textAlign: "center",
		borderWidth: 1,
		borderRadius: 5,
		padding: 3,
	},
});
export default RegisterUser;
