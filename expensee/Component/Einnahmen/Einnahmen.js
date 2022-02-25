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
} from "react-native";

import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { newToken, Amounts } from "../../App";
import { Link, useNavigate } from "react-router-native";
import HomeNav from "../HomeNav/HomeNav";
let gesamtEinkommen = 0;
const Einnahmen = () => {
	const [loading, setLoading] = useState(false);
	const { token, setToken } = useContext(newToken);
	const { allAmounts, setAllAmounts } = useContext(Amounts);
	const [einkommen, setEinkommen] = useState(0);
	const [einkommenToggle, setEinkommenToggle] = useState(false);
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
			}
		});
	}, []);

	const toggleEinkommen = () => {
		setEinkommenToggle(!einkommenToggle);
	};
	return (
		<View style={styles.container}>
			{loading && (
				<View style={styles.container}>
					<View style={styles.chart}>
						<PieChart
							data={[
								{
									name: "Seoul",
									population: 21500000,
									color: "rgba(131, 167, 234, 1)",
									legendFontColor: "#7F7F7F",
								},
								{
									name: "Toronto",
									population: 2800000,
									color: "#F63535",
									legendFontColor: "black",
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
						<View>
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
								</View>
							)}
						</View>
						<View>
							<TouchableOpacity style={styles.ausgaben}>
								<Text style={styles.headText}>Ausgaben</Text>
								<Text style={styles.headText}>{`${einkommen}€`}</Text>
							</TouchableOpacity>

							<View style={styles.allIn}>
								{allAmounts.map(amount => {
									if (
										(amount.categorie == "Lebensmittel", "Shopping", "Wohnung")
									) {
										// return (
										// 	<View style={styles.einkommenToggle}>
										// 		<Text style={styles.einkommenText}>
										// 			{amount.description}
										// 		</Text>
										// 		<Text
										// 			style={
										// 				styles.einkommenText
										// 			}>{`${amount.amount}€`}</Text>
										// 	</View>
										// );
										console.log("Semiraga", amount);
									}
								})}
							</View>
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
		backgroundColor: "#F63535",
		backgroundColor: "#515FEB",
		margin: 10,
	},
	chart: {
		marginTop: 40,
	},
	button: {
		alignItems: "center",
		borderRadius: 5,
	},
});
export default Einnahmen;
