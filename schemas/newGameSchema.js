import Joi from 'joi';

const newGameSchema = Joi.object({
    name: Joi.string()
        .required(),
    image: Joi.string()
        .required()
        .regex(/(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/),
    stockTotal: Joi.number()
        .greater(0),
    pricePerDay: Joi.number()
        .greater(0)
})

export default newGameSchema;