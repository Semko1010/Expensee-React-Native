import { StyleSheet, Text, View, Image } from "react-native";
import { Link } from "react-router-native";
import { LinearGradient } from "expo-linear-gradient";
import Info from "../Info/Infos";
const Home = () => {
	return (
		<LinearGradient
			style={styles.Home}
			colors={["#ADA996", "#F2F2F2", "#DBDBDB", "#EAEAEA"]}>
			<Link style={styles.infoLink} underlayColor={"transparent"} to='/info'>
				<Image style={styles.info} source={require("../../assets/info.png")} />
			</Link>
			<Link style={styles.contact} underlayColor={"transparent"} to='/contact'>
				<Image style={styles.info} source={require("../../assets/email.png")} />
			</Link>

			<Text style={styles.headLine}>Expensee</Text>
			<View style={styles.linkContainer}>
				<LinearGradient style={styles.linkView} colors={["#2c3e50", "#3498db"]}>
					<Link underlayColor={"transparent"} to='/login'>
						<Text style={styles.text}>Login</Text>
					</Link>
				</LinearGradient>
				<LinearGradient style={styles.linkView} colors={["#2c3e50", "#3498db"]}>
					<Link underlayColor={"transparent"} to='/registerPartB'>
						<Text style={styles.text}>Register</Text>
					</Link>
				</LinearGradient>
				<Link underlayColor={"transparent"} to='/passwordReset'>
					<Text style={styles.passwort}>Passwort vergessen</Text>
				</Link>
			</View>

			<Image
				style={styles.image}
				source={require("../../assets/logoExpensee.png")}
			/>
		</LinearGradient>
	);
};
const styles = StyleSheet.create({
	info: {
		width: 40,
		height: 40,
	},
	infoLink: {
		position: "absolute",
		left: 10,
		top: 45,
	},
	contact: {
		position: "absolute",
		right: 10,
		top: 45,
	},
	headLine: {
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
	Home: {
		flex: 1,
		justifyContent: "space-around",
		alignItems: "center",
		flexDirection: "column",
		height: "100%",
		width: "100%",
		backgroundColor: "#2B2D5B",
	},
	linkContainer: {
		marginBottom: 100,
		width: "100%",
		alignItems: "center",
	},
	linkView: {
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
	text: {
		textAlign: "center",
		color: "white",
		fontSize: 30,
		fontFamily: "IMFellEnglishSC_400Regular",
	},
	passwort: {
		textAlign: "center",
		color: "#0000cd",
	},
	image: {
		position: "absolute",
		height: 130,
		width: 400,
		bottom: 30,
	},
});
export default Home;
