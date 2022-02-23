import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { StyleSheet, Text, View, Button, TextInput, Image } from "react-native";
import { Link } from "react-router-native";
import { newToken } from "../../App";
let arr = [];
const StartSite = () => {
	const { token, setToken } = useContext(newToken);
	const [allAmounts, setAllAmounts] = useState([]);
	useEffect(() => {
		axios
			.get("http://localhost:3030/api/expensee/users/allAmounts", {
				headers: token,
			})
			.then(response => setAllAmounts(response.data));
	}, []);
	console.log(allAmounts);
	return (
		<View>
			{allAmounts.map(amount => (
				<>
					<Text>{amount.categorie}</Text>
					<Text>{amount.amount}</Text>
					<Text>{amount.date}</Text>
					<Text>{amount.description}</Text>
				</>
			))}
			<Link underlayColor={"transparent"} to='/'>
				<Text style={styles.backHome}>Back to Home</Text>
			</Link>

			<Link to='/sales'>
				<Text>Sales</Text>
			</Link>
			<Image
				style={styles.image}
				source={{
					uri: "/Users/admin/Desktop/PortfolioProjects/ReactNative Expensee/expensee/assets/circle home.png",
				}}
			/>
		</View>
	);
};
const styles = StyleSheet.create({});
export default StartSite;
