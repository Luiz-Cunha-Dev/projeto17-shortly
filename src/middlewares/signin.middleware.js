import signinSchema from "../schemas/signin.schema.js";

async function signinMiddleware(req, res, next) {
  const {email, password} = req.body;

  const {error} = signinSchema.validate({email, password}, {abortEarly: false});

  if(error){
    const errors = error.details.map(d => d.message);
    res.status(422).send(errors);
    return
}

  next();
};

export default signinMiddleware;