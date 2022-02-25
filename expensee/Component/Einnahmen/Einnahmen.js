import { StyleSheet, Text, View, Button, TextInput, Image } from "react-native";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { newToken, Amounts } from "../../App";
import { Link, useNavigate } from "react-router-native";
import HomeNav from "../HomeNav/HomeNav";
let gesamt = 0;
const Einnahmen = () => {
	const { token, setToken } = useContext(newToken);
	const { allAmounts, setAllAmounts } = useContext(Amounts);
	const [einkommen, setEinkommen] = useState(0);
	useEffect(() => {
		gesamt = 0;
		const URL = "http://localhost:3030/api/expensee/users/allAmounts";
		axios
			.get(URL, {
				headers: token,
			})
			.then(response => setAllAmounts(response.data));

		allAmounts.map(amount => {
			if (amount.categorie == "Einkommen") {
				let einnahmen = 0;
				setEinkommen((gesamt += Number(amount.amount)));
			}
		});
		console.log(gesamt);
	}, []);
	return (
		<View>
			<View>
				<View style={styles.einkommen}>
					<Text>EInkommen</Text>
					<Text>{einkommen}</Text>
				</View>

				<View></View>
			</View>
			<View>
				<Text>j</Text>
			</View>
			<View></View>
			<View></View>
			<HomeNav />
		</View>
	);
};

const styles = StyleSheet.create({
	einkommen: {
		flexDirection: "row",
	},
});
export default Einnahmen;
