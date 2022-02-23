const { _getDB } = require("./_getDB");

//create new User
async function createNewUser(user) {
	const db = await _getDB();
	const newUser = await db.collection("users").insertOne(user);
	return newUser;
}
//Check Name or email exist, User vorhanden in Datenbank
async function checkEmailExists(email) {
	console.log(email);
	const db = await _getDB();
	const user = await db.collection("users").findOne({
		$or: [{ email: email }],
	});
	console.log("semir", user);
	return user;
}
//getallProducts
async function getAllProducts() {
	const db = await _getDB();
	const allProducts = await db.collection("products").find().toArray();

	return allProducts;
}

async function getAmounts() {
	const db = await _getDB();
	const amount = await db.collection("users").find().toArray();

	return amount;
}

//addProduct
async function addAmount(amount) {
	const db = await _getDB();
	const Product = await db
		.collection(`amount/${amount.token.userObjId}`)
		.insertOne(amount);
	return Product;
}
//user.object_id

module.exports = {
	createNewUser,
	checkEmailExists,
	addAmount,
	getAllProducts,
	getAmounts,
};
