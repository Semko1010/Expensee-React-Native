import { StyleSheet, Text, View, Button, TextInput } from "react-native";
import { useState, useEffect, useContext } from "react";
import SelectDropdown from "react-native-select-dropdown";
import { Link, useNavigate } from "react-router-native";
import HomeNav from "../HomeNav/HomeNav";
import DatePicker from "react-native-datepicker";
import { newToken, Vermoegen, Amounts } from "../../App";
import axios from "axios";
import NumericInput from "react-native-numeric-input";
import DropDownPicker from "react-native-dropdown-picker";
const Sales = () => {
	const navigate = useNavigate();
	const { allAmounts, setAllAmounts } = useContext(Amounts);
	const { vermoegen, setVermoegen } = useContext(Vermoegen);
	const { token, setToken } = useContext(newToken);
	const [warning, setWarning] = useState("");
	const [date, setDate] = useState(null);
	const [categorie, setCategorie] = useState("");
	const [description, setDescription] = useState("");
	const [amount, setAmount] = useState(0);
	const stuff = ["Einkommen", "Lebensmittel", "Shopping", "Wohnung"];

	// const [open, setOpen] = useState(false);
	// const [value, setValue] = useState(null);
	// const [items, setItems] = useState([
	// 	{ label: "Apple", value: "apple" },
	// 	{ label: "Banana", value: "banana" },
	// ]);
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
		<View style={styles.Home}>
			<Text style={styles.headLine}>Umsätze</Text>
			<View style={styles.allMenu}>
				<View style={styles.dropDown}>
					<Text style={styles.kategorie}>Kategorie</Text>

					<SelectDropdown
						style={{
							backgroundColor: "crimson",
							opacity: 0.9,
						}}
						data={stuff}
						onSelect={(selectedItem, index) => {
							setCategorie(selectedItem);
						}}
					/>

					{/* <DropDownPicker
						style={{
							backgroundColor: "crimson",
							opacity: 0.9,
						}}
						open={open}
						value={value}
						items={items}
						setOpen={setOpen}
						setValue={setValue}
						setItems={setItems}
					/> */}
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
					/>
				</View>
				<View>
					<DatePicker
						date={date}
						mode='date'
						placeholder='Datum auswählen'
						format='DD/MM/YYYY'
						minDate='01-01-1900'
						maxDate='01-01-2100'
						confirmBtnText='Bestätigen'
						cancelBtnText='Abbrechen'
						customStyles={{
							dateIcon: {
								position: "absolute",
								right: -60,
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
								color: "white",
								textAlign: "center",
							},
						}}
						onDateChange={date => {
							setDate(date);
						}}
					/>
				</View>
				<View style={styles.btnView}>
					<Button
						color='black'
						style={styles.btn}
						onPress={send}
						title='Erstellen'
					/>
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
	dropDown: {
		marginTop: 70,
		marginBottom: 10,
	},
	Home: {
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
		flex: 1,
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
	numeric: {
		marginBottom: 20,
		marginTop: 20,
	},
	btnView: {
		marginTop: 20,
		width: 200,
		borderRadius: 10,
		backgroundColor: "white",
		borderWidth: 2,
	},
	btn: {
		color: "black",
	},
});
export default Sales;
