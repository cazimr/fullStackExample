import jwt from "jsonwebtoken";
import config from "../tools/environment";

const verifyToken = (req, res, next) => {
	const token = req.header("auth-token");
	if (!token) return res.status(401).send("Access denied");

	try {
		const verified = jwt.verify(token, config.access_token_secret);
		req.loggedUser = verified;
		next();
	} catch (err) {
		res.status(401).send("Access denied");
	}
};

export default verifyToken;
