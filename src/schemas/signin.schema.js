import Joi from "joi";

const signupSchema = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required()
})

export default signupSchema;