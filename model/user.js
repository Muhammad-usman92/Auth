const Sequelize = require("sequelize");
const { connection } = require("../config/db");

const userSchema = connection.define("User", {
	name: {
		type: Sequelize.STRING,
		require:true,
	},
	email: {
		type: Sequelize.STRING,
		require:true,
	},
	password: {
		type: Sequelize.STRING,
		require:true,
	},
	

});

module.exports = userSchema;