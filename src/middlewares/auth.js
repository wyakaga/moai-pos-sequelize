const jwt = require("jsonwebtoken");

const blacklist = require("../schemas/token.schema");

module.exports = {
	isSignedIn: async (req, res, next) => {
		const bearerToken = req.header("Authorization");
		if (!bearerToken) {
			return res.status(403).json({
				status: 403,
				msg: "Access denied",
			});
		}

		const token = bearerToken.split(" ")[1];

		const isTokenInvalid = await blacklist.findOne({ token });

		if (isTokenInvalid) {
			return res.status(403).json({
				status: 403,
				msg: "Invalid token",
			});
		}

		jwt.verify(token, process.env.JWT_SECRET, (error, payload) => {
			if (error && error.name) {
				return res.status(403).json({
					status: 403,
					msg: error.message,
				});
			}

			if (error) {
				return res.status(500).json({
					status: 500,
					msg: "Internal Server Error",
				});
			}

			req.authInfo = payload;
			next();
		});
	},
};
