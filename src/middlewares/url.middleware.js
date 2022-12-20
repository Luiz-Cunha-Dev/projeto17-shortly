import urlSchema from "../schemas/url.schema.js";

async function urlMiddleware(req, res, next) {
  const {url} = req.body;

  const {error} = urlSchema.validate({url}, {abortEarly: false});

  if(error){
    const errors = error.details.map(d => d.message);
    res.status(422).send(errors);
    return
}

  next();
};

export default urlMiddleware;