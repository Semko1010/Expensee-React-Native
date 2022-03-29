import {
	StyleSheet,
	Text,
	View,
	Button,
	TextInput,
	Image,
	ActivityIndicator,
	PermissionsAndroid,
} from "react-native";
import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-native";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import { LinearGradient } from "expo-linear-gradient";
import { RegisterStatus, Imageuser } from "../../App";
const RegisterPartA = () => {
	const navigate = useNavigate();
	const [username, setUsername] = useState("ff");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [warning, setWarning] = useState("");
	const [verify, setVerify] = useState(false);
	const [loading, setLoading] = useState(false);
	const { regStatus, setRegStatus } = useContext(RegisterStatus);
	const { userImg, setUserImg } = useContext(Imageuser);
	const user = { username, email, password, userImg, verify };
	async function send() {
		setLoading(true);
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
	// const requestFinePermission = async () => {
	// 	try {
	// 		const granted = await PermissionsAndroid.request(
	// 			PermissionsAndroid.PERMISSIONS.ACCESS_MEDIA_LOCATION,
	// 			{
	// 				title: "Auf Medien zugreifen ?",
	// 				message:
	// 					"Cool Photo App needs access to your camera " +
	// 					"so you can take awesome pictures.",
	// 				buttonNeutral: "Ask Me Later",
	// 				buttonNegative: "Cancel",
	// 				buttonPositive: "OK",
	// 			},
	// 		);
	// 		if (granted === PermissionsAndroid.RESULTS.GRANTED) {
	// 			let result = await ImagePicker.launchImageLibraryAsync({
	// 				mediaTypes: ImagePicker.MediaTypeOptions.All,
	// 				allowsEditing: true,
	// 				aspect: [4, 3],
	// 				quality: 1,
	// 				base64: true,
	// 			});
	// 		} else {
	// 			console.log("Camera permission denied");
	// 		}
	// 	} catch (err) {
	// 		console.warn(err);
	// 	}
	// };
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

			<Text style={styles.headLine}>Registrieren</Text>
			<Image
				style={styles.userImg}
				source={{
					uri: `data:image/jpeg;base64,${userImg}`,
				}}
			/>
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

			<LinearGradient style={styles.linkView} colors={["#2c3e50", "#3498db"]}>
				<Link underlayColor={"transparent"} to='/register'>
					<Text style={styles.text}>Weiter</Text>
				</Link>
			</LinearGradient>
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

	userExist: {
		color: "red",
		textAlign: "center",
		marginBottom: 30,
		fontSize: 18,
	},
	imgAndtextInputs: {
		alignItems: "center",
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
		fontSize: 55,
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
		alignItems: "center",
		marginBottom: 50,
	},
	linkView: {
		borderRadius: 5,
	},
	imageContainer: {
		marginBottom: 30,
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
	regBtn: {
		width: 300,
	},
	horizontal: {
		marginTop: 100,
	},
	text: {
		height: 40,
		width: 300,
		textAlign: "center",
		color: "white",
		fontSize: 30,
		fontFamily: "IMFellEnglishSC_400Regular",
	},
	userImg: {
		height: 130,
		width: 130,
		borderRadius: 130,
	},
});
export default RegisterPartA;
