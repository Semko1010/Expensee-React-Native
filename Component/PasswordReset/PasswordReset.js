import { StyleSheet, Text, View, Button, TextInput } from "react-native";
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
	http://localhost:3000/api/expensee/users/verifyPasswordChange/semir01020@gmail.com/bcb15f821479b4d5772bd0ca866c00ad5f926e3580720659cc80d39c9d09802a
	return (
		<View style={styles.container}>
			<LinearGradient
				style={styles.container}
				colors={["#ADA996", "#F2F2F2", "#DBDBDB", "#EAEAEA"]}>
				<Link underlayColor={"transparent"} to='/'>
					<Text style={styles.backHome}>Back to Home</Text>
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
				<Button title='senden' onPress={reset} />
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
		width: 300,
		height: 40,
		backgroundColor: "#2B2D4B",
	},
});

export default PasswordResett;
