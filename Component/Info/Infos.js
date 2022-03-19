import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	Dimensions,
	ScrollView,
	Image,
	ActivityIndicator,
	TextInput,
	Button,
} from "react-native";
import { Link } from "react-router-native";
import { LinearGradient } from "expo-linear-gradient";
const Info = () => {
	return (
		<LinearGradient
			style={styles.container}
			colors={["#ADA996", "#F2F2F2", "#DBDBDB", "#EAEAEA"]}>
			<Text style={styles.headLine}>
				Expensee ist eine App, die extra für Menschen entwickelte wurde, die
				Überblicke über ihre Finanzen haben möchten.
			</Text>
			<View style={styles.imgView}>
				<Image
					style={styles.img}
					source={require("../../assets/geschaftsbericht.png")}
				/>
				<Text style={styles.text}>
					Hier hast du ein Überblick über alle Transaktionen die du getätigt
					hast.
				</Text>
			</View>

			<View style={styles.imgView}>
				<Image
					style={styles.img}
					source={require("../../assets/zuhause.png")}
				/>
				<Text style={styles.text}>
					Unter Home hast du eine Detailansicht über alle Ein und Ausgaben
					sortiert nach deinem gewünschtem Datum, du kannst auch beliebte
					Einträge aus deinem Konto entfernen.
				</Text>
			</View>

			<View style={styles.imgView}>
				<Image style={styles.img} source={require("../../assets/dollar.png")} />
				<Text style={styles.text}>
					Hier kannst du Ein und Ausgaben erstellen, für z.B., Shopping, Miete
					usw.
				</Text>
			</View>
			<LinearGradient style={styles.linkView} colors={["#2c3e50", "#3498db"]}>
				<Link underlayColor={"transparent"} to='/'>
					<Text style={styles.backHome}>Back to Home</Text>
				</Link>
			</LinearGradient>
		</LinearGradient>
	);
};

const styles = StyleSheet.create({
	container: {
		width: "100%",

		flex: 1,
		textAlign: "center",
		alignItems: "center",
		justifyContent: "space-around",
	},
	headLine: {
		marginTop: 10,
		fontFamily: "Actor_400Regular",
		fontSize: 20,
	},
	text: {
		marginTop: 15,
		fontFamily: "Actor_400Regular",
		fontSize: 16,
	},

	img: {
		width: 30,
		height: 30,
	},
	imgView: {
		width: "80%",
		alignItems: "center",
	},
	backHome: {
		fontFamily: "IMFellEnglishSC_400Regular",
		color: "#FFFFFF",
		textAlign: "center",
		fontSize: 30,
		textAlign: "center",
	},
	linkView: {
		width: 300,
		height: 40,
		borderRadius: 5,
	},
});
export default Info;
