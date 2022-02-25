import {
	StyleSheet,
	Text,
	View,
	Button,
	TextInput,
	Image,
	TouchableOpacity,
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
				<View>
					<View style={styles.containerSub}>
						<View>
							<TouchableOpacity
								onPress={toggleEinkommen}
								style={styles.einkommen}>
								<Text style={styles.headText}>EInkommen</Text>
								<Text style={styles.headText}>{`${einkommen}€`}</Text>
							</TouchableOpacity>

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
									if (!amount.categorie == "Einkommen") {
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
		width: "100%",
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
		backgroundColor: "#F63535",
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
	},
});
export default Einnahmen;
