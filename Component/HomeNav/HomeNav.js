import { StyleSheet, Text, View, Image } from "react-native";
import { Link } from "react-router-native";

const HomeNav = () => {
	return (
		<View style={styles.homeImages}>
			<Link underlayColor={"transparent"} to='/startSite'>
				<Image
					style={styles.image}
					source={require("../../assets/geschaftsbericht.png")}
				/>
			</Link>
			<Link underlayColor={"transparent"} to='/einnahmen'>
				<Image
					style={styles.image}
					source={require("../../assets/zuhause.png")}
				/>
			</Link>
			<Link underlayColor={"transparent"} to='/sales'>
				<Image
					style={styles.image}
					source={require("../../assets/dollar.png")}
				/>
			</Link>
		</View>
	);
};
const styles = StyleSheet.create({
	image: {
		height: 50,
		width: 50,
	},

	homeImages: {
		position: "absolute",
		paddingTop: 10,
		bottom: 5,
		borderTopWidth: 1,
		borderColor: "gray",
		flexDirection: "row",
		width: "100%",
		justifyContent: "space-around",
	},

	logOut: {
		margin: 25,
		display: "flex",
		flexDirection: "column",
		alignItems: "flex-end",
	},
	logOutText: {
		color: "white",
	},
	logOutImage: {
		marginTop: 10,
		height: 17,
		width: 25,
		transform: [{ rotate: "180deg" }],
	},
});
export default HomeNav;
