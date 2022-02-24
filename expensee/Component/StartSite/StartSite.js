import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { StyleSheet, Text, View, Button, TextInput, Image } from "react-native";
import { Link } from "react-router-native";
import { newToken } from "../../App";

let arr = [];
const StartSite = () => {
	const { token, setToken } = useContext(newToken);
	const [allAmounts, setAllAmounts] = useState([]);
	const [menu, setmenu] = useState(false);
	useEffect(() => {
		axios
			.get("http://localhost:3030/api/expensee/users/allAmounts", {
				headers: token,
			})
			.then(response => setAllAmounts(response.data));
	}, []);
	console.log(allAmounts);
	return (
		<View style={styles.startSite}>
			<View style={styles.logOut}>
				<Text>Log out</Text>
				<Link underlayColor={"transparent"} to='/'>
					<Image
						style={styles.logOutImage}
						source={{
							uri: "/Users/admin/Desktop/PortfolioProjects/ReactNative Expensee/expensee/assets/ausloggen.png",
						}}
					/>
				</Link>
			</View>
			<View style={styles.startSiteText}>
				{allAmounts.map((amount, index) => (
					<>
						<Text>{amount.categorie}</Text>
						<Text>{amount.amount}</Text>
						<Text>{amount.date}</Text>
						<Text>{amount.description}</Text>
					</>
				))}
			</View>
			<View style={styles.homeImages}>
				<Link underlayColor={"transparent"} to='/'>
					<Image
						style={styles.image}
						source={{
							uri: "/Users/admin/Desktop/PortfolioProjects/ReactNative Expensee/expensee/assets/circle home.png",
						}}
					/>
				</Link>
				<Link underlayColor={"transparent"} to='/'>
					<Image
						style={styles.image}
						source={{
							uri: "/Users/admin/Desktop/PortfolioProjects/ReactNative Expensee/expensee/assets/circle home.png",
						}}
					/>
				</Link>
				<Link underlayColor={"transparent"} to='/'>
					<Image
						style={styles.image}
						source={{
							uri: "/Users/admin/Desktop/PortfolioProjects/ReactNative Expensee/expensee/assets/circle home.png",
						}}
					/>
				</Link>
			</View>
		</View>
	);
};
const styles = StyleSheet.create({
	startSite: {
		display: "flex",
		justifyContent: "space-between",
		height: "100%",
		width: "100%",
		backgroundColor: "#2B2D5B",
	},
	startSiteText: {
		display: "flex",
		alignItems: "center",
		flexDirection: "column",
	},
	backHome: {
		color: "#FFFFFF",
		textAlign: "center",
		fontSize: 20,
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
	image: {
		height: 50,
		width: 50,
	},

	homeImages: {
		paddingTop: 10,
		borderTopWidth: 2,
		marginBottom: 30,
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-around",
	},
	uebersicht: {
		paddingLeft: 10,
		backgroundColor: "#2B2D6B",
		position: "absolute",
		top: 40,
		left: 0,
		width: "10%",
		height: "90%",
		display: "flex",
		flexDirection: "column",
		justifyContent: "space-evenly",
	},
	logOut: {
		margin: 25,
		display: "flex",
		flexDirection: "column",
		alignItems: "flex-end",
	},
	logOutImage: {
		marginTop: 10,
		height: 17,
		width: 25,
		transform: [{ rotate: "180deg" }],
	},
});
export default StartSite;
