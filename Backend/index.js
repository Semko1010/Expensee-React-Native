const express = require("express");
const app = express();
const dotenv = require("dotenv");
const PORT = 3030;
app.use(express.json());

//import functions
const { registerUser } = require("./services/registerUser");
const { LoginUser } = require("./services/loginUser");
const { addAmount, getAmounts } = require("./db_access/user_dao");
//grobal uses
dotenv.config();

//Post Routes
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
		.then(token => {
			res.send({ userExist: true, token });
		})
		.catch(err => {
			res.send({ userExist: false });
		});
});

app.post("/api/expensee/users/amount", (req, res) => {
	addAmount(req.body).then(res.send({ amountAdded: true }));
	console.log("Amount Created");
});

//get Routes
app.get("/api/expensee/users/allAmounts", (req, res) => {
	getAmounts(req.headers.userobjid).then(amounts => {
		res.send(amounts);
	});
});

app.listen(PORT, () => console.log("Server runs on Port:", PORT));
