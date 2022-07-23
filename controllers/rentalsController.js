import connection from "../database.js";
import dayjs from "dayjs";

export async function getRentals(req, res) {
    const { customerId, gameId } = req.query;
    let rentals;
    try {
        if (!customerId && !gameId) {
            rentals = await connection.query(`SELECT rentals.*, json_build_object('id', customers.id, 'name', customers.name) AS customer, json_build_object('id', games.id, 'name', games.name, 'categoryName', games.\"categoryId\", 'categoryId', categories.name) AS game FROM rentals
            JOIN customers ON customers.id = \"customerId\"
            JOIN games ON games.id = \"gameId\"
            JOIN categories ON \"categoryId\" = categories.id`);
        }   
        if (customerId) {
            rentals = await connection.query(`SELECT rentals.*, json_build_object('id', customers.id, 'name', customers.name) AS customer, json_build_object('id', games.id, 'name', games.name, 'categoryName', games.\"categoryId\", 'categoryId', categories.name) AS game FROM rentals
            JOIN customers ON customers.id = \"customerId\"
            JOIN games ON games.id = \"gameId\"
            JOIN categories ON \"categoryId\" = categories.id WHERE customers.id = $1`, [customerId]);
        } 
        if (gameId) {
            rentals = await connection.query(`SELECT rentals.*, json_build_object('id', customers.id, 'name', customers.name) AS customer, json_build_object('id', games.id, 'name', games.name, 'categoryName', games.\"categoryId\", 'categoryId', categories.name) AS game FROM rentals
            JOIN customers ON customers.id = \"customerId\"
            JOIN games ON games.id = \"gameId\"
            JOIN categories ON \"categoryId\" = categories.id WHERE games.id = $1`, [gameId]);
        }    
        if (customerId && gameId) {
            rentals = await connection.query(`SELECT rentals.*, json_build_object('id', customers.id, 'name', customers.name) AS customer, json_build_object('id', games.id, 'name', games.name, 'categoryName', games.\"categoryId\", 'categoryId', categories.name) AS game FROM rentals
            JOIN customers ON customers.id = \"customerId\"
            JOIN games ON games.id = \"gameId\"
            JOIN categories ON \"categoryId\" = categories.id 
            WHERE customers.id = $1 
            AND games.id = $2`, [customerId, gameId])
        }
        const rowRentals = rentals.rows;
        res.send(rowRentals)
    } catch (e) {
        console.log(e)
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

export async function returnRental (req, res) {
    const { id } = req.params;
    const returnDate = dayjs().format('YYYY-MM-DD');
    try {
        const { rows: rental } = await connection.query(`SELECT rentals.*, games."pricePerDay" AS "pricePerDay"
            FROM rentals
            JOIN games
            ON games."id" = rentals."gameId"
            WHERE rentals."id" = $1`, [id]);
        const delay = dayjs().diff(rental[0].rentDate, 'days');
        const delayFee = null;
        if (delay > 0) {
            delayFee = parseInt(delay) * rental[0].pricePerDay
        }
        await connection.query(`UPDATE rentals SET "returnDate" = $1, "delayFee" = $2 WHERE id = $3`, [returnDate, delayFee, id])
    } catch (e) {
        console.log(e)
        res.sendStatus(500);
    }
}

export async function deleteRental (req, res) {
    const { id } = req.params;
    try {
        await connection.query(`DELETE FROM rentals WHERE id = $1`, [id]);
        res.sendStatus(200);
    } catch (e) {
        res.sendStatus(500);
    }
}