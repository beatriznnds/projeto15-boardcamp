import Joi from 'joi';

const newRentalSchema = Joi.object({
    daysRented: Joi.number()
        .greater(0)
});

export default newRentalSchema;