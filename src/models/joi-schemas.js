import Joi from "joi";

export const IdSpec = Joi.alternatives().try(Joi.string(), Joi.object()).description("a valid ID");


export const UserCredentialsSpec = Joi.object()
  .keys({
    email: Joi.string().email().example("homer@simpson.com").required(),
    password: Joi.string().example("secret").required(),
  })
  .label("UserCredentials");

export const UserSpec = UserCredentialsSpec.keys({
  firstName: Joi.string().example("Homer").required(),
  lastName: Joi.string().example("Simpson").required(),
}).label("UserDetails");

export const UserSpecPlus = UserSpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
}).label("UserDetailsPlus");

export const UserArray = Joi.array().items(UserSpecPlus).label("UserArray");

export const PoeSpec = Joi.object()
.keys ({
  name: Joi.string().required().example("Rome"),
  address: Joi.string().required().example("Coliseum"),
  Vduration: Joi.number().allow("").optional().example(45),
  cityid: IdSpec,
}).label("Poe");

export const PoeSpecPlus = PoeSpec.keys({ 
  _id: IdSpec,
  __v: Joi.number(),
}).label("PoePlus");
 
export const PoeArraySpec = Joi.array().items(PoeSpecPlus).label("PoeArray");


export const CitySpec =  Joi.object()
.keys ({
  name: Joi.string().required().example("Rome"),
  userid: IdSpec,
  poes: PoeArraySpec,
}).label("City");

export const CitySpecPlus = CitySpec.keys({ 
  _id: IdSpec,
  __v: Joi.number(),
}).label("CityPlus");

export const CityArraySpec = Joi.array().items(CitySpecPlus).label("CityArray");

