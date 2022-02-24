import axios from "axios";
import { useState, useEffect, useContext } from "react";
import {
	StyleSheet,
	Text,
	View,
	Button,
	TextInput,
	Image,
	ScrollView,
	SafeAreaView,
} from "react-native";
import { Link } from "react-router-native";
import { newToken } from "../../App";
import HomeNav from "../HomeNav/HomeNav";
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
			<ScrollView>
				<View style={styles.logOut}>
					<Text style={styles.logOutText}>Log out</Text>
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
					{allAmounts.map(amount => (
						<View style={styles.AmountView}>
							<View style={styles.AmountDateAndDs}>
								<Image
									style={styles.imageAmount}
									source={{
										uri: `/Users/admin/Desktop/PortfolioProjects/ReactNative Expensee/expensee/assets/${
											amount.categorie == "Einkommen" ? "green.png" : "red.png"
										}`,
									}}
								/>
								<View style={styles.amountViewText}>
									<Text style={styles.amountTextDS}>{amount.description}</Text>
									<Text style={styles.amountTextData}> {amount.date}</Text>
								</View>
							</View>
							<Text style={styles.amountTextAmount}>{` ${
								amount.categorie == "Einkommen" ? "+" : "-"
							}   ${amount.amount} €`}</Text>
						</View>
					))}
				</View>
			</ScrollView>

			<HomeNav />
		</View>
	);
};
const styles = StyleSheet.create({
	startSite: {
		flex: 1,
		justifyContent: "space-between",
		height: "100%",
		width: "100%",
		backgroundColor: "#2B2D5B",
	},

	AmountView: {
		margin: 5,
		backgroundColor: "#232450",
		flex: 1,
		alignItems: "center",
		flexDirection: "row",
		justifyContent: "space-between",
		height: 40,
	},
	AmountDateAndDs: {
		margin: 10,
		justifyContent: "center",
		alignItems: "center",
		flexDirection: "row",
	},
	amountViewText: {
		marginLeft: 15,
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
	logOutText: {
		color: "white",
	},
	logOutImage: {
		marginTop: 10,
		height: 17,
		width: 25,
		transform: [{ rotate: "180deg" }],
	},
	amountTextDS: {
		fontSize: 15,
		color: "gray",
		marginLeft: 4,
	},
	amountTextData: {
		fontSize: 15,
		color: "white",
	},
	amountTextAmount: {
		fontSize: 15,
		color: "orange",
	},
	imageAmount: {
		width: 25,
		height: 25,
	},
});
export default StartSite;
