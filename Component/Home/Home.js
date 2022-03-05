import { StyleSheet, Text, View, Image } from "react-native";
import { Link } from "react-router-native";
const Home = () => {
	return (
		<View style={styles.Home}>
			<Text style={styles.headLine}>Expensee</Text>
			<View style={styles.linkContainer}>
				<View style={styles.linkView}>
					<Link underlayColor={"transparent"} to='/login'>
						<Text style={styles.text}>Login</Text>
					</Link>
				</View>
				<View style={styles.linkView}>
					<Link underlayColor={"transparent"} to='/register'>
						<Text style={styles.text}>Register</Text>
					</Link>
				</View>
			</View>
			<Image
				style={styles.image}
				source={require("../../assets/logoExpensee.png")}
			/>
		</View>
	);
};
const styles = StyleSheet.create({
	headLine: {
		fontSize: 50,
		color: "white",
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
	},
	linkView: {
		margin: 10,
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
	text: {
		textAlign: "center",
		color: "white",
		fontSize: 30,
	},
	image: {
		position: "absolute",
		height: 130,
		width: 400,
		bottom: 30,
	},
});
export default Home;
