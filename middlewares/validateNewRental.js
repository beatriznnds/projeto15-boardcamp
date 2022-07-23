import newRentalSchema from "../schemas/newRentalSchema.js";
import connection from "../database.js";

export async function validateNewRental (req, res, next) {
    const { customerId, gameId, daysRented } = req.body;
    const { error } = newRentalSchema.validate({ daysRented });
    if (error) {
        return res.sendStatus(400);
    }
    try {
        const { rows: validCustomer } = await connection.query(`SELECT * FROM customers WHERE id = $1`, [customerId])
        if (validCustomer.length === 0) {
            return res.sendStatus(400);
        }
        const { rows: validGame } = await connection.query(`SELECT * FROM games WHERE id = $1`, [gameId])
        if (validGame.length === 0) {
            return res.sendStatus(400);
        }
        const { rows: availableGame } = await connection.query(`SELECT "returnDate" FROM  rentals WHERE id = $1 AND "returnDate" IS NULL`, [gameId]);
        if (availableGame.length >= validGame[0].stockTotal) {
            return res.sendStatus(400);
        }
        res.locals.game = validGame;
        next();
    } catch (e) {
        res.status(500).send('Please try again.');  
    }
}