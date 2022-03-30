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
	ActivityIndicator,
	TextInput,
	Button,
} from "react-native";
import DatePicker from "react-native-datepicker";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { newToken, Amounts, Vermoegen } from "../../App";
import HomeNav from "../HomeNav/HomeNav";
import uuid from "react-native-uuid";
let gesamtEinkommen = 0;
let gesamtAusgaben = 0;
let lebensMittel = 0;
let shopping = 0;
let fixkosten = 0;
let guthaben = 0;
const Einnahmen = () => {
	const [loading, setLoading] = useState(true);
	const { token, setToken } = useContext(newToken);
	const { allAmounts, setAllAmounts } = useContext(Amounts);
	const { vermoegen, setVermoegen } = useContext(Vermoegen);
	const [einkommen, setEinkommen] = useState(0);
	const [ausgaben, setAusgaben] = useState(0);
	const [lebensMittelGesamt, setLebensMittelGesamt] = useState(0);
	const [shoppingGesamt, setShoppingGesamt] = useState(0);
	const [fixkostenGesamt, setFixkostenGesamt] = useState(0);
	const [einkommenToggle, setEinkommenToggle] = useState(false);
	const [ausgabenToggle, setAusgabenToggle] = useState(false);
	const [lebensmittelToggle, setLebensmittel] = useState(false);
	const [shoppingToggle, setShoppingToggle] = useState(false);
	const [wohnungToggle, setWohnungToggle] = useState(false);
	const [deleteAmount, setDeleteAmount] = useState(false);
	const [date, setDate] = useState(
		`${new Date().getMonth() + 1}.${new Date().getFullYear()}`,
	);

	useEffect(() => {
		setEinkommen(0);
		setAusgaben(0);
		setLebensMittelGesamt(0);
		setShoppingGesamt(0);
		setFixkostenGesamt(0);
		setVermoegen(0);
		gesamtEinkommen = 0;
		gesamtAusgaben = 0;
		lebensMittel = 0;
		shopping = 0;
		fixkosten = 0;
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
					if (amount.date.includes(date)) {
						if (amount.categorie == "Einkommen") {
							setEinkommen(
								Number((gesamtEinkommen += Number(amount.amount)).toFixed(2)),
							);
							setVermoegen(
								Number((guthaben += Number(amount.amount)).toFixed(2)),
							);
						}
						if (
							amount.categorie == "Lebensmittel" ||
							amount.categorie == "Fixkosten" ||
							amount.categorie == "Shopping"
						) {
							setAusgaben(
								Number((gesamtAusgaben += Number(amount.amount)).toFixed(2)),
							);
							setVermoegen(
								Number((guthaben -= Number(amount.amount)).toFixed(2)),
							);
						}
						if (amount.categorie == "Lebensmittel") {
							setLebensMittelGesamt(
								Number((lebensMittel += Number(amount.amount)).toFixed(2)),
							);
						}
						if (amount.categorie == "Shopping") {
							setShoppingGesamt(
								Number((shopping += Number(amount.amount)).toFixed(2)),
							);
						}
						if (amount.categorie == "Fixkosten") {
							setFixkostenGesamt(
								Number((fixkosten += Number(amount.amount)).toFixed(2)),
							);
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
		<LinearGradient
			style={styles.container}
			colors={["#ADA996", "#F2F2F2", "#DBDBDB", "#EAEAEA"]}>
			{loading ? (
				<View style={styles.container}>
					{/*##########DonutChart########## */}
					<View style={styles.chart}>
						<PieChart
							data={[
								{
									name: "Einkommen",
									population: einkommen,
									color: "#F63535",
									legendFontColor: "#696969",
								},
								{
									name: "Ausgaben",
									population: ausgaben,
									color: "#515FEB",
									legendFontColor: "#696969",
								},
								{
									name: "Lebensmittel",
									population: lebensMittelGesamt,
									color: "#EFB722",
									legendFontColor: "#696969",
								},
								{
									name: "Shopping",
									population: shoppingGesamt,
									color: "#00bfff",
									legendFontColor: "#696969",
								},
								{
									name: "Wohnung",
									population: fixkostenGesamt,
									color: "#ff8c00",
									legendFontColor: "#696969",
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
							style={[
								styles.VermoegenText,
								{ color: vermoegen <= 0 ? "red" : "green" },
							]}>{`Guthaben ${vermoegen}€`}</Text>
						<DatePicker
							date={date}
							mode='date'
							placeholder='Datum auswählen'
							format='MM.YYYY'
							minDate='01-1900'
							maxDate='01-2100'
							confirmBtnText='Bestätigen'
							cancelBtnText='Abbrechen'
							customStyles={{
								dateIcon: {},
								dateInput: {
									borderColor: "gray",
									alignItems: "center",
									borderWidth: 0,
									borderBottomWidth: 1,
								},
								placeholderText: {
									fontSize: 17,
									color: "gray",
								},
								dateText: {
									fontSize: 17,
									color: "gray",
								},
							}}
							onDateChange={date => {
								setDate(date);
							}}
						/>

						{/*##########Einkommen########## */}

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
										if (amount.date.includes(date)) {
											if (amount.categorie == "Einkommen") {
												return (
													<View style={styles.einkommenToggle} key={uuid.v4()}>
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

						{/*##########Ausgaben########## */}

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
							<View style={styles.allIn}>
								<ScrollView style={styles.scrollAusgaben}>
									{allAmounts.map(amount => {
										if (amount.date.includes(date)) {
											if (
												amount.categorie == "Lebensmittel" ||
												amount.categorie == "Wohnung" ||
												amount.categorie == "Shopping"
											) {
												return (
													<View style={styles.einkommenToggle} key={uuid.v4()}>
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

						{/*##########Lebensmittel########## */}

						<LinearGradient
							colors={["#EFB722", "#EFB412"]}
							style={styles.button}>
							<TouchableOpacity
								onPress={toggleLebensmittel}
								style={styles.ausgaben}>
								<Text style={styles.headText}>Lebensmittel</Text>
								<Text style={styles.headText}>{`${lebensMittelGesamt}€`}</Text>
							</TouchableOpacity>
						</LinearGradient>
						{lebensmittelToggle && (
							<View style={styles.allIn}>
								<ScrollView style={styles.scrollLebensmittel}>
									{allAmounts.map(amount => {
										if (amount.date.includes(date)) {
											if (amount.categorie == "Lebensmittel") {
												return (
													<View style={styles.einkommenToggle} key={uuid.v4()}>
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

						{/*##########Shopping########## */}

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
							<View style={styles.allIn}>
								<ScrollView style={styles.scrollShopping}>
									{allAmounts.map(amount => {
										if (amount.date.includes(date)) {
											if (amount.categorie == "Shopping") {
												return (
													<View style={styles.einkommenToggle} key={uuid.v4()}>
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

						{/*##########Wohnung########## */}

						<LinearGradient
							colors={["#ff8c00", "#ff8c30"]}
							style={styles.button}>
							<TouchableOpacity onPress={toggleWohnung} style={styles.ausgaben}>
								<Text style={styles.headText}>Fixkosten</Text>
								<Text style={styles.headText}>{`${fixkostenGesamt}€`}</Text>
							</TouchableOpacity>
						</LinearGradient>
						{wohnungToggle && (
							<View style={styles.allIn}>
								<ScrollView style={styles.scrollWohnung}>
									{allAmounts.map(amount => {
										if (amount.date.includes(date)) {
											if (amount.categorie == "Fixkosten") {
												return (
													<View style={styles.einkommenToggle} key={uuid.v4()}>
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
			) : (
				<View style={styles.horizontal}>
					<ActivityIndicator size='large' color='#dc143c' />
				</View>
			)}
			<HomeNav />
		</LinearGradient>
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
		backgroundColor: "#808080",
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
		fontSize: 30,
		marginBottom: 20,
		marginTop: 20,
		width: "80%",
		textAlign: "center",
	},
	allInParrent: {},
	allIn: {
		// position: "absolute",
		// width: "100%",
		// zIndex: 20,
		width: "80%",
	},

	scroll: {
		position: "absolute",
		width: "100%",
		zIndex: 20,
		height: 210,
	},
	scrollAusgaben: {
		position: "absolute",
		width: "100%",
		zIndex: 19,
		height: 210,
	},
	scrollLebensmittel: {
		position: "absolute",
		width: "100%",
		zIndex: 18,
		height: 165,
	},
	scrollShopping: {
		position: "absolute",
		width: "100%",
		zIndex: 17,
		height: 120,
	},
	scrollWohnung: {
		position: "absolute",
		width: "100%",
		zIndex: 16,
		height: 75,
	},
	deleteImage: {
		width: 25,
		height: 25,
	},

	date: {
		flex: 1,
		justifyContent: "flex-start",
	},
	horizontal: {
		justifyContent: "center",
		flex: 1,
	},
});
export default Einnahmen;
