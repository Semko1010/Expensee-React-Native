import { StyleSheet, Text, View, Button, TextInput } from "react-native";
import { useState, useEffect, useContext } from "react";
import SelectDropdown from "react-native-select-dropdown";
import { Link, useNavigate } from "react-router-native";
import HomeNav from "../HomeNav/HomeNav";
import DatePicker from "react-native-datepicker";
import { newToken, Vermoegen } from "../../App";
import axios from "axios";
const Sales = () => {
	const navigate = useNavigate();
	const { vermoegen, setVermoegen } = useContext(Vermoegen);
	const { token, setToken } = useContext(newToken);
	const [warning, setWarning] = useState("");
	const [date, setDate] = useState(null);
	const [categorie, setCategorie] = useState(null);
	const [description, setDescription] = useState(null);
	const [amount, setAmount] = useState(null);
	const stuff = ["Einkommen", "Lebensmittel", "Shopping", "Wohnung"];

	useEffect(() => {});
	async function send() {
		const stateamount = {
			categorie,
			description,
			amount,
			date,
			token,
			vermoegen,
		};
		URL = "http://localhost:3030/api/expensee/users/amount";
		try {
			if ((categorie, description, amount, date)) {
				const fetch = await axios.post(URL, stateamount);

				if (fetch.data.amountAdded) {
					navigate("/startSite");
					console.log("Amount created");
				} else {
					setWarning("Bitte alle Felder ausfüllen");
				}
			} else {
				setWarning("Bitte alle Felder ausfüllen");
			}
		} catch (err) {
			console.log(err);
		}
	}

	return (
		<View style={styles.Home}>
			<Text style={styles.headLine}>Umsätze</Text>
			<View style={styles.allMenu}>
				<View style={styles.dropDown}>
					<Text style={styles.kategorie}>Kategorie</Text>
					<SelectDropdown
						data={stuff}
						onSelect={(selectedItem, index) => {
							setCategorie(selectedItem);
						}}
					/>
				</View>
				<View style={styles.linkView}>
					<TextInput
						onChangeText={e => setDescription(e)}
						placeholderTextColor='black'
						style={styles.textInput}
						placeholder='Beschreibung'
					/>
				</View>
				<Text style={styles.warning}>{warning}</Text>
				<View style={styles.linkView}>
					<TextInput
						onChangeText={e => setAmount(e)}
						placeholderTextColor='black'
						style={styles.textInput}
						placeholder='Geldbetrag'
					/>
				</View>
				<View>
					<DatePicker
						date={date}
						mode='date'
						placeholder='select date'
						format='DD/MM/YYYY'
						minDate='01-01-1900'
						maxDate='01-01-2100'
						confirmBtnText='Confirm'
						cancelBtnText='Cancel'
						customStyles={{
							dateIcon: {
								position: "absolute",
								right: -5,
								top: 4,
								marginLeft: 0,
							},
							dateInput: {
								borderColor: "white",
								alignItems: "flex-start",
								borderWidth: 0,
								borderBottomWidth: 1,
							},
							placeholderText: {
								fontSize: 17,
								color: "white",
							},
							dateText: {
								fontSize: 17,
							},
						}}
						onDateChange={date => {
							setDate(date);
						}}
					/>
				</View>
				<View>
					<Button onPress={send} title='Klick' />
				</View>
			</View>
			<HomeNav />
		</View>
	);
};
const styles = StyleSheet.create({
	headLine: {
		paddingTop: 30,
		fontSize: 50,
		color: "white",
		textAlign: "center",
	},
	kategorie: {
		fontSize: 25,
		color: "white",
		textAlign: "center",
		marginBottom: 10,
	},
	allMenu: {
		alignItems: "center",
	},
	dropDown: { marginBottom: 15 },
	Home: {
		justifyContent: "space-between",
		flexDirection: "column",
		height: "100%",
		width: "100%",
		backgroundColor: "#2B2D5B",
	},
	warning: {
		color: "red",
		fontSize: 20,
	},
	textInput: {
		margin: 5,
		textAlign: "center",
		padding: 3,
		color: "black",
		backgroundColor: "white",
	},
	linkView: {
		margin: 15,
		textAlign: "center",
		width: 300,
		height: 40,
		backgroundColor: "#fffaf0",
	},
});
export default Sales;
