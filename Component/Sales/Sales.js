import { StyleSheet, Text, View, Button, TextInput } from "react-native";
import { useState, useContext } from "react";
import SelectDropdown from "react-native-select-dropdown";
import { Link, useNavigate } from "react-router-native";
import HomeNav from "../HomeNav/HomeNav";
import DatePicker from "react-native-datepicker";
import { newToken, Vermoegen, Amounts, fonts } from "../../App";
import axios from "axios";
import NumericInput from "react-native-numeric-input";
import { LinearGradient } from "expo-linear-gradient";

const Sales = () => {
	const navigate = useNavigate();
	const { allAmounts, setAllAmounts } = useContext(Amounts);
	const { token, setToken } = useContext(newToken);

	const [warning, setWarning] = useState("");
	const [date, setDate] = useState(null);
	const [categorie, setCategorie] = useState("");
	const [description, setDescription] = useState("");
	const [amount, setAmount] = useState(0);
	const stuff = ["Einkommen", "Lebensmittel", "Shopping", "Fixkosten"];

	async function send() {
		const stateamount = {
			categorie,
			description,
			amount,
			date,
			token,
		};

		URL = "https://expenseeserver.herokuapp.com/api/expensee/users/amount";

		try {
			if (
				amount >= 1 &&
				description.length >= 1 &&
				date &&
				categorie.length >= 1
			) {
				const fetch = await axios.post(URL, stateamount);
				const newFetch = await axios.get(
					"https://expenseeserver.herokuapp.com/api/expensee/users/allAmounts",
					{
						headers: token,
					},
				);

				const setNewAmount = await setAllAmounts(newFetch.data);
				const amountcreated = await fetch.data.amountAdded;

				if (amountcreated) {
					navigate("/einNahmen");
					console.log("Amount created");
				}
			} else {
				setWarning("Bitte alle Felder ausfüllen");
			}
		} catch (err) {
			console.log(err);
		}
	}

	return (
		<LinearGradient
			style={styles.sales}
			colors={["#ADA996", "#F2F2F2", "#DBDBDB", "#EAEAEA"]}>
			<Text style={styles.headLine}>Umsätze</Text>
			<View style={styles.allMenu}>
				<View style={styles.dropDown}>
					<Text style={styles.kategorie}>Kategorie</Text>

					<SelectDropdown
						style={{
							backgroundColor: "crimson",
							opacity: 1,
						}}
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
				<View style={styles.numeric}>
					<NumericInput
						value={amount}
						onChange={value => setAmount(value)}
						onLimitReached={(isMax, msg) => console.log(isMax, msg)}
						totalWidth={300}
						totalHeight={50}
						iconSize={25}
						step={1}
						valueType='real'
						rounded
						textColor='white'
						iconStyle={{ color: "white" }}
						rightButtonBackgroundColor='#00bfff'
						leftButtonBackgroundColor='#00bfff'
						borderColor='white'
					/>
				</View>

				<DatePicker
					date={date}
					mode='date'
					placeholder='Datum'
					format='DD.MM.YYYY'
					minDate='01-01-1900'
					maxDate='01-01-2100'
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
							color: "black",
							textAlign: "center",
						},
					}}
					onDateChange={date => {
						setDate(date);
					}}
				/>

				<LinearGradient style={styles.btnView} colors={["#2c3e50", "#3498db"]}>
					<Button onPress={send} title='Erstellen' />
				</LinearGradient>
				<HomeNav />
			</View>
		</LinearGradient>
	);
};
const styles = StyleSheet.create({
	headLine: {
		paddingTop: 30,
		fontSize: 50,
		color: "white",
		textAlign: "center",
		fontFamily: "IMFellEnglishSC_400Regular",
	},
	kategorie: {
		fontSize: 25,
		color: "white",
		textAlign: "center",
		marginBottom: 10,
	},
	allMenu: {
		flex: 1,
		alignItems: "center",
		justifyContent: "space-between",
	},
	dropDown: {
		marginTop: 20,
		marginBottom: 10,
	},
	sales: {
		height: "100%",
		width: "100%",
	},
	warning: {
		color: "red",
		fontSize: 20,
	},
	textInput: {
		flex: 1,
		textAlign: "center",
		padding: 3,
		color: "black",
		backgroundColor: "white",
	},
	linkView: {
		textAlign: "center",
		width: "50%",
		height: 40,
		backgroundColor: "#fffaf0",
	},
	numeric: {
		marginBottom: 20,
	},
	btnView: {
		marginTop: 20,
		width: "75%",
		borderRadius: 5,
		backgroundColor: "white",
	},
});
export default Sales;
