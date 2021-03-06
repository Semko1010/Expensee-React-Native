import axios from "axios";
import { useState, useEffect, useContext } from "react";
import {
	StyleSheet,
	Text,
	View,
	Image,
	ScrollView,
	SafeAreaView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Link } from "react-router-native";
import { newToken, Amounts, Vermoegen, RegisterStatus } from "../../App";
import HomeNav from "../HomeNav/HomeNav";
import uuid from "react-native-uuid";

const StartSite = () => {
	const [userImg, setUserImg] = useState("");
	const [loading, setLoading] = useState(false);
	const { token, setToken } = useContext(newToken);
	const { allAmounts, setAllAmounts } = useContext(Amounts);
	const { vermoegen, setVermoegen } = useContext(Vermoegen);
	const { regStatus, setRegStatus } = useContext(RegisterStatus);

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

			.then(response => {
				setAllAmounts(
					response.data.sort((a, b) => {
						const firstDate = a.date.split(".").reverse().join();
						const secondDate = b.date.split(".").reverse().join();
						return firstDate < secondDate ? 1 : firstDate > secondDate ? -1 : 0;
					}),
				);
			})

			.then(setLoading(true))
			.then(console.log("seccond", allAmounts));
		setRegStatus("");
	}, [vermoegen]);

	return (
		<LinearGradient
			style={styles.startSite}
			colors={["#ADA996", "#F2F2F2", "#DBDBDB", "#EAEAEA"]}>
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
							source={require("../../assets/right.png")}
						/>
					</Link>
				</View>
			</View>
			{loading && (
				<ScrollView style={styles.scroll}>
					{allAmounts.map((amount, index) => (
						<View style={styles.AmountView} key={uuid.v4()}>
							<View style={styles.AmountDateAndDs}>
								{amount.categorie == "Einkommen" ? (
									<Image
										style={styles.imageAmount}
										source={require(`../../assets/plus.png`)}
									/>
								) : (
									<Image
										style={styles.imageAmount}
										source={require(`../../assets/minus.png`)}
									/>
								)}

								<View style={styles.amountViewText}>
									<Text style={styles.amountTextDS}>{amount.description}</Text>
									<Text style={styles.amountTextData}> {amount.date}</Text>
								</View>
							</View>
							<Text style={styles.amountTextAmount}>{` ${
								amount.categorie == "Einkommen" ? "+" : "-"
							}   ${amount.amount} ???`}</Text>
						</View>
					))}
				</ScrollView>
			)}
			<HomeNav />
		</LinearGradient>
	);
};
const styles = StyleSheet.create({
	startSite: {
		height: "100%",
		justifyContent: "space-between",
		width: "100%",
	},

	AmountView: {
		margin: 5,
		backgroundColor: "#808080",
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
		height: 40,
		width: 40,
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
		color: "white",
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
	scroll: {},
});

export default StartSite;
