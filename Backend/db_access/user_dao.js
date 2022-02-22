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

async function getAllUsers() {
	const db = await _getDB();
	const allUsers = await db.collection("users").find().toArray();

	return allUsers;
}

//addProduct
async function addProduct(newProduct) {
	const db = await _getDB();
	const Product = await db.collection("amount").insertOne(newProduct);
	return Product;
}
//user.object_id

module.exports = {
	createNewUser,
	checkEmailExists,
	addProduct,
	getAllProducts,
	getAllUsers,
};
