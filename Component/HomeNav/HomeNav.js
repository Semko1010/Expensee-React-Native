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
		padding: 5,
		borderTopWidth: 1,
		borderColor: "gray",
		flexDirection: "row",
		width: "100%",
		justifyContent: "space-around",
	},
});
export default HomeNav;
