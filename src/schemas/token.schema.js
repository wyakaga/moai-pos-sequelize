const { Schema, model } = require("mongoose");

const tokenSchema = new Schema({
	token: {
		type: String,
		required: true,
	},
	created_at: {
		type: Date,
		default: Date.now(),
	},
});

module.exports = model("token", tokenSchema);
