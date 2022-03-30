import {
	StyleSheet,
	Text,
	View,
	TextInput,
	TouchableOpacity,
	Image,
} from "react-native";
import { useState } from "react";
import { Link } from "react-router-native";
import { LinearGradient } from "expo-linear-gradient";
import axios from "axios";
const PasswordResett = () => {
	const [email, setEmail] = useState("");
	const [PasswordFirst, setPasswordFirst] = useState("");
	const [PasswordSecond, setPasswordSecond] = useState("");
	const [changeTrue, setChangeTrue] = useState("");
	async function reset() {
		const stateamount = {
			email,
			PasswordFirst,
		};
		URL =
			"https://expenseeserver.herokuapp.com/api/expensee/users/passwordReset";
		if (PasswordFirst == PasswordSecond) {
			try {
				const fetch = await axios.post(URL, stateamount);
				const passChange = await fetch.data.emailSent;

				if (passChange) {
					setChangeTrue("Email wurde gesendet !");
				}
			} catch (err) {
				console.log(err);
			}
		} else {
			setChangeTrue("Passwörter stimmen nicht überein !");
		}
	}
	//localhost:3000/api/expensee/users/verifyPasswordChange/semir01020@gmail.com/bcb15f821479b4d5772bd0ca866c00ad5f926e3580720659cc80d39c9d09802a
	http: return (
		<View style={styles.container}>
			<LinearGradient
				style={styles.container}
				colors={["#ADA996", "#F2F2F2", "#DBDBDB", "#EAEAEA"]}>
				<Link style={styles.infoLink} underlayColor={"transparent"} to='/'>
					<Image
						style={styles.homeImage}
						source={require("../../assets/right.png")}
					/>
				</Link>
				<View style={styles.subcontainer}>
					<Text style={styles.passwordChangeTrue}>{changeTrue}</Text>
					<TextInput
						onChangeText={e => setEmail(e)}
						placeholder='Email'
						style={styles.textinput}
					/>
					<TextInput
						onChangeText={e => setPasswordFirst(e)}
						placeholder='Neues Passwort'
						style={styles.textinput}
					/>
					<TextInput
						onChangeText={e => setPasswordSecond(e)}
						placeholder='Password bestätigen'
						style={styles.textinput}
					/>
				</View>
				<LinearGradient
					style={styles.linkViewReg}
					colors={["#2c3e50", "#3498db"]}>
					<TouchableOpacity style={styles.delBtn} onPress={reset}>
						<Text style={styles.text}>Senden</Text>
					</TouchableOpacity>
				</LinearGradient>
			</LinearGradient>
		</View>
	);
};
const styles = StyleSheet.create({
	container: {
		width: "100%",
		flex: 1,
		justifyContent: "space-evenly",
		alignItems: "center",
	},
	subcontainer: {},
	passwordChangeTrue: {
		color: "green",
		fontSize: 18,
		textAlign: "center",
		marginBottom: 10,
	},
	textinput: {
		textAlign: "center",
		color: "black",
		marginBottom: 20,

		width: 300,
		height: 40,
		backgroundColor: "#fffaf0",
	},
	backHome: {
		fontFamily: "IMFellEnglishSC_400Regular",
		color: "#FFFFFF",
		textAlign: "center",
		fontSize: 30,
		textAlign: "center",
	},
	linearGradient: {
		width: 300,
		height: 40,
		borderRadius: 5,
	},
	text: {
		height: 40,
		width: 300,
		textAlign: "center",
		color: "white",
		fontSize: 30,
		fontFamily: "IMFellEnglishSC_400Regular",
	},
	linkViewReg: {
		marginTop: 10,
		borderRadius: 5,
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
});

export default PasswordResett;
