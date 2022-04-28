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
	const [regStatus, setRegStatus] = useState("");
	const [email, setEmail] = useState("");
	const [message, setMessage] = useState("");
	const [loading, setLoading] = useState(false);
	const user = { email, message };

	async function send() {
		setLoading(true);
		URL = "https://expenseeserver.herokuapp.com/api/expensee/users/contact";
		if (email.includes("@") && message.length > 5) {
			try {
				const fetch = await axios.post(URL, user);
				console.log(fetch);
				if (fetch.data.emailSend) {
					setRegStatus("Email wurde gesendet");
					setLoading(false);
				} else {
					setRegStatus("Versuchen sie es später noch einmal");
				}
			} catch (err) {
				console.log(err);
			}
		} else {
			setRegStatus("Bitte alle Felder ausfüllen");
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
		width: "100%",
		alignItems: "center",
	},
	linkView: {
		margin: 10,
		textAlign: "center",
		width: "75%",
		height: 40,
		backgroundColor: "#fffaf0",
		color: "black",
	},
	linkViewNachricht: {
		margin: 10,
		textAlign: "center",
		width: "75%",
		height: "30%",
		backgroundColor: "#fffaf0",
		color: "black",
	},

	userNotFound: {
		textAlign: "center",
		marginBottom: 10,
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
		textAlign: "center",
		color: "white",
		fontSize: 30,
		fontFamily: "IMFellEnglishSC_400Regular",
	},
	textinfo: {
		textAlign: "center",
		color: "gray",
		fontSize: 24,
		fontFamily: "IMFellEnglishSC_400Regular",
	},
	linkViewReg: {
		justifyContent: "center",
		borderRadius: 5,
		margin: 10,
		textAlign: "center",
		width: "75%",
		height: 45,

		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 11,
		},
		shadowOpacity: 0.57,
		shadowRadius: 15.19,

		elevation: 23,
	},
	horizontal: {
		marginBottom: 20,
		height: 10,
	},
});
export default Login;
