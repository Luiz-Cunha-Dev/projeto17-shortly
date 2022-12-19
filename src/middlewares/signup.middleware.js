import signupSchema from "../schemas/signup.schema.js";

async function signupMiddleware(req, res, next) {
  const {name, email, password, confirmPassword} = req.body;

  if(password !== confirmPassword){
    res.status(422).send(["Senhas diferentes!"]);
    return
  }
  
  const {error} = signupSchema.validate({name, email, password}, {abortEarly: false});

  if(error){
    const errors = error.details.map(d => d.message);
    res.status(422).send(errors);
    return
}

  next();
};

export default signupMiddleware;