import { StyleSheet, Text, View, Button, TextInput } from "react-native";
import { useState } from "react";
import { Link, useNavigate } from "react-router-native";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
let zusammen = 0;
const RegisterUser = () => {
	const navigate = useNavigate();
	const [username, setUsername] = useState("ff");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [userImg, setUserImg] = useState("");
	const user = { username, email, password, userImg, zusammen };
	async function send() {
		URL = "http://localhost:3030/api/expensee/users/register";
		try {
			const fetch = await axios.post(URL, user);
			if (!fetch.data.userExist) {
				navigate("/login");
				console.log("User created");
			} else {
				console.log("user exist");
			}
		} catch (err) {
			console.log(err);
		}
	}

	const pickImage = async () => {
		// No permissions request is necessary for launching the image library
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1,
			base64: true,
		});

		setUserImg(result.base64);
	};
	const pickCamera = async () => {
		// No permissions request is necessary for launching the image library
		let result = await ImagePicker.launchCameraAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1,
			base64: true,
		});

		setUserImg(result.base64);
	};

	return (
		<>
			<View style={styles.register}>
				<Text style={styles.headLine}>Expensee</Text>
				<View style={styles.imageContainer}>
					<Button onPress={pickImage} title='Select Image' />
					<Button onPress={pickCamera} title='Camera Image' />
				</View>
				<View style={styles.linkContainer}>
					<View style={styles.linkView}>
						<Link underlayColor={"transparent"} to='/'>
							<Text style={styles.backHome}>Back to Home</Text>
						</Link>
					</View>
					<View style={styles.linkView}>
						<TextInput
							onChangeText={e => setUsername(e)}
							style={styles.textInput}
							placeholder='Username'
							placeholderTextColor='black'
							className='inputUsername'
							color='black'
						/>
					</View>
					<View style={styles.linkView}>
						<TextInput
							onChangeText={e => setEmail(e)}
							style={styles.textInput}
							placeholder='Email'
							placeholderTextColor='black'
							color='black'
							className='inputUsername'
						/>
					</View>
					<View style={styles.linkView}>
						<TextInput
							onChangeText={e => setPassword(e)}
							style={styles.textInput}
							placeholder='Password'
							placeholderTextColor='black'
							color='black'
							className='inputUsername'
						/>
					</View>
					<Button onPress={send} title='Send'></Button>
				</View>
			</View>
		</>
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
export default RegisterUser;
