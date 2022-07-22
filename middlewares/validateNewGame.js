import newGameSchema from "../schemas/newGameSchema.js";
import connection from '../database.js'

export async function validateNewGame (req, res, next) {
    const { name, image, stockTotal, categoryId, pricePerDay } = req.body;
    const { error } = newGameSchema.validate({name, image, stockTotal, pricePerDay});
    if (error) {
        return res.sendStatus(400);
    }
    try {
        const { rows: validCategoryId } = await connection.query(`SELECT * FROM categories WHERE id = $1`, [categoryId]);
        if (validCategoryId.length === 0 ) {
            return res.sendStatus(400)
        }
        const { rows: validName } = await connection.query(`SELECT * FROM games WHERE name  = $1`, [name]);
        if (validName.length !== 0) {
            return res.sendStatus(409);
        }
    } catch (e) {
        res.status(500).send('Please try again.');
    }
    next();
}