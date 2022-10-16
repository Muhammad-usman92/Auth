const userSchema = require("../model/user");


	class ProductService {
		
		create = async (data) => await userSchema.create(data);
		getById = async (email) => await userSchema.findOne({where:{email}});

	}

	module.exports = new ProductService();
