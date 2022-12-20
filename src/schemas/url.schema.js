import Joi from "joi";

const urlSchema = Joi.object({
    url: Joi.string().uri()
})

export default urlSchema;