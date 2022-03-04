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
import * as Crypto from "expo-crypto";
import { Link } from "react-router-native";
import { newToken, Amounts, Vermoegen } from "../../App";
import HomeNav from "../HomeNav/HomeNav";
let arr = [];
const StartSite = () => {
	const [userImg, setUserImg] = useState("");
	const { token, setToken } = useContext(newToken);
	const { allAmounts, setAllAmounts } = useContext(Amounts);
	const { vermoegen, setVermoegen } = useContext(Vermoegen);

	useEffect(() => {
		const amountsURL =
			"https://expenseeserver.herokuapp.com/api/expensee/users/allAmounts";
		const userImage =
			"https://expenseeserver.herokuapp.com/api/expensee/users/allUsers";
		//Fetching userImage
		axios
			.get(userImage, {
				headers: token,
			})
			.then(response => {
				const res = response;
				setUserImg(res.data.userImg);
			});

		axios
			.get(amountsURL, {
				headers: token,
			})
			.then(response => setAllAmounts(response.data));
	}, [vermoegen]);

	return (
		<View style={styles.startSite}>
			<View style={styles.logOut}>
				<Image
					style={styles.userImg}
					source={{
						uri: `data:image/jpeg;base64,${userImg}`,
					}}
				/>

				<View style={styles.logOutView}>
					<Link underlayColor={"transparent"} to='/'>
						<Image
							style={styles.logOutImage}
							source={{
								uri: "/Users/admin/Desktop/expensee/assets/ausloggen (1).png",
							}}
						/>
					</Link>
				</View>
			</View>
			<ScrollView style={styles.scroll}>
				{allAmounts.map((amount, index) => (
					<View style={styles.AmountView}>
						<View style={styles.AmountDateAndDs}>
							<Image
								style={styles.imageAmount}
								source={{
									uri: `/Users/admin/Desktop/PortfolioProjects/expensee/assets/${
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
			</ScrollView>

			<HomeNav />
		</View>
	);
};
const styles = StyleSheet.create({
	startSite: {
		height: "100%",
		justifyContent: "space-around",
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

	logOut: {
		marginTop: 30,
		paddingBottom: 10,
		alignItems: "center",
		justifyContent: "space-between",
		flexDirection: "row",
		borderBottomWidth: 1,
		borderColor: "gray",
	},
	logOutText: {
		color: "white",
	},
	logOutView: {},
	logOutImage: {
		marginRight: 30,
		marginTop: 10,
		height: 45,
		width: 50,
		transform: [{ rotate: "180deg" }],
	},
	userImg: {
		marginLeft: 20,
		borderRadius: 40,
		height: 50,
		width: 50,
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
		marginRight: 10,
	},
	imageAmount: {
		width: 25,
		height: 25,
	},
	scroll: {
		marginTop: 20,
		marginBottom: 90,
	},
});

export default StartSite;
