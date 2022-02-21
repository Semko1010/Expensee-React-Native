const express = require("express");
const app = express();
const dotenv = require("dotenv");
const PORT = 3030;
app.use(express.json());

//import functions
const { registerUser } = require("./services/registerUser");
const { LoginUser } = require("./services/loginUser");
//grobal uses
dotenv.config();

app.get("/test", function (req, res) {
	res.send("Works Nice");
	console.log("connect");
});

app.post("/api/expensee/users/register", (req, res) => {
	const username = req.body.username;
	const email = req.body.email;
	const password = req.body.password;
	console.log(username, email, password);
	registerUser({ username, email, password })
		.then(() => {
			res.send({ userExist: false });
		})
		.catch(err => {
			res.send({ userExist: true });
		});
});

app.post("/api/expensee/users/login", (req, res) => {
	const email = req.body.email;
	const password = req.body.password;
	LoginUser({ email, password })
		.then(() => {
			res.send({ userExist: true });
		})
		.catch(err => {
			res.send({ userExist: false });
		});
});

app.listen(PORT, () => console.log("Server runs on Port:", PORT));
