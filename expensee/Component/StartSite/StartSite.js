import { StyleSheet, Text, View, Button, TextInput, Image } from "react-native";
import { Link } from "react-router-native";
const StartSite = () => {
	return (
		<View>
			<Text>HALLO</Text>
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
