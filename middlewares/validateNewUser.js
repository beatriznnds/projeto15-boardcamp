import connection from "../database.js";
import newCustomerSchema from "../schemas/newCustomerSchema.js";

export async function validateNewUser (req, res, next) {
    const { name, phone, cpf, birthday } = req.body;
    const { error } = newCustomerSchema.validate({ name, phone, cpf, birthday });
    if (error) {
        console.log(error)
        return res.sendStatus(400);        
    }
    try {
        const { rows: validCpf } = await connection.query(`SELECT * FROM customers WHERE cpf  = $1`, [cpf]);
        if (validCpf.length !== 0) {
            return res.sendStatus(409);
        }
    } catch (e) {
        res.status(500).send('Please try again.');
    }
    next();
}