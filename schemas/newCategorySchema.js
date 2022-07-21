import Joi from 'joi';

const newCategorySchema = Joi.object({
    name: Joi.string()
        .required()
})

export default newCategorySchema;