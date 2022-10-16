const joi=require("@hapi/joi")

const registerValidation=(data)=>{
    const Schema= joi.object({
        name:joi.string().min(2).required(),
        email:joi.string().min(2).required(),
        password:joi.string().min(2).required()
    });

    return Schema.validate(data)
}

const loginValidation=(data)=>{
    const Schema= joi.object({
        email:joi.string().min(2).required(),
        password:joi.string().min(2).required()
    });

    return Schema.validate(data)
}
module.exports.registerValidation=registerValidation
module.exports.loginValidation=loginValidation