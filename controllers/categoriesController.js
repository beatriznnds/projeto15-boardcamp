import connection from "../database.js";
import newCategorySchema from "../schemas/newCategorySchema.js";

export async function getCategories (req, res) {
    try {
        const { rows: categories } = await connection.query('SELECT * FROM categories');
        res.send(categories);
    } catch (e) {
        res.send('Impossível obter as categorias').status(500);
    }

}

export async function addNewCategory (req, res) {
    const { name } = req.body;
    if (!name) {
        return res.sendStatus(400);
    }
    try {
        const { rows: category } = await connection.query(`SELECT * FROM categories WHERE name = $1`, [name]);
        if (category.length !== 0) {
            res.sendStatus(409);
        }
        await connection.query(`INSERT INTO categories (name) VALUES ($1)`, [name]);
        res.sendStatus(201);
    } catch (e) {
        res.send('Tente enviar uma cat').status(500);
    }

}
