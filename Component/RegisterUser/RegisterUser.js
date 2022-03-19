import { StyleSheet, Text, View, Button, TextInput, Image } from "react-native";
import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-native";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import { LinearGradient } from "expo-linear-gradient";
import { RegisterStatus } from "../../App";
const RegisterUser = () => {
	const navigate = useNavigate();
	const [username, setUsername] = useState("ff");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [userImg, setUserImg] = useState("");
	const [warning, setWarning] = useState("");
	const [verify, setVerify] = useState(false);
	const { regStatus, setRegStatus } = useContext(RegisterStatus);
	const user = { username, email, password, userImg, verify };
	async function send() {
		URL = "https://expenseeserver.herokuapp.com/api/expensee/users/register";
		if (username.length >= 3 && email.includes("@") && password.length >= 6) {
			try {
				const fetch = await axios.post(URL, user);
				if (!fetch.data.userExist) {
					navigate("/login");
					console.log("User created");
					setRegStatus("Email wurde gesendet");
				} else {
					setWarning("Email existiert bereits !");
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
		<LinearGradient
			style={styles.register}
			colors={["#ADA996", "#F2F2F2", "#DBDBDB", "#EAEAEA"]}>
			<Link style={styles.infoLink} underlayColor={"transparent"} to='/'>
				<Image
					style={styles.homeImage}
					source={require("../../assets/right.png")}
				/>
			</Link>
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
				<Text style={styles.userExist}>{warning}</Text>

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
					<Button onPress={send} title='Registrieren'></Button>
				</View>
			</View>
		</LinearGradient>
	);
};

const styles = StyleSheet.create({
	emailUsernameContainer: {
		flexDirection: "row",
	},
	infoLink: {
		position: "absolute",
		right: 10,
		top: 40,
	},
	homeImage: {
		transform: [{ rotate: "180deg" }],
		width: 35,
		height: 35,
	},
	textInput: {
		margin: 5,
		textAlign: "center",
		color: "black",
	},
	userExist: {
		color: "red",
		textAlign: "center",
		marginBottom: 30,
		fontSize: 18,
	},
	register: {
		justifyContent: "space-evenly",
		alignItems: "center",
		flexDirection: "column",
		height: "100%",
		width: "100%",
		backgroundColor: "#2B2D5B",
	},
	headLine: {
		position: "absolute",
		top: 50,
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
		alignItems: "center",
		textAlign: "center",
		width: 300,
		height: 30,
		backgroundColor: "#fffaf0",
	},
	imageContainer: {
		marginTop: 200,
		marginBottom: 50,
	},
	pickImg: {
		marginTop: 10,
	},
	backHome: {
		fontFamily: "IMFellEnglishSC_400Regular",
		color: "#FFFFFF",
		textAlign: "center",
		fontSize: 30,
		width: 300,
		height: 40,
	},
});
export default RegisterUser;
