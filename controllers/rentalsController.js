import connection from "../database.js";
import dayjs from "dayjs";

export async function getRentals(req, res) {
    const { customerId, gameId } = req.query;

    try {
        if (customerId && gameId){
            const { rows: rentalsByCustomerAndGameId} = await connection.query(`
                SELECT rentals.*, games.name as "gameName", customers.name as "customerName", categories.name as "categoryName", categories.id as "categoryId"
                FROM rentals
                JOIN customers
                ON customers."id" = rentals."customerId"
                JOIN games
                ON games."id" = rentals."gameId"
                JOIN categories
                ON categories."id" = games."categoryId"
                WHERE custormerId = $1
                AND gameId = $2
            `, [customerId, gameId]);
            console.log(rentalsByCustomerAndGameId);
            return res.send(rentalsByCustomerAndGameId);
        } else if (customerId){
            const {rows: rentalsByCustomerId} = await connection.query(`
                SELECT rentals.*, games.name as "gameName", customers.name as "customerName", categories.name as "categoryName", categories.id as "categoryId"
                FROM rentals
                JOIN customers
                ON customers."id" = rentals."customerId"
                JOIN games
                ON games."id" = rentals."gameId"
                JOIN categories
                ON categories."id" = games."categoryId"
                WHERE custormerId = $1
            `, [customerId]);
            console.log(rentalsByCustomerId)
            return res.send(rentalsByCustomerId);
        } else if (gameId){
            const { rows: rentalsByGameId } = await connection.query(`
                SELECT rentals.*, games.name as "gameName", customers.name as "customerName", categories.name as "categoryName", categories.id as "categoryId"
                FROM rentals
                JOIN customers
                ON customers."id" = rentals."customerId"
                JOIN games
                ON games."id" = rentals."gameId"
                JOIN categories
                ON categories."id" = games."categoryId"
                WHERE gameId = $1
            `, [gameId]);
            console.log(rentalsByGameId)
            return res.send(rentalsByGameId);
        } else {
            const { rows: allRentals } = await connection.query(`
                SELECT rentals.*, customers.name as "customersName", games.name as "gameName", games."categoryId",
                categories.name as "categoryName"
                FROM rentals
                JOIN customers ON customers.id = rentals."customerId" 
                JOIN games ON games.id = rentals."gameId" 
                JOIN categories ON categories.id = games."categoryId"
            `);
            console.log(allRentals)
            return res.send(allRentals);
        }
    } catch (e) {
        res.sendStatus(500);
    }
}

export async function postNewRental (req, res) {
    const { customerId, gameId, daysRented } = req.body;
    const { game } = res.locals;
    try {
        const originalPrice = game[0].pricePerDay * daysRented;
        await connection.query(`INSERT INTO rentals ("customerId", "gameId", "rentDate", "daysRented", "returnDate", "originalPrice", "delayFee") VALUES ($1, $2, $3, $4, $5, $6, $7)`, [customerId, gameId, dayjs().format('YYYY-MM-DD'), daysRented, null, originalPrice, null]);
        res.sendStatus(201)
    } catch (e) {
        console.log(e)
        res.sendStatus(500);
    }
}