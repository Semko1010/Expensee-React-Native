import { StyleSheet, Text, View, Button, TextInput } from "react-native";
import { useState } from "react";
import { Link, useNavigate } from "react-router-native";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import { LinearGradient } from "expo-linear-gradient";
const RegisterUser = () => {
	const navigate = useNavigate();
	const [username, setUsername] = useState("ff");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [userImg, setUserImg] = useState("");
	const [warning, setWarning] = useState("");
	const user = { username, email, password, userImg };
	async function send() {
		URL = "https://expenseeserver.herokuapp.com/api/expensee/users/register";
		if (username.length >= 3 && email.includes("@") && password.length >= 6) {
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
		} else {
			setWarning("Bitte alle Felder ausfüllen");
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
				<LinearGradient
					style={styles.register}
					colors={["#ADA996", "#F2F2F2", "#DBDBDB", "#EAEAEA"]}>
					<Text style={styles.headLine}>Expensee</Text>
					<View style={styles.imageContainer}>
						<View style={styles.pickImg}>
							<Button onPress={pickImage} title='Bild auswählen' />
						</View>
						<View style={styles.pickImg}>
							<Button
								style={styles.pickImg}
								onPress={pickCamera}
								title='Bild aufnehmen'
							/>
						</View>
					</View>
					<View style={styles.linkContainer}>
						<Text>{warning}</Text>
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
								placeholder='Passwort'
								placeholderTextColor='black'
								color='black'
								className='inputUsername'
							/>
						</View>
						<View style={styles.btnView}>
							<Button color='gray' onPress={send} title='Send'></Button>
						</View>
					</View>
				</LinearGradient>
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
		justifyContent: "space-around",
		alignItems: "center",
		flexDirection: "column",
		height: "100%",
		width: "100%",
		backgroundColor: "#2B2D5B",
	},
	headLine: {
		marginTop: 30,
		fontSize: 50,
		color: "white",
		fontFamily: "IMFellEnglishSC_400Regular",
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 11,
		},
		shadowOpacity: 0.57,
		shadowRadius: 15.19,
		elevation: 23,
	},
	linkContainer: {
		marginBottom: 100,
		alignItems: "center",
	},
	linkView: {
		margin: 10,
		textAlign: "center",
		width: 300,
		height: 40,
		backgroundColor: "#fffaf0",
	},
	imageContainer: {},
	pickImg: {
		marginTop: 10,
	},
	backHome: {
		fontFamily: "IMFellEnglishSC_400Regular",
		color: "#FFFFFF",
		textAlign: "center",
		fontSize: 30,
		textAlign: "center",
		width: 300,
		height: 40,
		backgroundColor: "#2B2D4B",
	},
	btnView: {
		marginTop: 20,
		width: 200,
		borderRadius: 10,
		backgroundColor: "white",
		borderWidth: 1,
	},
});
export default RegisterUser;
