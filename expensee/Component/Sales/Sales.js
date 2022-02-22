import { StyleSheet, Text, View, Button, TextInput } from "react-native";
import { useState, useEffect, useContext } from "react";
import SelectDropdown from "react-native-select-dropdown";
import { Link, useNavigaten } from "react-router-native";
import DatePicker from "react-native-datepicker";
import { newToken } from "../../App";
import axios from "axios";
const Sales = () => {
	const [date, setDate] = useState(new Date());

	const [categorie, setCategorie] = useState("");
	const [description, setDescription] = useState("");
	const [amount, setAmount] = useState();

	const stuff = ["Einkommen", "Lebensmittel", "Shopping", "Wohnung"];

	async function send() {
		const stateamount = { categorie, description, amount, date };
		URL = "http://localhost:3030/api/expensee/users/amount";
		try {
			const fetch = await axios.post(URL, stateamount);
			console.log(fetch);
			// if (!fetch.data.userExist) {
			// 	navigate("/");
			// 	console.log("User created");
			// } else {
			// 	console.log("user exist");
			// }
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
				<View style={styles.linkView}>
					<TextInput
						onChangeText={e => setAmount(e)}
						placeholderTextColor='black'
						style={styles.textInput}
						placeholder='Geldbetrag'
					/>
				</View>
				<View>
					{/* <Button title='Open' onPress={() => setOpen(true)} /> */}
					<DatePicker
						date={date}
						mode='date'
						placeholder='select date'
						format='DD/MM/YYYY'
						minDate='01-01-1900'
						maxDate='01-01-2000'
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
								borderColor: "gray",
								alignItems: "flex-start",
								borderWidth: 0,
								borderBottomWidth: 1,
							},
							placeholderText: {
								fontSize: 17,
								color: "gray",
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
		</View>
	);
};
const styles = StyleSheet.create({
	headLine: {
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
		display: "flex",
		justifyContent: "space-evenly",
		alignItems: "center",
	},
	dropDown: { marginBottom: 15 },
	Home: {
		display: "flex",
		justifyContent: "space-evenly",
		alignItems: "center",
		flexDirection: "column",
		height: "100%",
		width: "100%",
		backgroundColor: "#2B2D5B",
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
