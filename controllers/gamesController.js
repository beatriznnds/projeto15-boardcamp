import connection from "../database.js";

export async function getGames (req, res) {
    const { name } = req.query;
    try {
        if (name) {
            await connection.query(`SELECT games.*, categories.name as categoryName FROM games JOIN categories ON games."categoryId" = categories.id`);
            const { rows: searchedGames } = await connection.query(`SELECT * FROM games WHERE upper(name) LIKE upper($1)`, [(`${name}%`)]);
            res.send(searchedGames);
        }
        const { rows: allGames } = await connection.query(`SELECT games.*, categories.name as categoryName FROM games JOIN categories ON games."categoryId" = categories.id`)
        res.send(allGames);
    } catch (e) {
        res.sendStatus(500);
    }    
}

export async function addNewGame (req, res) {
    const { name, image, stockTotal, categoryId, pricePerDay } = req.body;
    try {
        await connection.query(`INSERT INTO games (name, image, "stockTotal", "categoryId", "pricePerDay") 
        VALUES ($1, $2, $3, $4, $5)`, [name, image, stockTotal, categoryId, pricePerDay]);
        res.sendStatus(201);
    } catch (e) {
       res.send().status(500);
    }
}