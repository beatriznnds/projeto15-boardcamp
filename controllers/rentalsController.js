import connection from "../database.js";


export async function getRentals (req, res) {
    const { customerId, gameId } = req.query;
    let rentals = [];
    try {
        if (customerId) {
            rentals = await connection.query(`SELECT rentals.*, customers.name as "customerName", games.name as "gameName", games."categoryId", categories.name as "categoryName" FROM rentals
            JOIN customers ON customers.id = rentals."customerId"
            JOIN games ON games.id = rentals."gameId"
            JOIN categories ON categories.id = games."categoryId"
            WHERE rentals."customerId" = $1`, [customerId])
        } else if (gameId) {
            rentals = await connection.query(`SELECT rentals.*, customers.name as "customerName", games.name as "gameName", games."categoryId", categories.name as "categoryName" FROM rentals
            JOIN customers ON customers.id = rentals."customerId"
            JOIN games ON games.id = rentals."gameId"
            JOIN categories ON categories.id = games."categoryId"
            WHERE rentals."customerId" = $1`, [gameId])
        }
        rentals = await connection.query(`SELECT rentals.*, customers.name as "customerName", games.name as "gameName", games."categoryId", categories.name as        "categoryName" FROM rentals
        JOIN customers ON customers.id = rentals."customerId"
        JOIN games ON games.id = rentals."gameId"
        JOIN categories ON categories.id = games."categoryId"`)

        const joinRentals = {
            ...rentals.rows,
        }
        res.send(joinRentals);

    } catch (e) {
        res.sendStatus(500);
    }
}