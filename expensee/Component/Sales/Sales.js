import { StyleSheet, Text, View, Button, TextInput } from "react-native";
import { useState, useEffect, useContext } from "react";
import SelectDropdown from "react-native-select-dropdown";
import { Link, useNavigate } from "react-router-native";
import { newToken } from "../../App";

const Sales = () => {
	const [description, setDescription] = useState("");
	const [amount, setAmount] = useState();
	const [dateNow, setDateNow] = useState();
	const countries = ["Einkommen", "Lebensmittel", "Shopping", "Wohnung"];
	return (
		<View style={styles.Home}>
			<Text style={styles.headLine}>Umsätze</Text>
			<View>
				<SelectDropdown
					data={countries}
					onSelect={(selectedItem, index) => {
						console.log(selectedItem, index);
					}}
					buttonTextAfterSelection={(selectedItem, index) => {
						// text represented after item is selected
						// if data array is an array of objects then return selectedItem.property to render after item is selected
						return selectedItem;
					}}
					rowTextForSelection={(item, index) => {
						// text represented for each item in dropdown
						// if data array is an array of objects then return item.property to represent item in dropdown
						return item;
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
					onChangeNumber={e => amount(e)}
					placeholderTextColor='black'
					style={styles.textInput}
					placeholder='Geldbetrag'
				/>
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
		margin: 10,
		textAlign: "center",
		width: 300,
		height: 40,
		backgroundColor: "#fffaf0",
	},
});
export default Sales;
