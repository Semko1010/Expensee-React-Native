import {
	StyleSheet,
	Text,
	View,
	Button,
	TextInput,
	ActivityIndicator,
	TouchableOpacity,
	Image,
} from "react-native";
import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-native";
import { LinearGradient } from "expo-linear-gradient";
import { newToken, RegisterStatus } from "../../App";
import axios from "axios";
const Login = () => {
	const navigate = useNavigate();
	const { token, setToken } = useContext(newToken);
	const { regStatus, setRegStatus } = useContext(RegisterStatus);
	const [email, setEmail] = useState("");
	const [message, setMessage] = useState("");
	const [loading, setLoading] = useState(false);
	const user = { email, message };

	async function send() {
		setLoading(true);
		URL = "https://expenseeserver.herokuapp.com/api/expensee/users/login";
		try {
			const fetch = await axios.post(URL, user);
			console.log(fetch);
			if (fetch.data.userExist) {
				if (fetch.data.token.verifyUser) {
					setToken(fetch.data.token);
				} else {
					console.log("pls verify");
					setRegStatus("Bitte Email verifiztieren");
				}
			} else {
				setRegStatus("Email or passwort wrong");
			}
		} catch (err) {
			console.log(err);
		}
	}

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
			<Text style={styles.headLine}>Kontakt</Text>

			<Text style={styles.textinfo}>Hier kannst du Fehler melden</Text>
			{loading && (
				<View style={styles.horizontal}>
					<ActivityIndicator size='large' color='#dc143c' />
				</View>
			)}
			<View style={styles.linkContainer}>
				<Text
					style={[
						styles.userNotFound,
						{ color: regStatus == "Email wurde gesendet" ? "green" : "red" },
					]}>
					{regStatus}
				</Text>

				<View style={styles.linkView}>
					<TextInput
						onChangeText={e => setEmail(e)}
						style={styles.textInput}
						placeholder='Email'
						placeholderTextColor='black'
						className='inputUsername'
					/>
				</View>
				<View style={styles.linkViewNachricht}>
					<TextInput
						onChangeText={e => setMessage(e)}
						style={styles.textInput}
						placeholder='Nachricht'
						placeholderTextColor='black'
						className='inputUsername'
						color='black'
					/>
				</View>
				<LinearGradient
					style={styles.linkViewReg}
					colors={["#2c3e50", "#3498db"]}>
					<TouchableOpacity style={styles.delBtn} onPress={send}>
						<Text style={styles.text}>Senden</Text>
					</TouchableOpacity>
				</LinearGradient>
			</View>
		</LinearGradient>
	);
};
const styles = StyleSheet.create({
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
		padding: 3,
		color: "black",
	},
	register: {
		display: "flex",
		justifyContent: "space-evenly",
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
		alignItems: "center",
	},
	linkView: {
		margin: 10,
		textAlign: "center",
		width: 300,
		height: 40,
		backgroundColor: "#fffaf0",
		color: "black",
	},
	linkViewNachricht: {
		margin: 10,
		textAlign: "center",
		width: 300,
		height: 100,
		backgroundColor: "#fffaf0",
		color: "black",
	},

	userNotFound: {
		textAlign: "center",
		marginBottom: 40,
	},
	backHome: {
		fontFamily: "IMFellEnglishSC_400Regular",
		color: "#FFFFFF",
		fontSize: 30,
		textAlign: "center",
		width: 300,
		height: 40,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 11,
		},
		shadowOpacity: 0.57,
		shadowRadius: 15.19,
		elevation: 23,
	},

	text: {
		width: 300,
		textAlign: "center",
		color: "white",
		fontSize: 24,
		fontFamily: "IMFellEnglishSC_400Regular",
	},
	textinfo: {
		textAlign: "center",
		color: "gray",
		fontSize: 24,
		fontFamily: "IMFellEnglishSC_400Regular",
	},
	linkViewReg: {
		marginTop: 10,
		borderRadius: 5,
	},
	horizontal: {
		marginTop: 30,
		height: 10,
	},
});
export default Login;
