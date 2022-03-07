import { PieChart } from "react-native-chart-kit";
import { LinearGradient } from "expo-linear-gradient";
import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	Dimensions,
	ScrollView,
	Image,
} from "react-native";
import DatePicker from "react-native-datepicker";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { newToken, Amounts, Vermoegen } from "../../App";
import HomeNav from "../HomeNav/HomeNav";

let gesamtEinkommen = 0;
let gesamtAusgaben = 0;
let lebensMittel = 0;
let shopping = 0;
let wohnung = 0;
let guthaben = 0;
const Einnahmen = () => {
	const [loading, setLoading] = useState(false);
	const { token, setToken } = useContext(newToken);
	const { allAmounts, setAllAmounts } = useContext(Amounts);
	const { vermoegen, setVermoegen } = useContext(Vermoegen);
	const [einkommen, setEinkommen] = useState(0);
	const [ausgaben, setAusgaben] = useState(0);
	const [lebensMittelGesamt, setLebensMittelGesamt] = useState(0);
	const [shoppingGesamt, setShoppingGesamt] = useState(0);
	const [wohnungGesamt, setWohnungGesamt] = useState(0);
	const [einkommenToggle, setEinkommenToggle] = useState(false);
	const [ausgabenToggle, setAusgabenToggle] = useState(false);
	const [lebensmittelToggle, setLebensmittel] = useState(false);
	const [shoppingToggle, setShoppingToggle] = useState(false);
	const [wohnungToggle, setWohnungToggle] = useState(false);
	const [deleteAmount, setDeleteAmount] = useState(false);
	const [date, setDate] = useState(
		`07.0${new Date().getMonth() + 1}.${new Date().getFullYear()}`,
	);

	useEffect(() => {
		console.log("r", date);
		setEinkommen(0);
		setAusgaben(0);
		setLebensMittelGesamt(0);
		setShoppingGesamt(0);
		setWohnungGesamt(0);
		setVermoegen(0);
		gesamtEinkommen = 0;
		gesamtAusgaben = 0;
		lebensMittel = 0;
		shopping = 0;
		wohnung = 0;
		guthaben = 0;
		const URL =
			"https://expenseeserver.herokuapp.com/api/expensee/users/allAmounts";
		axios

			.get(URL, {
				headers: token,
			})
			.then(response => setAllAmounts(response.data))
			.then(
				allAmounts.map(amount => {
					if (amount.date == date) {
						if (amount.categorie == "Einkommen") {
							setEinkommen((gesamtEinkommen += Number(amount.amount)));
							setVermoegen((guthaben += Number(amount.amount)));
						}
						if (
							amount.categorie == "Lebensmittel" ||
							amount.categorie == "Wohnung" ||
							amount.categorie == "Shopping"
						) {
							setAusgaben((gesamtAusgaben += Number(amount.amount)));
							setVermoegen((guthaben -= Number(amount.amount)));
						}
						if (amount.categorie == "Lebensmittel") {
							setLebensMittelGesamt((lebensMittel += Number(amount.amount)));
						}
						if (amount.categorie == "Shopping") {
							setShoppingGesamt((shopping += Number(amount.amount)));
						}
						if (amount.categorie == "Wohnung") {
							setWohnungGesamt((wohnung += Number(amount.amount)));
						}
					}
				}),
			)

			.then(setLoading(true));
	}, [deleteAmount, vermoegen, date]);

	const toggleEinkommen = () => {
		setShoppingToggle(false);
		setEinkommenToggle(!einkommenToggle);
		setAusgabenToggle(false);
		setLebensmittel(false);
	};
	const toggleAusgaben = () => {
		setShoppingToggle(false);
		setEinkommenToggle(false);
		setLebensmittel(false);
		setWohnungToggle(false);
		setAusgabenToggle(!ausgabenToggle);
	};
	const toggleLebensmittel = () => {
		setShoppingToggle(false);
		setAusgabenToggle(false);
		setEinkommenToggle(false);
		setWohnungToggle(false);
		setLebensmittel(!lebensmittelToggle);
	};
	const toggleShopping = () => {
		setAusgabenToggle(false);
		setEinkommenToggle(false);
		setLebensmittel(false);
		setWohnungToggle(false);
		setShoppingToggle(!shoppingToggle);
	};
	const toggleWohnung = () => {
		setAusgabenToggle(false);
		setEinkommenToggle(false);
		setLebensmittel(false);
		setShoppingToggle(false);
		setWohnungToggle(!wohnungToggle);
	};

	async function deleteAmounts(amount) {
		const delAmount = {
			amount,
			token,
		};

		const URL =
			"https://expenseeserver.herokuapp.com/api/expensee/users/delete";
		const fetch = await axios.post(URL, delAmount);
		const removed = await fetch.data.amountRemoved;
		const fet = await axios.get(
			"https://expenseeserver.herokuapp.com/api/expensee/users/allAmounts",
			{
				headers: token,
			},
		);
		const setFet = await setAllAmounts(fet.data);
		const setDel = await setDeleteAmount(!deleteAmount);
	}

	return (
		<View style={styles.container}>
			<LinearGradient
				style={styles.container}
				colors={["#ADA996", "#F2F2F2", "#DBDBDB", "#EAEAEA"]}>
				{loading && (
					<View style={styles.container}>
						{/*##########DonutChart########## */}
						<View style={styles.chart}>
							<PieChart
								data={[
									{
										name: "Einkommen",
										population: einkommen,
										color: "#F63535",
										legendFontColor: "white",
									},
									{
										name: "Ausgaben",
										population: ausgaben,
										color: "#515FEB",
										legendFontColor: "white",
									},
									{
										name: "Lebensmittel",
										population: lebensMittelGesamt,
										color: "#EFB722",
										legendFontColor: "white",
									},
									{
										name: "Shopping",
										population: shoppingGesamt,
										color: "#00bfff",
										legendFontColor: "white",
									},
									{
										name: "Wohnung",
										population: wohnungGesamt,
										color: "#ff8c00",
										legendFontColor: "white",
									},
								]}
								width={Dimensions.get("window").width - 16}
								height={150}
								chartConfig={{
									backgroundColor: "#1cc910",
									backgroundGradientFrom: "#eff3ff",
									backgroundGradientTo: "#efefef",
									decimalPlaces: 2,
									color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
									style: {
										borderRadius: 16,
									},
								}}
								accessor='population'
								backgroundColor='transparent'
								paddingLeft='15'
								absolute //for the absolute number remove if you want percentage
							/>
						</View>

						<View style={styles.containerSub}>
							{/*##########Vermoegen########## */}
							<Text
								style={styles.VermoegenText}>{`Guthaben ${vermoegen}€`}</Text>
							<DatePicker
								date={date}
								mode='date'
								placeholder='Datum auswählen'
								format='DD.MM.YYYY'
								minDate='01.01-1900'
								maxDate='01-01-2100'
								confirmBtnText='Bestätigen'
								cancelBtnText='Abbrechen'
								customStyles={{
									dateIcon: {},
									dateInput: {
										borderColor: "white",
										alignItems: "flex-start",
										borderWidth: 0,
										borderBottomWidth: 1,
									},
									placeholderText: {
										fontSize: 17,
										color: "black",
									},
									dateText: {
										fontSize: 17,
										color: "black",
									},
								}}
								onDateChange={date => {
									setDate(date);
								}}
							/>
							{/*##########Einkommen########## */}
							<View style={styles.allInParrent}>
								<LinearGradient
									colors={["#F63535", "#FF009D"]}
									style={styles.button}>
									<TouchableOpacity
										onPress={toggleEinkommen}
										style={styles.einkommen}>
										<Text style={styles.headText}>Einkommen</Text>
										<Text style={styles.headText}>{`${einkommen}€`}</Text>
									</TouchableOpacity>
								</LinearGradient>
								{einkommenToggle && (
									<View style={styles.allIn}>
										<ScrollView style={styles.scroll}>
											{allAmounts.map(amount => {
												if (amount.date == date) {
													if (amount.categorie == "Einkommen") {
														return (
															<View style={styles.einkommenToggle}>
																<Text style={styles.einkommenText}>
																	{amount.description}
																</Text>
																<Text
																	style={
																		styles.einkommenText
																	}>{`${amount.amount}€`}</Text>
																<TouchableOpacity
																	style={styles.delBtn}
																	onPress={() => {
																		deleteAmounts(amount);
																	}}>
																	<Image
																		style={styles.deleteImage}
																		source={require("../../assets/remove.png")}
																	/>
																</TouchableOpacity>
															</View>
														);
													}
												}
											})}
										</ScrollView>
									</View>
								)}
							</View>

							{/*##########Ausgaben########## */}
							<View style={styles.AusgabenParrent}>
								<LinearGradient
									colors={["#515FEB", "#514FEB"]}
									style={styles.button}>
									<TouchableOpacity
										onPress={toggleAusgaben}
										style={styles.ausgaben}>
										<Text style={styles.headText}>Ausgaben</Text>
										<Text style={styles.headText}>{`${ausgaben}€`}</Text>
									</TouchableOpacity>
								</LinearGradient>
								{ausgabenToggle && (
									<View style={styles.allInausgaben}>
										<ScrollView style={styles.scrollAusgaben}>
											{allAmounts.map(amount => {
												if (amount.date == date) {
													if (
														amount.categorie == "Lebensmittel" ||
														amount.categorie == "Wohnung" ||
														amount.categorie == "Shopping"
													) {
														return (
															<View style={styles.einkommenToggle}>
																<Text style={styles.einkommenText}>
																	{amount.description}
																</Text>
																<Text
																	style={
																		styles.einkommenText
																	}>{`${amount.amount}€`}</Text>
																<TouchableOpacity
																	style={styles.delBtn}
																	onPress={() => {
																		deleteAmounts(amount);
																	}}>
																	<Image
																		style={styles.deleteImage}
																		source={require("../../assets/remove.png")}
																	/>
																</TouchableOpacity>
															</View>
														);
													}
												}
											})}
										</ScrollView>
									</View>
								)}
							</View>

							{/*##########Lebensmittel########## */}
							<View style={styles.lebensmittelParrent}>
								<LinearGradient
									colors={["#EFB722", "#EFB412"]}
									style={styles.button}>
									<TouchableOpacity
										onPress={toggleLebensmittel}
										style={styles.ausgaben}>
										<Text style={styles.headText}>Lebensmittel</Text>
										<Text
											style={styles.headText}>{`${lebensMittelGesamt}€`}</Text>
									</TouchableOpacity>
								</LinearGradient>
								{lebensmittelToggle && (
									<View style={styles.allInausgaben}>
										<ScrollView style={styles.scrollLebensmittel}>
											{allAmounts.map(amount => {
												if (amount.date == date) {
													if (amount.categorie == "Lebensmittel") {
														return (
															<View style={styles.einkommenToggle}>
																<Text style={styles.einkommenText}>
																	{amount.description}
																</Text>
																<Text
																	style={
																		styles.einkommenText
																	}>{`${amount.amount}€`}</Text>

																<TouchableOpacity
																	style={styles.delBtn}
																	onPress={() => {
																		deleteAmounts(amount);
																	}}>
																	<Image
																		style={styles.deleteImage}
																		source={require("../../assets/remove.png")}
																	/>
																</TouchableOpacity>
															</View>
														);
														console.log("semko", amount);
													}
												}
											})}
										</ScrollView>
									</View>
								)}
							</View>
							{/*##########Shopping########## */}
							<View style={styles.ShoppingParrent}>
								<LinearGradient
									colors={["#00bfff", "#28bfff"]}
									style={styles.button}>
									<TouchableOpacity
										onPress={toggleShopping}
										style={styles.ausgaben}>
										<Text style={styles.headText}>Shopping</Text>
										<Text style={styles.headText}>{`${shoppingGesamt}€`}</Text>
									</TouchableOpacity>
								</LinearGradient>
								{shoppingToggle && (
									<View style={styles.allInausgaben}>
										<ScrollView style={styles.scrollShopping}>
											{allAmounts.map(amount => {
												if (amount.date == date) {
													if (amount.categorie == "Shopping") {
														return (
															<View style={styles.einkommenToggle}>
																<Text style={styles.einkommenText}>
																	{amount.description}
																</Text>
																<Text
																	style={
																		styles.einkommenText
																	}>{`${amount.amount}€`}</Text>

																<TouchableOpacity
																	style={styles.delBtn}
																	onPress={() => {
																		deleteAmounts(amount);
																	}}>
																	<Image
																		style={styles.deleteImage}
																		source={require("../../assets/remove.png")}
																	/>
																</TouchableOpacity>
															</View>
														);
													}
												}
											})}
										</ScrollView>
									</View>
								)}
							</View>

							{/*##########Wohnung########## */}
							<View style={styles.wohnungParrent}>
								<LinearGradient
									colors={["#ff8c00", "#ff8c30"]}
									style={styles.button}>
									<TouchableOpacity
										onPress={toggleWohnung}
										style={styles.ausgaben}>
										<Text style={styles.headText}>Wohnung</Text>
										<Text style={styles.headText}>{`${wohnungGesamt}€`}</Text>
									</TouchableOpacity>
								</LinearGradient>
								{wohnungToggle && (
									<View style={styles.allInausgaben}>
										<ScrollView style={styles.scrollWohnung}>
											{allAmounts.map(amount => {
												if (amount.date == date) {
													if (amount.categorie == "Wohnung") {
														return (
															<View style={styles.einkommenToggle}>
																<Text style={styles.einkommenText}>
																	{amount.description}
																</Text>
																<Text
																	style={
																		styles.einkommenText
																	}>{`${amount.amount}€`}</Text>

																<TouchableOpacity
																	style={styles.delBtn}
																	onPress={() => {
																		deleteAmounts(amount);
																	}}>
																	<Image
																		style={styles.deleteImage}
																		source={require("../../assets/remove.png")}
																	/>
																</TouchableOpacity>
															</View>
														);
													}
												}
											})}
										</ScrollView>
									</View>
								)}
							</View>
						</View>
						<HomeNav />
					</View>
				)}
			</LinearGradient>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		width: "100%",
		flex: 1,
		justifyContent: "space-between",
	},
	containerSub: {
		alignItems: "center",
		marginBottom: 200,
	},
	headText: {
		color: "white",
		fontSize: 25,
	},
	einkommen: {
		justifyContent: "space-evenly",
		alignItems: "center",
		width: "80%",
		height: 40,
		flexDirection: "row",
	},
	einkommenToggle: {
		alignItems: "center",
		backgroundColor: "#32377C",
		flexDirection: "row",
		justifyContent: "space-around",
		margin: 0,
		height: 35,
		borderBottomWidth: 1,
		borderColor: "white",
	},
	einkommenText: {
		color: "white",
	},
	ausgaben: {
		justifyContent: "space-evenly",
		alignItems: "center",
		width: "80%",
		height: 40,
		flexDirection: "row",
	},
	chart: {
		marginTop: 40,
	},
	button: {
		alignItems: "center",
		borderRadius: 5,
		marginTop: 5,
	},
	VermoegenText: {
		color: "white",
		fontSize: 30,
		marginBottom: 30,
		marginTop: 20,
		borderRadius: 30,
		width: "80%",
		textAlign: "center",
	},
	allInParrent: {
		position: "relative",
		zIndex: 20,
	},
	allIn: {
		position: "absolute",
		top: 45,
		width: "80%",
	},
	allInausgaben: {
		position: "absolute",
		top: 45,
		width: "80%",
	},
	allInausgaben: {
		position: "absolute",
		top: 45,
		width: "80%",
	},
	AusgabenParrent: {
		position: "relative",
		zIndex: 19,
	},
	lebensmittelParrent: {
		position: "relative",
		zIndex: 18,
	},
	ShoppingParrent: {
		position: "relative",
		zIndex: 17,
	},
	scroll: {
		height: 265,
	},
	scrollAusgaben: {
		height: 190,
	},
	scrollLebensmittel: {
		height: 190,
	},
	scrollShopping: {
		height: 100,
	},
	scrollWohnung: {
		height: 60,
	},
	deleteImage: {
		width: 25,
		height: 25,
	},
	delBtn: {
		marginRight: 10,
	},
	date: {
		flex: 1,
		justifyContent: "flex-start",
	},
});
export default Einnahmen;
