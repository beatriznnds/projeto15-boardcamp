import connection from "../database.js";

export async function validateReturnRental (req, res, next) {
    const { id } = req.params;
    try {
        const { rows: validId } = await connection.query(`SELECT * FROM rentals WHERE id = $1`, [id]);
        if (validId.length === 0 ) {
            return res.sendStatus(404)
        }
        if (validId[0].returnDate !== null) {
            return res.sendStatus(400)
        }
    } catch (e) {
        res.status(500).send('Please try again.');  
    }
    next();
}