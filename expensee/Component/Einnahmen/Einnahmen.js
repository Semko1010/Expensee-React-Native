import {
	LineChart,
	BarChart,
	PieChart,
	ProgressChart,
	ContributionGraph,
	StackedBarChart,
} from "react-native-chart-kit";
import { LinearGradient } from "expo-linear-gradient";
import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	Dimensions,
	ScrollView,
} from "react-native";

import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { newToken, Amounts, Vermoegen } from "../../App";
import { Link, useNavigate } from "react-router-native";
import HomeNav from "../HomeNav/HomeNav";

let gesamtvermoegen = 0;
let gesamtEinkommen = 0;
let gesamtAusgaben = 0;
const Einnahmen = () => {
	const [loading, setLoading] = useState(false);
	const { token, setToken } = useContext(newToken);
	const { allAmounts, setAllAmounts } = useContext(Amounts);
	const { vermoegen, setVermoegen } = useContext(Vermoegen);
	const [einkommen, setEinkommen] = useState(0);
	const [ausgaben, setAusgaben] = useState(0);
	const [einkommenToggle, setEinkommenToggle] = useState(false);
	const [ausgabenToggle, setAusgabenToggle] = useState(false);
	useEffect(() => {
		gesamtEinkommen = 0;

		const URL = "http://localhost:3030/api/expensee/users/allAmounts";
		axios
			.get(URL, {
				headers: token,
			})
			.then(response => setAllAmounts(response.data))
			.then(setLoading(true));
		allAmounts.map(amount => {
			if (amount.categorie == "Einkommen") {
				setEinkommen((gesamtEinkommen += Number(amount.amount)));
				setAusgaben(gesamtAusgaben);
			}
		});
	}, []);

	const toggleEinkommen = () => {
		setEinkommenToggle(!einkommenToggle);
		setAusgabenToggle(false);
	};
	const toggleAusgaben = () => {
		setAusgabenToggle(!ausgabenToggle);
		setEinkommenToggle(false);
	};
	return (
		<View style={styles.container}>
			{loading && (
				<View style={styles.container}>
					<View style={styles.chart}>
						<PieChart
							data={[
								{
									name: "Ausgaben",
									population: 21500000,
									color: "#515FEB",
									legendFontColor: "white",
								},
								{
									name: "Toronto",
									population: einkommen,
									color: "#F63535",
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
						<Text style={styles.VermoegenText}>{vermoegen}</Text>
						<View style={styles.allInParrent}>
							<LinearGradient
								colors={["#F63535", "#FF009D"]}
								style={styles.button}>
								<TouchableOpacity
									onPress={toggleEinkommen}
									style={styles.einkommen}>
									<Text style={styles.headText}>EInkommen</Text>
									<Text style={styles.headText}>{`${einkommen}€`}</Text>
								</TouchableOpacity>
							</LinearGradient>
							{einkommenToggle && (
								<View style={styles.allIn}>
									<ScrollView style={styles.scroll}>
										{allAmounts.map(amount => {
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
													</View>
												);
											}
										})}
									</ScrollView>
								</View>
							)}
						</View>
						<View>
							<LinearGradient
								colors={["#515FEB", "#514FEB"]}
								style={styles.button}>
								<TouchableOpacity
									onPress={toggleAusgaben}
									style={styles.ausgaben}>
									<Text style={styles.headText}>Ausgaben</Text>
									<Text style={styles.headText}>{`${einkommen}€`}</Text>
								</TouchableOpacity>
							</LinearGradient>
							{ausgabenToggle && (
								<View style={styles.allInausgaben}>
									<ScrollView style={styles.scrollAusgaben}>
										{allAmounts.map(amount => {
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
													</View>
												);
												console.log("semko", amount);
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
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#2B2D5B",
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
		margin: 1,
		height: 35,
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

	scroll: {
		height: 270,
	},
	scrollAusgaben: {
		height: 230,
	},
});
export default Einnahmen;
