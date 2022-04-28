import {
	StyleSheet,
	Text,
	View,
	Button,
	TextInput,
	Image,
	ActivityIndicator,
	TouchableOpacity,
} from "react-native";
import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-native";
import axios from "axios";
import { LinearGradient } from "expo-linear-gradient";
import { RegisterStatus, Imageuser } from "../../App";
const RegisterUser = () => {
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
		// URL = "http://10.0.2.2:2020/api/expensee/users/register";
		URL = "https://expenseeserver.herokuapp.com/api/expensee/users/register";
		if (username.length >= 3 && email.includes("@") && password.length >= 6) {
			try {
				const fetch = await axios.post(URL, user);
				console.log(fetch);
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

			{loading && (
				<View style={styles.horizontal}>
					<ActivityIndicator size='large' color='#dc143c' />
					<Text style={styles.userExist}>{warning}</Text>
				</View>
			)}

			<View style={styles.linkContainer}>
				<TextInput
					style={styles.linkView}
					onChangeText={e => setUsername(e)}
					placeholder='Username'
					placeholderTextColor='black'
					className='inputUsername'
					color='black'
				/>

				<TextInput
					onChangeText={e => setEmail(e)}
					style={styles.linkView}
					placeholder='Email'
					placeholderTextColor='black'
					color='black'
					className='inputUsername'
				/>

				<TextInput
					onChangeText={e => setPassword(e)}
					style={styles.linkView}
					placeholder='Passwort'
					placeholderTextColor='black'
					color='black'
					className='inputUsername'
				/>
			</View>

			<LinearGradient
				style={styles.linkViewReg}
				colors={["#2c3e50", "#3498db"]}>
				<TouchableOpacity style={styles.delBtn} onPress={send}>
					<Text style={styles.text}>Registrieren</Text>
				</TouchableOpacity>
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
		justifyContent: "space-around",
		alignItems: "center",
		flexDirection: "column",
		height: "100%",
		width: "100%",
		backgroundColor: "#2B2D5B",
	},
	headLine: {
		marginTop: 50,
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
		width: "100%",
	},
	linkView: {
		borderWidth: 1,
		borderColor: "gray",
		borderRadius: 5,
		margin: 10,
		alignItems: "center",
		textAlign: "center",
		width: "75%",
		height: 40,
		backgroundColor: "#fffaf0",
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
	text: {
		textAlign: "center",
		color: "white",
		fontSize: 30,
		fontFamily: "IMFellEnglishSC_400Regular",
	},
	horizontal: {
		marginTop: 100,
	},
});
export default RegisterUser;

// const nodemailer = require("nodemailer");
// const { google } = require("googleapis");
// const CLIENT_ID =
// 	"645580390526-scu2tgc8u4lpae8jtgiskdli0sbkrm3l.apps.googleusercontent.com";
// const CLIENT_SECRET = "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";
// const REDIRECT_URI = "https://developers.google.com/oauthplayground";
// const REFRESH_TOKEN =
// 	"1//04AXtYJF6Bi5gCgYIARAAGAQSNwF-L9IrsO2liO6yyPvDm7qTOEguK79qIvIf5G6WMKIgvWhQ6BSyMZEzr8RqhGRPaVC7KKRMVig";

// const OAuth2Client = new google.auth.OAuth2(
// 	CLIENT_ID,
// 	CLIENT_SECRET,
// 	REDIRECT_URI,
// );
// OAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

// function sendEmail(options) {
// 	const ACCESS_TOKEN = OAuth2Client.getAccessToken();
// 	const transporter = nodemailer.createTransport({
// 		service: "gmail",
// 		auth: {
// 			type: "OAuth2",

// 			user: "expenseehelp@gmail.com",
// 			password: "Muhammed.1010",
// 			clientId: CLIENT_ID,
// 			clientSecret: CLIENT_SECRET,
// 			refreshToken: REFRESH_TOKEN,
// 			accessToken: ACCESS_TOKEN,
// 		},
// 	});

// 	const to = options.to;
// 	const subject = options.subject;
// 	const message = options.message;

// 	const messageHtml = message.replaceAll("\n", "<br/>");

// 	return transporter
// 		.sendMail({
// 			from: '"Expensee" <expenseehelp@gmail.com>',
// 			to,
// 			subject,
// 			text: message,
// 			html: messageHtml,
// 		})
// 		.then(sentMessageInfo => {
// 			const wasSentSuccesssFully = sentMessageInfo.accepted.includes(to);
// 			if (wasSentSuccesssFully) {
// 				console.log("E-Mail was sent to", to);
// 				return true;
// 			} else {
// 				console.log("E-Mail was rejected by", to);
// 				return false;
// 			}
// 		})
// 		.catch(err => {
// 			console.log("Error sending Email", err);
// 			return err;
// 		});
// }

// module.exports = sendEmail;
