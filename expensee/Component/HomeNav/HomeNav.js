import { StyleSheet, Text, View, Image } from "react-native";
import { Link } from "react-router-native";

const HomeNav = () => {
	return (
		<View style={styles.homeImages}>
			<Link underlayColor={"transparent"} to='/startSite'>
				<Image
					style={styles.image}
					source={{
						uri: "/Users/admin/Desktop/PortfolioProjects/ReactNative Expensee/expensee/assets/circle home.png",
					}}
				/>
			</Link>
			<Link underlayColor={"transparent"} to='/einnahmen'>
				<Image
					style={styles.image}
					source={{
						uri: "/Users/admin/Desktop/PortfolioProjects/ReactNative Expensee/expensee/assets/circle home.png",
					}}
				/>
			</Link>
			<Link underlayColor={"transparent"} to='/sales'>
				<Image
					style={styles.image}
					source={{
						uri: "/Users/admin/Desktop/PortfolioProjects/ReactNative Expensee/expensee/assets/profits.png",
					}}
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
		paddingTop: 10,
		marginBottom: 5,
		borderTopWidth: 1,
		flexDirection: "row",
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
