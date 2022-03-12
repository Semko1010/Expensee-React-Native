import {
	StyleSheet,
	Text,
	View,
	Button,
	TextInput,
	ActivityIndicator,
} from "react-native";
import { useState, useEffect, useContext } from "react";
import { Link, useNavigate, TouchableOpacity } from "react-router-native";
import { LinearGradient } from "expo-linear-gradient";
import { newToken, Amounts } from "../../App";
import axios from "axios";
const Login = () => {
	const navigate = useNavigate();
	const { token, setToken } = useContext(newToken);
	const [userNotFound, setUserNotFound] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const user = { email, password };
	const { allAmounts, setAllAmounts } = useContext(Amounts);

	async function send() {
		URL = "https://expenseeserver.herokuapp.com/api/expensee/users/login";
		try {
			const fetch = await axios.post(URL, user);

			if (fetch.data.userExist) {
				setLoading(true);
				setToken(fetch.data.token);
				navigate("/startSite");
			} else {
				setUserNotFound("Email or passwort wrong");
			}
		} catch (err) {
			console.log(err);
		}
	}

	return (
		<View style={styles.register}>
			<LinearGradient
				style={styles.register}
				colors={["#ADA996", "#F2F2F2", "#DBDBDB", "#EAEAEA"]}>
				<Text style={styles.headLine}>Expensee</Text>
				{loading && (
					<View style={styles.horizontal}>
						<ActivityIndicator size='large' color='#dc143c' />
					</View>
				)}
				<View style={styles.linkContainer}>
					<Text style={styles.userNotFound}>{userNotFound}</Text>
					<View style={styles.linkView}>
						<Link underlayColor={"transparent"} to='/'>
							<Text style={styles.backHome}>Back to Home</Text>
						</Link>
					</View>
					<View style={styles.linkView}>
						<TextInput
							onChangeText={e => setEmail(e)}
							style={styles.textInput}
							placeholder='Email'
							placeholderTextColor='black'
							className='inputUsername'
						/>
					</View>
					<View style={styles.linkView}>
						<TextInput
							onChangeText={e => setPassword(e)}
							style={styles.textInput}
							placeholder='Password'
							placeholderTextColor='black'
							className='inputUsername'
							color='black'
						/>
					</View>
					<View style={styles.btnView}>
						<Button
							style={styles.btnView}
							onPress={send}
							title='Einloggen'></Button>
					</View>
				</View>
			</LinearGradient>
		</View>
	);
};
const styles = StyleSheet.create({
	textInput: {
		margin: 5,
		textAlign: "center",
		padding: 3,
		color: "black",
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
		marginTop: 50,
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
		color: "black",
	},
	userNotFound: {
		color: "red",
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
	horizontal: {
		position: "absolute",
		top: 200,
	},
});
export default Login;
