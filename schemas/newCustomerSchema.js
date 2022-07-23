import Joi from 'joi';
import Date from '@joi/date'

const joi = Joi.extend(Date)

const newCustomerSchema = Joi.object({
    name: Joi.string()
        .required(),
    phone: Joi.string()
        .required()
        .regex(/^[0-9]{10}$|^[0-9]{11}$/),
    cpf: Joi.string()
        .required()
        .regex(/^\d{3}\d{3}\d{3}\d{2}$/),
    birthday: joi.date()
        .format('YYYY-MM-DD')
        .required()
})

export default newCustomerSchema;